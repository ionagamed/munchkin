import { Table } from '../common/Table';
export class Room {
    constructor(owner) {
        /** 
         * An array that holds users(players and spectators)
         * which want room events
         *
         * @type [WebSocket]
         */
        this.subscribers = [];

        /**
         * An array that holds players
         * 
         * @type [Player]
         */
        this.players = [];
        
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
    }
}
Room.rooms = {};
/**
 *  Gets room by id or creates it if necessary
 */
Room.byId = function(id, who) {
    Room.rooms[id] = Room.rooms[id] || new Room(who);
    return Room.rooms[id];
}

