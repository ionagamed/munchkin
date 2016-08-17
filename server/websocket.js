import { Server as WebSocketServer } from 'ws';
import { Room, getRoom } from './Room';
import session from './session';
import url from 'url'

export var wss = new WebSocketServer({
    port: 8081
});
/**
 * connection init:
 *  ws = new WebSocket('ws://server?username=$username&room=$room');
 * client->server:
 *  cmd:  string
 *  data: json
 * server->client:
 *  event: string
 *  data:  json
 */
wss.on('connection', ws => {
    var location = url.parse(ws.upgradeReq.url, true, true);
    ws.userName = location.query.userName;
    Room.byId(location.query.room).connect(ws);
})
