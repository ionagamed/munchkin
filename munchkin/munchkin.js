/**
 * Created by ionagamed on 8/11/16.
 */

import { Card } from '../common/Card';
import { Player } from '../common/Player';

import packs from '../common/packs.js';

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
        let octa = Card.byId('gelatinous_octahedron');
        game.add.sprite(50, 50, octa.image);
    }

    function update() {
        
    }
});
