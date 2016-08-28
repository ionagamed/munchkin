/**
 * Created by ionagamed on 8/14/16.
 */

import { Player } from '../logic/Player';
import { Table } from '../logic/Table';
import { Card } from '../logic/Card';
import Server from '../logic/Server';

document.server = Server;

import packs from '../logic/packs.js';

import { registerLoginHooks } from './test/login';
import { registerPlayerHooks } from './test/player';
import { updateView } from './test/updateView';
import { registerUIHooks } from './test/ui';

import _t from './test/translate';

import message from './test/message';

const UPDATE_DELAY = 2000;

var currentlySelling = [];

var player = new Player();
var table = new Table();

$(function () {
    $('.state-game,.state-wait,.state-win').hide();
    registerLoginHooks((name, room, sex, ip) => {
        Server.onGameStarted = gameBegan(name);
        Server.connect(name, room, sex, ip, () => {
            $('.state-login').hide();
            $('.state-wait').show();
            Server.play();
            Server.player = player;
            Server.table = table;
            Server.roomRequestCallback = (room) => {
                const el = $('.players-wait');
                el.html('');
                room.table.players.map(x => {
                    el.append(`<li>${x.name}</li>`);
                });
                if (room.owner != name) {
                    $('#startGame').hide();
                }
            };
            var tmp = 0;
            const __f = () => {
                Server.roomRequest();
                tmp = setTimeout(__f, 500);
            };
            __f();
            wait(name, tmp);
        });
    });
});

function gameBegan(playerName) {
    return function () {
        $('.state-wait').hide();
        $('.state-game').show();
        Server.resurrect();
        game(playerName);
    }
}

function wait(playerName, n) {
    $('#startGame').click(e => {
        Server.start();
        clearTimeout(n);
    });
}

function game(playerName) {
    player = new Player(playerName);
    table = new Table();
    Server.player = player;
    Server.table = table;
    table.players.push(player);

    const __f = function () {
        if (!document.stopViewUpdate) {
            updateView(player, table, currentlySelling);
            registerPlayerHooks(currentlySelling);
            registerUIHooks();
            if (player.level >= 10) {
                Server.winGame();
                $('.state-game').hide();
                $('.state-win').show();
                $('body').addClass('body-win');
            }
        }
    };
    const __r = function () {
        if (!document.stopReload) {
            Server.roomRequestCallback = __f;
            Server.roomRequest();
        }
        setTimeout(__r, UPDATE_DELAY);
    };
    __r();

    const chatMessageCallback = function (from, text) {
        $('.chat-messages').append(`<li><b>${from}</b>: ${text}</li>`);
    };
    Server.chatMessageCallback = chatMessageCallback;
    
    Server.websocket.onclose = function () {
        $('body').html('<div class="container"><h1>Ой</h1><h4>Соединение разорвано. Быть может, проблема в вас. Может быть и в нас. В любом случае перезагрузка страницы должна помочь.</h4></div>');
    };

    Server.errorCallback = (msg) => {
        message('danger', _t(msg));
    };
}
