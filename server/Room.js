//TODO: everything
import { Player } from '../common/Player'
import { Table } from '../common/Table';
import packs from '../common/packs';
import Random from 'random-js'
import dice from '../common/dice'

const MAX_PLAYERS = 6;
const TREASURE_BEGIN_COUNT = 4;
const DOOR_BEGIN_COUNT = 4;

/**
 * Helper to send event to client
 *
 * @param ws WebSocket client
 * @param event string event to send
 * @param data object data of event
 */
function sendEvent(ws, event, data) {
    ws.send(JSON.stringify({
        event: event,
        data: data
    }));
}
/**
 * Events:
 *  'table'
 *      data: table table in the room
 *          
 *  'gotCards'
 *      data: 
 *          who string player who got the cards
 *          amount integer amount of cards
 *          cards [string] 
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
 */

/**
 * Helper to set command set for client to use
 *
 * @param ws WebSocket client
 * @param set object command set
 * @param env object various environment data
 */
function setCommandSet(ws, set, env) {
    ws.currentCommandSet = set;
    ws.onmessage = data => {
        try { 
            var msg = JSON.parse(data.data);
            env.room = Room.byId(env.roomId);
            env.table = env.room.table;
            env.player = env.table.players[ws.playerId];
            set[msg.cmd](msg.data, env);
        } catch(err) {
            console.log(`Invalid input: Error: ${err}\n`);
        }
    }
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
     * @param ws WebSocket client websocket
     * @returns int position of client in array
     */
    connect(ws) {
        setCommandSet(ws, Room.spectatorCommands, {roomId: this.id, client: ws});
        sendEvent(env.client, 'table', env.room.table);
        return this.clients.push(ws) - 1;
    }
    
    /**
     * TODO: better naming
     * Make spectator a player
     * inverse of spectate
     * 
     * @param ws WebSocket
     * @returns string status
     */
    play(ws) {
        if(this.table.playing) return 'Room playing';
        if(this.table.players.length < MAX_PLAYERS) {
            ws.playerId = this.table.players.push(new Player(ws.userName)) - 1;
            setCommandSet(ws, Room.playerCommands, {roomId: this.id, client: ws});
            return 'Success';
        } else {
            return 'Room full';
        }
    }

    /**
     * Make player a spectator
     * inverse of play
     *
     * @param ws WebSocket
     */
    spectate(ws) {
        this.table.players.splice(ws.playerId, 1);
        ws.playerId = undefined;
        setCommandSet(Room.spectatorCommands, {roomId: this.id, client: ws});
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
        this.clients.map((ws, pos) => {
            ws.send(JSON.stringify({event: event, data: data}), error => {
                if(error) {
                    if(ws.playerId) this.table.players.splice(ws.playerId, 1);
                    this.clients.splice(pos, 1); 
                }
            })
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

        this.clients.forEach(ws => {
            var player = this.table.players[ws.playerId];
            player.hand = []
                    .concat(this.doorDeck.splice(0, DOOR_BEGIN_COUNT))
                    .concat(this.treasureDeck.splice(0, TREASURE_BEGIN_COUNT));
                    sendEvent(ws, 'gotCards', {
                        amount: DOOR_BEGIN_COUNT + TREASURE_BEGIN_COUNT,
                        cards: this.table.players[ws.playerId].hand,
                        who: player.name
                    });
                    this.dispatch('gotSomeCards', {
                        amount: DOOR_BEGIN_COUNT + TREASURE_BEGIN_COUNT,
                        who: player.name
                    });
        });
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
 *      data: none
 *      additional env: none
 *  starts game
 */
Room.clientCommands['start'] = (data, env) => {
    if(env.client.userName == env.room.owner) {
        env.room.start();
    }
}

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
 * 'tableRequest' command:
 * forces server to send table in the room
 */
Room.playerCommands['tableRequest'] = (data, env) => {
    sendEvent(env.client, 'table', env.room.table);
}
/**
 * 'kickDoor' command:
 *  kicks door
 */
Room.playerCommands['kickDoor'] = (data, env) => {
    if(!phase(env.player, env.table, 'begin')) return;
    var doorCardId = env.room.doorDeck.splice(0, 1);
    var doorCard = Card.byId(doorCardId);
    env.room.dispatch('kickedDoor', {
        card: doorCard,
        who: env.player.name
    })
    if(doorCard.type == 'monster') {
        if(doorCard.onCast('deck', env.player, env.table)) {
            env.table.discard(doorCard);
        }
        this.table.phase = 'closed';
    } else {
        this.table.phase = 'open';
        env.player.hand.push(doorCardName);
        env.player.onCardRecieved(doorCardName, 'deck');
    }
}

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

}

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
        remove_first(data.card, env.player.hand);
        env.table.discard(card);
    }
}

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
        remove_first(data.card, env.player.hand);
        env.table.discard(card);
    }
}

/**
 * 'sendChatMessage' command:
 *  data:
 *      to [string]|'broadcast' recipients of the message
 *      text string text of the message
 *  
 */
Room.playerCommands['sendChatMessage'] = (data, env) => {
    if(data.to == 'broadcast') {
        env.room.dispatch('chatMessage', {
            from: env.player.name,
            message: {
                to: data.to,
                text: data.text
            }
        });
    }
    env.client.map(client => {
        if(client.userName in data.to) {
            sendEvent('chatMessage', {
                from: env.player.name,
                message: {
                    to: data.to,
                    text: data.text
                }
            });
        }
    });
}

/** 
 * Helper that gets card from the player
 *
 * @param player Player
 * @param cardPos object
 *              place string 'hand'|'belt'|'wielded'
 *              pos integer position of card
 */


function getCardFromPlayer(player, cardPos) {
    switch (cardPos.place) {
        case 'hand':
            return player.hand.splice(i.pos, 1)[0];
            break;
        case 'belt':
            return player.belt.splice(i.pos, 1)[0];
            break;
        case 'wielded':
            var cardId = player.wielded[i.pos];
            player.unwield(cardId);
            return cardId;
            break;
    }
}

/**
 * Restricted set of commands that is used if the player needs to drop cards
 */

Room.playerForcedDropCommands = {};
/**
 * 'dropCards' command:
 *     data:
 *          drop [cardPos] cardPos of cards to drop
 *     env: 
 *          dropValid(drop, player, table) checks that drop is valid
 */
Room.playerForcedDropCommands['dropCards'] = (data, env) =>  {
    if(env.dropValid(data.drop, env.player, env.table)) {
        for (i in data.drop) {
            var cardId = getCardFromPlayer(env.player, i);
            env.player.discard(cardId);
        }
        setCommandSet(env.client, Room.playerCommands, {roomId: env.roomId, client: env.client});
    }
}

/**
 * Restricted set of commands that is used 
 * if the player needs to give cards to other players
 */

Room.playerForcedGiveCommands = {};
/**
 * 'giveCardsPrivate' command:
 *     data:
 *          give [cardPos] cardPos of cards to give
 *     env: 
 *          giveValid(drop, player, table) checks that give is valid
 */
Room.playerForcedGiveCommands['giveCardsPrivate'] = (data, env) => {
    if(env.giveValid(data.give, env.player, env.table)) {
        for (i in data.give) {
            var to = env.table.players.find(player => player.name == i.to);
            var cardId = getCardFromPlayer(env.player, i);
            to.hand.push(cardId);
            to.onCardRecieved(cardId, env.player);
            sendEvent(env.client, 'gotCards', {
                amount: 1,
                cards: [cardId],
                who: env.player.name
            });
            env.room.dispatch('gotSomeCards', {
                amount: 1,
                who: env.player.name
            });
        }
        setCommandSet(env.client, Room.playerCommands, {roomId: env.roomId, client: env.client});
    }
}


/**
 * Commands that could be send by spectator
 *
 * @type {function(object, object)}
 */
Room.spectatorCommands = {};
copy(Room.clientCommands, Room.spectatorCommands);
Room.spectatorCommands['play'] = (data, env) => {
    sendEvent(env.client, 'playStatus', env.room.play(env.client));
}


Room.rooms = {};

/**
 *  Gets room by id or creates it if necessary
 *
 *  @returns room
 */

Room.byId = function(id, who, decks) {
    Room.rooms[id] = Room.rooms[id] || new Room(id, who, decks);
    return Room.rooms[id];
}

