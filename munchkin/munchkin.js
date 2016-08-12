/**
 * Created by ionagamed on 8/11/16.
 */

import { Card } from './Card';
import { Player } from './Player';

$(function () {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update
    });

    function preload() {
        game.load()
    }

    function create() {

    }

    function update() {

    }
});