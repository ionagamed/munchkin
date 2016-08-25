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
import { load, create_lower, create_info, create_cards, create_buttons } from './load.js';
import { over, out, down, sever_connected, startgame } from './events.js'

export var game,
    ccount = 14, cards = [], openChat, closeChat,
    paper, keyboard, scale, down_lower, upper_lower,
    level = {}, power, antipower, monster, cobble, grass, knight,
    buttonAttack, buttonSmivka,
    nickname = 'DAr', room_name = 'keklol', server_addr = 'localhost:3031',
    player = new Player(nickname), table = new Table(),
    connected = false, mainshadow;
table.players.push(player);

$(function () {
    game = new Phaser.Game('100', '100', Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update
    });

    function preload() {
        server.connect(nickname, server_addr, room_name, sever_connected);
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
    
    function update() {
    }
});
