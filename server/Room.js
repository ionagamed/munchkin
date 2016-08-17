import { Table } from '../common/Table';

const MAX_PLAYERS = 6;

function commandSet(set, ws) {
    return data => {
        try { 
            var msg = JSON.parse(data); 
            set[msg.cmd](msg.data, ws);
        } catch(err) {
            console.log('commandSet: Error: #{err}\n');
        }
    }
}

export class Room {
    constructor(id, owner) {
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

    }
    /**
     * Connect client to the room
     *
     * @param ws WebSocket client websocket
     * @returns int position of client in array
     */
    connect(ws) {
        ws.on('message', commandSet(Room.spectatorCommands, ws));
        return this.clients.push(ws) - 1;
    }
    
    /**
     * Make spectator a player
     * inverse of spectate
     * 
     * @param ws WebSocket
     * @returns string status
     */
    play(ws) {
        if(this.table.players.length < MAX_PLAYERS) {
            ws.playerId = this.table.players.push(new Player(ws.username)) - 1;
            ws.on('message', commandSet(Room.playerCommands, ws));
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
        ws.on('message', commandSet(Room.spectatorCommands, ws));
        //TODO: call table disconnect function
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
        if(this.clients.length == 0) destroy();
    }
}

/**
 * Commands that could be send by any client
 *
 * @type {function(object, WebSocket)}
 */
Room.clientCommands = {};

/**
 * Commands that could be send by player
 *
 * @type {function(object, WebSocket)}
 */
Room.playerCommands = {};
Room.playerCommands.prototype = Room.clientCommands;

/**
 * Commands that could be send by spectator
 *
 * @type {function(object, WebSocket)}
 */
 Room.spectatorCommands = {};
 Room.spectatorCommands.prototype = Room.clientCommands;

 Room.spectatorCommands['play'] = (data, ws) => {
    ws.send(JSON.stringify({event: 'playStatus', data: ws.room.play(ws)}));
 }


Room.rooms = {};

/**
 *  Gets room by id or creates it if necessary
 *
 *  @returns room
 */

Room.byId = function(id, who) {
    Room.rooms[id] = Room.rooms[id] || new Room(id, who);
    return Room.rooms[id];
}

