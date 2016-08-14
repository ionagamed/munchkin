import { Server as WebSocketServer } from 'ws';
import { Room, getRoom } from './Room';
import session from './session';

export var wss = new WebSocketServer({
    port: 8081
});
/**
 * client->server:
 *  room: string
 *  cmd:  string
 *  data: json
 * server->client:
 *  room:  string
 *  event: string
 *  data:  json
 */
wss.on('connection', ws => {
    let username = "";
    ws.on('message', data => {
        session(ws.upgradeReq, {} , () => {
            var clientSession = ws.upgradeReq.session;
            var msg = JSON.parse(data);
            switch(msg.cmd) {
                /**
                 * Returns room data
                 *
                 * @returns room
                 */
                case 'getRoom':
                    console.log(clientSession);
                    var room = Room.byId(msg.room, clientSession.username);
                    ws.send(JSON.stringify({
                        room: msg.room,
                        event: 'table',
                        data: {table: room.table, owner: room.owner}
                    }));
                    break;
            }
        });
    });
});
