import { Server as WebSocketServer } from 'ws'

export var wss = new WebSocketServer({
	port: 8081
})
/**
 * client:
 *  nick: string
 *  room: string
 *  cmd:  string
 *  data: json
 * server:
 *  room:  string
 *  event: string
 *  data:  json
 */
wss.on('connection', ws => {
    ws.on('message', data => {
        msg = JSON.parse(data);
        switch(msg.cmd) {
            /**
             * Returns table in the room
             *
             * @returns table
             */
            case 'getTable':
                ws.send(JSON.stringify({
                    room: msg.room,
                    event: 'table',
                    data: rooms[msg.room].table
                }));
                break;
        }
    })
});
