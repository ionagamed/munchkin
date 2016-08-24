import { Server as WebSocketServer } from 'ws';
import { Room } from './Room';
import url from 'url';

export var wss = new WebSocketServer({
    port: process.env.WS_PORT || 3031
});
/**
 * connection init:
 *  ws = new WebSocket('ws://server?userName=$username&room=$room');
 * client->server:
 *  cmd:  string
 *  data: object
 * server->client:
 *  event: string
 *  data:  object
 */
wss.on('connection', ws => {
    var location = url.parse(ws.upgradeReq.url, true, true);
    ws.userName = location.query.userName;
    Room.byId(location.query.room, location.query.userName, ['pack1']).connect(ws);
});
