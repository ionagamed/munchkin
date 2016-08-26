import { Card } from '../logic/Card';
import { Player } from '../logic/Player';
import { Table } from '../logic/Table';
import dice from '../logic/dice.js';
import packs from '../logic/packs';
import Random from 'random-js';

const MAX_PLAYERS = 6;
const TREASURE_BEGIN_COUNT = 4;
const DOOR_BEGIN_COUNT = 4;
const DEBUG = true;

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
 * CardPos type
 *  data:
 *      place 'hand'|'belt'|'wielded'
 *      pos integer position
 */
/**
 * Events:
 *  'room'
 *      data room filtered room
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
 *          who string player wielding the card
 *          card string id of the card
 *  'unwieldedCard'
 *     data:
 *         who string player unwielding the card
 *         card string id of the card
 *  'usedCard'
 *      data:
 *          who string player using the card
 *          card string id of the card
 *  'castedCard'
 *      data:
 *          who string player who casted the card
 *          on string player on who card was casted
 *          card string id of the card
 *  'dealtOpen'
 *      data:
 *          on string player on who card was dealt
 *          card string card id
 *  'chatMessage'
 *      data:
 *          from string player that sent the message
 *          message:
 *              to [string]|'broadcast' recipients of the message
 *              text string text of the message
 *  'resurrected'
 *      data string player who got resurrected
 *
 *  'died'
 *      data string player who died
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
 *  'discardedCard'
 *      data string id of the card
 *
 *  'addedToBelt'
 *      who string
 *      card string
 *  'newPlayer'
 *      data string name of player
 *
 *  'turn'
 *      data:
 *          turn {integer} current turn
 *          phase {string} current phase
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
        if (DEBUG) console.log(data.data);
        try {
            var msg = JSON.parse(data.data);
            env.room = Room.byId(env.roomId);
            env.table = env.room.table;
            env.player = env.table.players[ws.playerId];
            set[msg.cmd](msg.data, env);
        } catch (err) {
            console.log(`Command error: ${err}\n`);
        }
    };
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

/**
 * Get card from player and send lostCard event
 * 
 * @param player {Player} player from who we get card
 * @param id {string} card id
 * @param {Object} env
 * @returns {boolean} success status
 */
function getCardFromPlayerById(player, id, env) {
    if(remove_first(id, player.belt) || remove_first(id, player.hand)) {
        env.room.dispatch('lostCard', {
            who: player.name,
            card: id
        });
        return true;
    }
    return false;
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

        /**
         * Array of chosen decks
         *
         * @type {[string]}
         */
        this.decks = decks;
    }
    /**
     * Connect client to the room
     *
     * @param client WebSocket
     * @returns int position of client in array
     */
    connect(client) {
        setCommandSet(client, Room.spectatorCommands, {roomId: this.id, client: client});
        console.log(`${client.userName} connected to room ${this.id}`);
        client.on('close', code => {
            console.log(`${client.userName} disconnected from room ${this.id}`);
            if(client.userName == this.owner) {
                this.destroy();
            }
        });
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
            this.dispatch('newPlayer', player.name);
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
        this.clients.map(ws => {
            ws.close();
        });
        Room.rooms[this.id] = undefined;
        console.log(`Room ${this.id} was destroyed`);
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
        this.decks.map(deckName => {
            this.doorDeck = this.doorDeck.concat(packs[deckName].doors.filter(x => x.indexOf('AaA_') < 0));
            this.treasureDeck = this.treasureDeck.concat(packs[deckName].treasure.filter(x => x.indexOf('AaA_') < 0));
        });
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
 * function to give players cards
 *
 * @param source Player|'deck'|'looting'|'god'
 * @param to Player
 * @param cardIds {Card|'door'|'treasure'}
 * @param room Room
 * @param method 'open'|'close'
 */
Room.giveCards = function(source, to, cardIds, room, method) {
    var cards = cardIds.map(cardId => {
        switch(cardId) {
            case 'door':
                return room.doorDeck.splice(0, 1)[0];
            case 'treasure':
                return room.treasureDeck.splice(0, 1)[0];
            default:
                return cardId;
        }
    });
    to.hand = to.hand.concat(cards);
    switch (method) {
        case 'open':
            room.dispatch('gotCards', {
                who: to.name,
                amount: cards.length,
                cards: cards
            });
            break;
        case 'close':
            sendEvent(room.clients.find(client => client.userName == to.name), 'gotCards', {
                who: to.name,
                amount: cards.length,
                cards: cards
            });
            room.dispatch('gotSomeCards', {
                who: to.name,
                amount: cards.length
            });
            break;
    }
    cards.map(cardId => {
        to.onCardReceived(cardId, source);
        Card.byId(cardId).onReceived(to, source, room.table);
    });
};
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
    if(env.client.userName === env.room.owner) {
        env.room.start();
    }
};

function sanitizePlayer(player) {
    let _player = Object.assign({}, player);
    _player.hand = _player.hand.map(cardId => {
        return Card.byId(cardId).kind;
    });
    return _player;
}
/**
 * 'roomRequest' command:
 * forces server to send room
 */
Room.clientCommands['roomRequest'] = (data, env) => {
    var sanitizedTable = {};
    Object.assign(sanitizedTable, env.table);
    sanitizedTable.players = sanitizedTable.players.map(player => {
        if(env.player && player.name == env.player.name) return player;
        return sanitizePlayer(player);
    });
    sendEvent(env.client, 'room', {
        owner: env.room.owner,
        table: sanitizedTable
    });
};

/**
 * Commands that could be sent by player
 *
 * @type {function(object, object)}
 */
Room.playerCommands = {};
Object.assign(Room.playerCommands, Room.clientCommands);
//TODO: move some code into common
/**
 * 'spectate' command:
 * makes player a spectator
 */
Room.playerCommands['spectate'] = (data, env) => {
    env.room.spectate(env.client);
};

/**
 * 'resurrect' command:
 * can be used only if the player is dead and game is started
 */
Room.playerCommands['resurrect'] = (data, env) => {
    if(!env.player.dead) return;
    if(!env.table.playing) return;
    env.player.hand = []
        .concat(env.room.doorDeck.splice(0, DOOR_BEGIN_COUNT))
        .concat(env.room.treasureDeck.splice(0, TREASURE_BEGIN_COUNT));
    env.player.hand.map(cardId => {
        const card = Card.byId(cardId);
        if(card) card.onReceived(env.player, 'deck', env.table);
        env.player.onCardReceived(cardId, 'deck');
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
 * 'escape' command:
 * data:
 *  from integer id of monster from who player is escaping
 */
Room.playerCommands['escape'] = (data, env) => {
    env.table.fight.monsters[data.from].onEscape(env.player, dice(), env.table);
};

/**
 * 'kickDoor' command:
 *  kicks door
 */
Room.playerCommands['kickDoor'] = (data, env) => {
    if(!phase(env.player, env.table, 'begin')) return;
    var doorCardId = env.room.doorDeck.splice(0, 1)[0];
    var doorCard = Card.byId(doorCardId);
    env.room.dispatch('kickedDoor', {
        card: doorCard,
        who: env.player.name
    });
    switch (doorCard.type) {
        case 'monster':
            env.room.dispatch('dealtOpen', {
                on: env.player.name,
                card: doorCardId
            });
            doorCard.onDealtOpen(env.player, env.table);
            // env.table.discard(doorCardId);
            // env.room.dispatch('discardedCard', doorCardId);
            // doorCard.onDiscarded(env.table);
            // env.table.phase = 'closed';
            env.table.phase = 'open';
            break;
        case 'curse':
            env.room.dispatch('castedCard', {
                who: 'deck',
                on: env.player.name,
                card: doorCardId
            });
            if (doorCard.onCast('deck', env.player, env.table)) {
                env.table.discard(doorCardId);
                env.room.dispatch('discardedCard', doorCardId);
                doorCard.onDiscarded(env.table);
            }
            env.table.phase = 'open';
            break;
        default:
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
            doorCard.onReceived(env.player, 'deck', env.table);
            env.player.onCardReceived(doorCardId, 'deck');
            env.table.phase = 'open';
    }
    env.room.dispatch('turn', {turn: env.table.turn, phase: env.table.phase});
};

Room.playerCommands['lootTheRoom'] = (data, env) => {
    if(!phase(env.player, env.table, 'open')) return;
    var doorCardId = env.room.doorDeck.splice(0, 1)[0];
    var doorCard = Card.byId(doorCardId);
    env.player.hand.push(doorCardId);
    doorCard.onReceived(env.player, 'looting', env.table);
    env.player.onCardReceived(doorCardId, 'looting');
    sendEvent(env.client, 'gotCards', {
        who: env.player.name,
        amount: 1,
        cards: [doorCardId]
    });
    env.room.dispatch('gotSomeCards', {
        who: env.player.name,
        amount: 1,
    });
    env.table.phase = 'closed';
    env.room.dispatch('turn', {turn: env.table.turn, phase: env.table.phase});
};

Room.playerCommands['endTurn'] = (data, env) => {
    if(env.table.fight != null || phase(env.player, env.table, 'begin')) return;
    if(env.table.players[env.table.turn].name != env.player.name) return;

    env.table.nextTurn();
    env.room.dispatch('turn', {turn: env.table.turn, phase: env.table.phase});
};

Room.playerCommands['winFight'] = (data, env) => {
    if (env.table.fight == null) return;
    if (env.table.fight.players[0].name != env.player.name) return;

    if (+(new Date()) - env.table.fight.beganAt > 5) {
        env.room.dispatch('wonFight');
    }
};

/**
 * 'wieldCard' command:
 *      data: object
 *          card string id of the card
 *  wield the card
 */

Room.playerCommands['wieldCard'] = (data, env) => {
    const cardId = data.card;
    const card = Card.byId(cardId);
    if(phase(env.player, env.table, 'hand') ||
       phase(env.player, env.table, 'drop')) return;

    if(card.canBeWielded(env.player, env.table) && getCardFromPlayerById(env.player, cardId, env)) {
        env.room.dispatch('wieldedCard', {
            who: env.player.name,
            card: cardId
        });
        env.player.wield(cardId, env.table);
        card.onWielded(env.player, env.table);
    }
};

/**
 * 'unwieldCard' command:
 *      data: object
 *          card string id of the card
 *  unwield the card
 */
Room.playerCommands['unwieldCard'] = (data, env) => {
    const cardId = data.card;
    if(phase(env.player, env.table, 'hand') ||
       phase(env.player, env.table, 'drop')) return;
    if(env.player.hand.indexOf(cardId)) {
        env.room.dispatch('unwieldedCard', {
            who: env.player.name,
            card: cardId
        });
        env.player.unwield(cardId);
        Card.byId(cardId).onUnwielded(env.player, env.table);
        if(Card.byId(cardId).kind === 'door') {
            env.table.discard(cardId);
            env.room.dispatch('discardedCard', cardId);
        } else {
            env.player.belt.push(cardId);
            env.room.dispatch('addedToBelt', {
                who: env.player.name,
                card: cardId
            });
        }
    }
};

/**
 * 'useCard' command:
 *      data: object
 *          card string id of the card
 * use card
 */
Room.playerCommands['useCard'] = (data, env) => {
    const cardId = data.card;
    const card = Card.byId(cardId);
    if(!phase(env.player, env.table, 'open')) return;
    if(!card.canBeUsed(env.player, env.table)) return;
    env.room.dispatch('usedCard', {
        who: env.player.name,
        card: cardId
    });
    env.table.phase = (card.type == 'monster' ? 'hand' : 'closed');
    if(getCardFromPlayerById(env.player, cardId, env) && card.onUsed(env.player, env.table)) {
        card.onDiscarded(env.table);
        env.table.discard(cardId);
        env.room.dispatch('discardedCard', cardId);
    }
    env.room.dispatch('turn', {turn: env.table.turn, phase: env.table.phase});
};

/**
 * 'castCard' command:
 *      data: object
 *          on object 
 *              type 'monster'|'player'
 *              name player on who card will be casted
 *          card string card that will be casted
 */

Room.playerCommands['castCard'] = (data, env) => {
    const cardId = data.card;
    const card = Card.byId(cardId);
    var on;
    if(data.type == 'player')
        on = env.table.players.find(player => player.name == data.on);
    else
        on = cardId;
    if(!phase(env.player, env.table, 'open')) return;
    if(!card.canBeCast(env.player, on, env.table)) return;
    env.room.dispatch('castedCard', {
        who: env.player.name,
        on: on.name,
        card: cardId
    });
    if(getCardFromPlayerById(env.player, cardId, env) && card.onCast(env.player, on, env.table)) {
        env.room.dispatch('discardedCard', cardId);
        card.onDiscarded(env.table);
        env.table.discard(cardId);
    }
};

/**
 * 'callSpecialAbility' command:
 *  data:
 *      card {string} id of the card
 *      ability {string} name of ability
 *      args {object}
 */

Room.playerCommands['callSpecialAbility'] = (data, env) => {
    const cardId = data.card;
    Card.byId(cardId).callSpecialAbility(data.ability, data.args);
};

/**
 * 'moveToBelt' command:
 *  data:
 *      card string card id
 */
Room.playerCommands['moveToBelt'] = (data, env) => {
    const cardId = data.card;
    if(getCardFromPlayerById(env.player, cardId, env)) {
        env.player.belt.push(cardId);
        env.room.dispatch('addedToBelt', {
            who: env.player.name,
            card: cardId
        });
    }
};

/**
 * 'sendChatMessage' command:
 *  data:
 *      to [string]|'__broadcast__' recipients of the message
 *      text string text of the message
 *
 */
Room.playerCommands['sendChatMessage'] = (data, env) => {
    if(data.to === '__broadcast__') {
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
    const fromPlayer = env.table.players.find(player => player.name == data.from);
    const cardId = getCardFromPlayer(env.room, fromPlayer, data.cardPos);
    env.player.hand.push(cardId);
    Card.byId(cardId).onReceived(env.player, fromPlayer, env.table);
    env.player.onCardReceived(cardId, env.player);

};

/**
 * 'dropPlayerCard' command:
 *  data:
 *      who string player who drops the card
 *      cardPos cardPos position of card
 */
Room.playerCommands['dropPlayerCard'] = (data, env) => {
    //TODO: add security check
    const cardId = getCardFromPlayer(env.room, env.table.players.find(player => player.name == data.who), data.cardPos);
    Card.byId(cardId).onDiscarded(env.table);
    env.room.dispatch('discardedCard', cardId);
    env.table.discard(cardId);
};

/**
 *  'discard' command:
 *  data:
 *      card string id of the card
 */
Room.playerCommands['discard'] = (data, env) => {
    const cardId = data.card;
    getCardFromPlayerById(env.player, cardId, env);
    Card.byId(cardId).onDiscarded(env.table);
    env.room.dispatch('discardedCard', cardId);
    env.table.discard(cardId);
};


/**
 * Commands that could be send by spectator
 *
 * @type {function(object, object)}
 */
Room.spectatorCommands = {};
Object.assign(Room.spectatorCommands, Room.clientCommands);
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

