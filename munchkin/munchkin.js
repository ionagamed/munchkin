/**
 * Created by ionagamed on 8/11/16.
 */

import { Card } from '../common/Card';
import { Player } from '../common/Player';
import { Table } from '../common/Table';

import packs from '../common/packs.js';
import dice from '../common/dice.js';

$(function () {
    document.ws = new WebSocket("ws://localhost:8081");
    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
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
    }

    function create() {
        let player = new Player();
        // TODO: add proper table definition
        let table = new Table();
        player.wielded.push('mithril_armor');
        console.log(player.wielded);
        Card.byId('curse_lose_armor').onCast('deck', player, table);
        console.log(player.wielded);
        $('#escape').click(e => {
            Card.byId('gelatinous_octahedron').onEscape(player, dice(), table);
        });
    }

    function update() {
        
    }
});
