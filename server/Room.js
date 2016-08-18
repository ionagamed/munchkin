import { Player } from '../common/Player'
import { Table } from '../common/Table';
import packs from '../common/packs';
import Random from 'random-js'

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
    getCards(type, amount) {
        switch (type) {
            case 'door':
                return this.doorDeck.splice(0, amount);
            case 'treasure':
                return this.treasureDeck.splice(0, amount);
        }
    }
    start() {
        var r = new Random();
        r.shuffle(this.doorDeck);
        r.shuffle(this.treasureDeck);

        this.clients.forEach(ws => {
            var player = this.table.players[ws.playerId];
            player.hand = []
                    .concat(this.doorDeck.splice(0, DOOR_BEGIN_COUNT))
                    .concat(this.treasureDeck.splice(0, TREASURE_BEGIN_COUNT));
                    sendEvent(ws, 'gotCards', {
                        amount: DOOR_BEGIN_COUNT + TREASURE_BEGIN_COUNT,
                        cards: this.table.players[ws.playerId].hand,
                        playerName: player.name
                    });
                    this.dispatch('gotSomeCards', {
                        amount: DOOR_BEGIN_COUNT + TREASURE_BEGIN_COUNT,
                        playerName: 
                    });
        });
    }
}

// TODO: document commands and events 
/**
 * Commands that could be send by server
 *
 * @type {function(object, object)}
 */
Room.serverCommands = {};

/**
 * Commands that could be send by client
 *
 * @type {function(object, object)}
 */
Room.clientCommands = {};
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

Room.playerCommands['getCardsPrivate'] = (data, env) => {
    sendEvent(env.client, 'gotCards', {
            type: data.type,
            amount: data.amount,
            cards: env.room.getCards(data.type, data.amount),
            playerName: env.client.userName
    });
    env.room.dispatch('gotSomeCards', {
        type: data.type,
        amount: data.amount,
        playerName: env.client.userName
    });
}
Room.playerCommands['getCardsPublic'] = (data, env) => {
    env.room.dispatch('gotCards', {
        type: data.type,
        amount: data.amount,
        cards: env.room.getCards(data.type, data.amount), playerName: env.client.userName
    });
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

