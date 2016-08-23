import { Card } from '../common/Card';
import { Player } from '../common/Player';
import { Table } from '../common/Table';
import packs from '../common/packs';
import Random from 'random-js';

const MAX_PLAYERS = 6;
const TREASURE_BEGIN_COUNT = 4;
const DOOR_BEGIN_COUNT = 4;

/**
 * Helper to send event to client
 *
 * @param client WebSocket
 * @param event string event to send
 * @param data object data of event
 */
function sendEvent(client, event, data) {
    client.send(JSON.stringify({
        event: event,
        data: data
    }));
}
/**
 * Events:
 *  'table'
 *      data table table in the room
 *
 *  'gotCards'
 *      data:
 *          who string player who got the cards
 *          amount integer amount of cards
 *          cards [string]
 *
 *  'gameStarted'
 *
 *  'gotSomeCards'
 *      like 'gotCards' but without cards ids
 *
 *  'kickedDoor'
 *      data:
 *          who string player who kicked the door
 *          card string id of card that we got from kicking the door
 *  'wieldedCard'
 *      data:
 *          who string player wearing the card
 *          card string id of the card
 *  'usedCard'
 *      data:
 *          who string player using the card
 *          card string id of the card
 *  'castedCard'
 *      data:
 *          who string player who casted the card
 *          on string player on who card was casted
 *          card string id of the card
 *  'chatMessage'
 *      data:
 *          from string player that sent the message
 *          message:
 *              to [string]|'broadcast' recipients of the message
 *              text string text of the message
 *  'resurrected'
 *      data string player who got resurrected
 *
 *  'lostCard'
 *      data:
 *          who string player who lost the card
 *          card string id of the card
 *
 *  'lostSomeCard'
 *      data:
 *          who string player who lost the card
 *          card cardPos position of the card
 *
 *  'changedPhase'
 *      data string current phase
 *
 *  'discardedCard'
 *      data string id of the card
 */


/**
 * Helper to set command set for client to use
 *
 * @param ws WebSocket client
 * @param set object command set
 * @param env object various environment data
 */
function setCommandSet(ws, set, env) {
    ws.onmessage = data => {
        try {
            var msg = JSON.parse(data.data);
            env.room = Room.byId(env.roomId);
            env.table = env.table;
            env.player = env.table.players[ws.playerId];
            set[msg.cmd](msg.data, env);
        } catch (err) {
            console.log(`Command error: ${err}\n`);
        }
    };
}

/**
 * Helper to copy objects
 * Currently used only to copy command sets
 *
 * @param from object
 * @param to object
 */
function copy(from, to) {
    for (var key in from) {
        to[key] = from[key];
    }
}

/**
 * Helper for validating phase
 *
 * @param player Player
 * @param table Table
 * @param phase string wanted phase
 * @returns bool is in phase
 */
function phase(player, table, phase) {
    return table.players[table.turn].name == player.name && table.phase == phase;
}

/**
 * Helper to remove first occurence of object
 *
 * @param what object
 * @param where [object]
 * @returns bool element was deleted
 */
function remove_first(what, where) {
    var ix = where.findIndex(x => x == what);
    if (ix == -1) return false;
    where.splice(ix, 1);
    return true;
}
/**
 * Helper that gets card from the player
 *
 * @param player Player
 * @param cardPos object
 *              place string 'hand'|'belt'|'wielded'
 *              pos integer position of card
 */

function getCardFromPlayer(room, player, cardPos) {
    room.dispatch('lostSomeCard', {
        who: player.name,
        card: cardPos
    });
    switch (cardPos.place) {
        case 'hand':
            return player.hand.splice(cardPos.pos, 1)[0];
        case 'belt':
            return player.belt.splice(cardPos.pos, 1)[0];
        case 'wielded':
            var cardId = player.wielded[cardPos.pos];
            player.unwield(cardId);
            return cardId;
    }
}

export class Room {
    constructor(id, owner, decks) {
        /**
         * An array that holds users(players and spectators)
         * which want room events
         *
         * @type [WebSocket]
         */
        this.clients = [];
        /**
         * A table in the room
         *
         * @type Table
         */
        this.table = new Table();

        /**
         * Owner of the room
         *
         * @type string
         */
        this.owner = owner;

        /**
         * An id of the room
         *
         * @type string
         */
        this.id = id;

        /**
         * Decks for doors and treasures
         *
         * @type [string]
         */
        this.doorDeck = [];
        this.treasureDeck = [];

        decks.map(deckName => {
            this.doorDeck = this.doorDeck.concat(packs[deckName].doors);
            this.treasureDeck = this.treasureDeck.concat(packs[deckName].treasure);
        });

    }
    /**
     * Connect client to the room
     *
     * @param client WebSocket
     * @returns int position of client in array
     */
    connect(client) {
        setCommandSet(client, Room.spectatorCommands, {roomId: this.id, client: client});
        return this.clients.push(client) - 1;
    }

    /**
     * TODO: better naming
     * Make spectator a player
     * inverse of spectate
     *
     * @param client WebSocket
     * @returns string status
     */
    play(client) {
        if(this.table.playing) return 'Room playing';
        if(this.table.players.length < MAX_PLAYERS) {
            var player = new Player(client.userName);
            client.playerId = this.table.players.push(player) - 1;
            setCommandSet(client, Room.playerCommands, {roomId: this.id, client: client});
            return 'Success';
        } else {
            return 'Room full';
        }
    }

    /**
     * Make player a spectator
     * inverse of play
     *
     * @param client WebSocket
     */
    spectate(client) {
        this.table.players.splice(client.playerId, 1);
        client.playerId = undefined;
        setCommandSet(client, Room.spectatorCommands, {roomId: this.id, client: client});
    }

    /**
     * Destroy room
     */
    destroy() {
        Room.rooms[this.id] = undefined;
    }

    /**
     * Send event to all clients in the room
     *
     * @param event string
     * @param data  object
     */
    dispatch(event, data) {
        this.clients.map((client, pos) => {
            client.send(JSON.stringify({event: event, data: data}), error => {
                if(error) {
                    if(client.playerId) this.table.players.splice(client.playerId, 1);
                    this.clients.splice(pos, 1);
                }
            });
        });
        if(this.clients.length == 0) this.destroy();
    }
    /**
     * Get cards of chosen type from deck
     *
     * @param type 'door'|'treasure'
     * @param amount integer
     * @returns [card]
     */
    getCards(type, amount) {
        switch (type) {
            case 'door':
                return this.doorDeck.splice(0, amount);
            case 'treasure':
                return this.treasureDeck.splice(0, amount);
        }
    }
    /**
     * Start game
     */
    start() {
        var r = new Random();
        r.shuffle(this.doorDeck);
        r.shuffle(this.treasureDeck);
        this.table.playing = true;
        this.dispatch('gameStarted');
    }
}

// TODO: document commands and events
// TODO: move commands to different file

/**
 * Commands that could be send by client
 *
 * @type {function(object, object)}
 */
Room.clientCommands = {};

/**
 * 'start' command:
 *  starts game
 */
Room.clientCommands['start'] = (data, env) => {
    if(env.client.userName == env.room.owner) {
        env.room.start();
    }
};

/**
 * 'tableRequest' command:
 * forces server to send table in the room
 */
Room.clientCommands['tableRequest'] = (data, env) => {
    sendEvent(env.client, 'table', env.table);
};

/**
 * Commands that could be send by player
 *
 * @type {function(object, object)}
 */
Room.playerCommands = {};
copy(Room.clientCommands, Room.playerCommands);
/*
Room.giveCardsPrivate = (data, env) => {
    sendEvent(env.client, 'gotCards', {
            type: data.type,
            amount: data.amount,
            cards: env.room.getCards(data.type, data.amount),
            who: env.player.name
    });
    env.room.dispatch('gotSomeCards', {
        type: data.type,
        amount: data.amount,
        who: env.player.name
    });
}
Room.giveCardsPublic = (data, env) => {
    env.room.dispatch('gotCards', {
        type: data.type,
        amount: data.amount,
        cards: env.room.getCards(data.type, data.amount),
        who: env.player.name
    });
    }*/
//TODO: move some code into common
/**
 * 'spectate' command:
 * makes player a spectator
 */
Room.playerCommands['spectate'] = (data, env) => {
    env.room.spectate(env.client);
};

/**
 * 'getBeginCards' command:
 * can be used only if the player is dead and game is started
 * emits gotCards, gotSomeCards
 */
Room.playerCommands['resurrect'] = (data, env) => {
    if(!env.player.dead) return;
    if(!env.table.playing) return;
    env.player.hand = []
        .concat(env.room.doorDeck.splice(0, DOOR_BEGIN_COUNT))
        .concat(env.room.treasureDeck.splice(0, TREASURE_BEGIN_COUNT));
    env.player.hand.map(cardId => {
        env.player.onCardRecieved(cardId, 'deck');
    });
    sendEvent(env.client, 'gotCards', {
        amount: DOOR_BEGIN_COUNT + TREASURE_BEGIN_COUNT,
        cards: env.player.hand,
        who: env.player.name
    });
    env.room.dispatch('gotSomeCards', {
        amount: DOOR_BEGIN_COUNT + TREASURE_BEGIN_COUNT,
        who: env.player.name
    });
    env.room.dispatch('resurrected', {
        who: env.player.name
    });
    env.player.dead = false;
};

/**
 * 'kickDoor' command:
 *  kicks door
 *  emits: castedCard, gotCards, gotSomeCards
 */
Room.playerCommands['kickDoor'] = (data, env) => {
    if(!phase(env.player, env.table, 'begin')) return;
    var doorCardId = env.room.doorDeck.splice(0, 1);
    var doorCard = Card.byId(doorCardId);
    env.room.dispatch('kickedDoor', {
        card: doorCard,
        who: env.player.name
    });
    if(doorCard.type == 'monster') {
        env.room.dispatch('castedCard', {
            who: 'deck',
            on: env.player.name,
            card: doorCardId
        });
        if(doorCard.onCast('deck', env.player, env.table)) {
            env.room.dispatch('discardedCard', doorCardId);
            env.table.discard(doorCardId);
        }
        env.table.phase = 'closed';
    } else {
        env.table.phase = 'open';
        env.room.dispatch('gotCards', {
            who: env.player.name,
            amount: 1,
            cards: [doorCardId]
        });
        env.room.dispatch('gotSomeCards', {
            who: env.player.name,
            amount: 1,
        });
        env.player.hand.push(doorCardId);
        env.player.onCardRecieved(doorCardId, 'deck');
    }
    env.room.dispatch('changedPhase', env.table.phase);
};

Room.playerCommands['lootTheRoom'] = (data, env) => {
    if(!phase(env.player, env.table, 'open')) return;
    var doorCardId = env.room.doorDeck.splice(0, 1);
    env.player.hand.push(doorCardId);
    env.player.onCardRecieved(doorCardId, 'looting');
    sendEvent(env.client, 'gotCards', {
        who: env.player.name,
        amount: 1,
        cards: [doorCardId]
    });
    env.room.dispatch('gotSomeCards', {
        who: env.player.name,
        amount: 1,
    });
    env.player.phase = 'closed';
    env.room.dispatch('changedPhase', env.table.phase);
};

/**
 * 'wieldCard' command:
 *      data: object
 *          card string id of the card
 *      emits 'wieldedCard'
 *  wield the card
 */

Room.playerCommands['wieldCard'] = (data, env) => {
    var card = Card.byId(data.card);
    if(phase(env.player, env.table, 'hand') ||
       phase(env.player, env.table, 'drop')) return;

    if(card.canBeWielded(card, env.table)) {
        env.room.dispatch('wieldedCard', {
            who: env.player.name,
            card: card.id
        });
        env.player.wield(card.id, env.table);
        remove_first(card.id, env.player.hand);
    }

};

/**
 * 'useCard' command:
 *      data: object
 *          card string id of the card
 *      emits 'usedCard'
 * use card
 */
Room.playerCommands['useCard'] = (data, env) => {
    var card = Card.byId(data.card);
    if(!phase(env.player, env.table, 'open')) return;
    if(!card.canBeUsed(env.player, env.table)) return;
    env.room.dispatch('usedCard', {
        who: env.player.name,
        card: card.id
    });
    env.table.phase = (card.type == 'monster' ? 'hand' : 'closed');
    if(card.onUsed(env.player, env.table)) {
        env.dispatch('lostCard', {
            who: env.player.name,
            card: card.id
        });
        remove_first(card.id, env.player.hand);
        env.table.discard(card.id);
        env.room.dispatch('discardedCard', card.id);
    }
    env.room.dispatch('changedPhase', env.table.phase);
};

/**
 * 'castCard' command:
 *      data: object
 *          on string player on who card will be casted
 *          card string card that will be casted
 *      emits 'castedCard'
 */

Room.playerCommands['castCard'] = (data, env) => {
    var card = Card.byId(data.card);
    var on = env.table.players.find(player => player.name == data.on);
    if(!phase(env.player, env.table, 'open')) return;
    if(!card.canBeCast(env.player, on, env.table)) return;
    env.room.dispatch('castedCard', {
        who: env.player.name,
        on: on.name,
        card: card.id
    });
    if(card.onCast(env.player, on, env.table)) {
        env.dispatch('lostCard', {
            who: env.player.name,
            card: card.id
        });
        remove_first(card.id, env.player.hand);
        env.room.dispatch('discardedCard', card.id);
        env.table.discard(card.id);
    }
};

/**
 * 'sendChatMessage' command:
 *  data:
 *      to [string]|'broadcast' recipients of the message
 *      text string text of the message
 *
 */
Room.playerCommands['sendChatMessage'] = (data, env) => {
    if(data.to === 'broadcast') {
        env.room.dispatch('chatMessage', {
            from: env.player.name,
            message: {
                to: data.to,
                text: data.text
            }
        });
    } else {
        //TODO: change client.userName to player.name
        env.room.clients
            .filter(client => data.to.indexOf(client.userName) > -1)
            .map(client => {
                sendEvent(client, 'chatMessage', {
                    from: env.player.name,
                    message: {
                        to: data.to,
                        text: data.text
                    }
                });
            });
    }
};

/**
 * 'getCardFromPlayer' command:
 *  data:
 *      from string player from who we get card
 *      cardPos cardPos position of card
 *      method 'open'|'close'
 */
Room.playerCommands['getCardFromPlayer'] = (data, env) => {
    //TODO: add security check
    var card = getCardFromPlayer(env.room, env.table.players.find(player => player.name == data.from), data.cardPos);
    env.player.hand.push(card.id);
    env.player.onCardRecieved(card.id, env.player);
    switch (data.method) {
        case 'open':
            env.room.dispatch('gotCards', {
                who: env.player.name,
                amount: 1,
                cards: [card.id]
            });
            break;
        case 'close':
            sendEvent(env.client, 'gotCards', {
                who: env.player.name,
                amount: 1,
                cards: [card.id]
            });
            env.room.dispatch('gotSomeCards', {
                who: env.player.name,
                amount: 1
            });
            break;
    }
};

Room.playerCommands['dropPlayerCard'] = (data, env) => {
    var card = getCardFromPlayer(env.room, env.table.players.find(player => player.name == data.from), data.cardPos);
    env.room.dispatch('discardedCard', card.id);
    env.table.discard(card.id);
};


/**
 * Commands that could be send by spectator
 *
 * @type {function(object, object)}
 */
Room.spectatorCommands = {};
copy(Room.clientCommands, Room.spectatorCommands);
Room.spectatorCommands['play'] = (data, env) => {
    sendEvent(env.client, 'playStatus', env.room.play(env.client));
};


Room.rooms = {};

/**
 *  Gets room by id or creates it if necessary
 *
 *  @returns room
 */

Room.byId = function(id, who, decks) {
    Room.rooms[id] = Room.rooms[id] || new Room(id, who, decks);
    return Room.rooms[id];
};

