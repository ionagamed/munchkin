/**
 * Created by ionagamed on 8/11/16.
 */

import { Card } from '../common/Card';
import { Player } from '../common/Player';
import { Table } from '../common/Table';

import packs from '../common/packs.js';
import dice from '../common/dice.js';

import './test.js';
import './action.js';
import './events.js';
import './load.js';

$(function () {
    var game = new Phaser.Game('100', '100', Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update
    });
    var ccount = 14, cards = [], openChat, closeChat;
    var paper, keyboard, scale, down_lower, upper_lower;
    var level, power, antipower, monster, cobble, grass, knight;
    var buttonAttack, buttonSmivka;
    var table = new Table();

    function preload() {
        for (let i in packs.pack1.doors) {
            if (packs.pack1.doors.hasOwnProperty(i))
                game.load.image('pack1_door_' + packs.pack1.doors[i], 'packs/pack1/img/doors-' + i + '.png');
        }
        for (let i in packs.pack1.treasure) {
            if (packs.pack1.treasure.hasOwnProperty(i))
                game.load.image('pack1_treasure_' + packs.pack1.treasure[i], 'packs/pack1/img/treasure-' + i + '.png');
        }
        load();
    }
    
    function create() {
        create_lower();
        create_info();
        create_cards();
        create_chat();
        create_buttons();
        
    }
    
    function update() {
       
    }
});