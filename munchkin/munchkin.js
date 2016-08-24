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
import { load, create_lower, create_info, create_cards, create_buttons } from './load.js';

export var game,
    ccount = 14, cards = [], openChat, closeChat,
    paper, keyboard, scale, down_lower, upper_lower,
    level={}, power, antipower, monster, cobble, grass, knight,
    buttonAttack, buttonSmivka,
    player = new Player();

$(function () {
    game = new Phaser.Game('100', '100', Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update
    });

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
        document.ws = new WebSocket('ws://localhost:3031/?userName=DAr&room=Kek');
        document.ws.onmessage = function(data){
            const msg = JSON.parse(data.data);
            if (msg.event == "gotCards") {
                player.hand = player.hand.concat(msg.data.cards);
                console.log(player);
            }
        };
        document.ws.onopen = function(){
            document.ws.send(JSON.stringify({cmd: 'play'}));
            setTimeout(() => {
                document.ws.send(JSON.stringify({cmd: 'start'}));
                setTimeout(() => {
                    document.ws.send(JSON.stringify({cmd: 'resurrect'}));
                }, 1000);
            }, 1000);
        }
    }
    
    function create() {
        create_lower();
        create_info();
        create_cards();
        create_buttons();
        level.level = player.level;
    }
    
    function update() {
       //create_cards();
    }
});