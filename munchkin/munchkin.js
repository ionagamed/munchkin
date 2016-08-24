/**
 * Created by ionagamed on 8/11/16.
 */

import { Card } from '../logic/Card';
import { Player } from '../logic/Player';
import { Table } from '../logic/Table';

import packs from '../logic/packs.js';
import dice from '../logic/dice.js';

import './test.js';
import './action.js';
import './events.js';
import { load, create_lower, create_info, create_cards, create_buttons } from './load.js';

export var game,
    ccount = 14, cards = [], openChat, closeChat,
    paper, keyboard, scale, down_lower, upper_lower,
    level = {}, power, antipower, monster, cobble, grass, knight,
    buttonAttack, buttonSmivka,
    player = new Player(), table = new Table();

$(function () {
    game = new Phaser.Game('100', '100', Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update
    });

    function preload() {
        for (let i in packs.pack1.doors) {
            if (packs.pack1.doors.hasOwnProperty(i))
                game.load.image('pack1_' + packs.pack1.doors[i], 'packs/pack1/img/doors-' + i + '.png');
        }
        for (let i in packs.pack1.treasure) {
            if (packs.pack1.treasure.hasOwnProperty(i))
                game.load.image('pack1_' + packs.pack1.treasure[i], 'packs/pack1/img/treasure-' + i + '.png');
        }
        load();
        document.ws = new WebSocket('ws://localhost:3031/?userName=DAr&room=Kek');
        /*document.ws.onmessage = function(data){
            const msg = JSON.parse(data.data);
            if (msg.event == "gotCards") {
                player.hand = player.hand.concat(msg.data.cards);
                console.log(player);
            }
        };*/
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
        //create_cards();
        create_buttons();
        document.ws.onmessage = function(data){
            const msg = JSON.parse(data.data);
            if (msg.event == "gotCards") {
                player.hand = player.hand.concat(msg.data.cards);
                create_cards();
                level.text = "Your Level = " + player.level;
                console.log(player);
                console.log(msg);
                console.log(cards[0]);
                console.log(Card.byId(cards[0]));
            }
        };
    }
    
    function update() {
        
    }
});