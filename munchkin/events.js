import server from '../logic/Server';
import { Card } from '../logic/Card';
import { Table } from '../logic/Table';
import { Player } from '../logic/Player';
import * as global from './munchkin.js';
import { load, create_lower, create_info, create_cards, create_buttons } from './load.js';

export function over(obj){
    obj.width *= 2;
    obj.height *= 2;
    obj.y = global.game.height;
    obj.anchor.setTo(0.5, 1);
    //for (var i = obj.iter + 1; i < global.player.hand.length; i++)
        //global.player.image[i].sendToBack();
    global.down_lower.sendToBack();
    //for (var i = 0; i <= obj.iter; i++)
        //global.player.image[i].bringToTop();
}

export function out(obj){
    obj.anchor.setTo(0.5, 0)
    obj.width /= 2;
    obj.height /= 2;
    obj.y = global.upper_lower.height;
}

export function down(obj){
    var cart = Card.byId(obj.key.slice(6));
    
}

export function server_connected() {
    global.connected = true;
    console.log("...---+++Connected+++---...");
    console.log(global.connected);
}

export function startGame() {
    if(global.connected){
        server.player = global.player;
        server.table = global.table;
        server.play();
        server.start();
        server.resurrect();
        create_cards();
        console.log(global.player);
        global.mainshadow.visible = false;
        global.buttonStartGame.visible = false;
        create_cards();
    }
}