/**
 * Created by ionagamed on 8/11/16.
 */

import { Card } from '../logic/Card';
import { Player } from '../logic/Player';
import { Table } from '../logic/Table';
import server from '../logic/Server';

import packs from '../logic/packs.js';
import dice from '../logic/dice.js';

import './test.js';
import './action.js';
import './events.js';
import { load, create_lower, create_info, create_cards, create_buttons, destroy_cards } from './load.js';
import { over, out, down, server_connected, startgame } from './events.js'

export var game,
    ccount = 14, cards = [], openChat, closeChat,
    paper, keyboard, scale, down_lower, upper_lower,
    level = {}, power, antipower, monster, cobble, grass, knight,
    buttonAttack, buttonSmivka, 
    nickname = 'DAr', room_name = 'keklol', server_addr = 'localhost:3031',
    player = new Player(nickname), table = new Table(),
    connected = false, mainshadow, create_cards_on = true,
    buttonExit;


$(function () {
    game = new Phaser.Game('100', '100', Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update
    });

    function preload() {
        server.connect(nickname, server_addr, room_name, server_connected);
        for (let i in packs.pack1.doors) {
            if (packs.pack1.doors.hasOwnProperty(i))
                game.load.image('pack1_' + packs.pack1.doors[i], 'packs/pack1/img/doors-' + i + '.png');
        }
        for (let i in packs.pack1.treasure) {
            if (packs.pack1.treasure.hasOwnProperty(i))
                game.load.image('pack1_' + packs.pack1.treasure[i], 'packs/pack1/img/treasure-' + i + '.png');
        }
        load();
    }
    
    function create() {
        create_lower();
        create_info();
        create_buttons();
    }

    var s = 0, l = 0, f = 1;
    function update() {
        //console.log(connected);
        if(s == 30)
        {
            server.roomRequest(); 
            s = 0; 
            create_cards();
            //destroy_cards();
        }else s++;
    }
});
