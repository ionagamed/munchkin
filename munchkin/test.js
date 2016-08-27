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

const UPDATE_DELAY = 2000;

var currentlySelling = [];

$(function () {
    $('.state-game,.state-wait,.state-win').hide();
    registerLoginHooks((name, room, ip) => {
        Server.onGameStarted = gameBegan(name);
        Server.connect(name, room, ip, () => {
            $('.state-login').hide();
            $('.state-wait').show();
            wait(name);
            Server.play();
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

function wait(playerName) {
    $('#startGame').click(e => {
        Server.start();
    });
}

function game(playerName) {
    let player = new Player(playerName);
    let table = new Table();
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
}

function neverCalled() {
    console.log(Server);
    const player = new Player();
    var table = new Table();
    table.players.push(player);
    table.phase = 'open';
    Server.player = player;
    Server.table = table;
    
    const updateView = function () {
        $('.player .player-info').html('player: <b>+' + player.getAttack() + '</b>');
        const wielded = $('.player .wielded');
        wielded.html('');
        player.wielded.map(x => {
            const c = Card.byId(x);
            var t = [];
            t.push(_l(c, x));
            if (c.getAttackFor) {
                t.push('<b>+' + c.getAttackFor(player) + '</b>');
            }
            if (c.big) {
                t.push('big');
            }
            t.push(c.type);
            if (c.wieldable) {
                t.push('<a class="unwield" href="#">unwield</a>');
            }
            t.push('<a class="to-belt" href="#">to belt</a>');
            t.push('<a class="discard" href="#">discard</a>');
            wielded.append('<li>' + t.join(' | ') + '</li>');
        });
        const hand = $('.player .hand');
        hand.html('');
        player.hand.map(x => {
            const c = Card.byId(x);
            var t = [];
            t.push(_l(c, x));
            if (c.getAttackFor) {
                t.push('<b>+' + c.getAttackFor(player) + '</b>');
            }
            if (c.big) {
                t.push('big');
            }
            t.push(c.type);
            if (c.wieldable) {
                t.push('<a class="wield" href="#">wield</a>');
            }
            if (c.usable) {
                t.push('<a class="use" href="#">use</a>')
            }
            if (c.castable) {
                t.push('<a class="cast" href="#">cast</a>');
            }
            t.push('<a class="to-belt" href="#">to belt</a>');
            t.push('<a class="discard" href="#">discard</a>');
            hand.append('<li>' + t.join(' | ') + '</li>');
        });
        const belt = $('.player .belt');
        belt.html('');
        player.belt.map(x => {
            const c = Card.byId(x);
            var t = [];
            t.push(_l(c, x));
            if (c.getAttackFor) {
                t.push('<b>+' + c.getAttackFor(player) + '</b>');
            }
            if (c.big) {
                t.push('big');
            }
            t.push(c.type);
            if (c.wieldable) {
                t.push('<a class="wield" href="#">wield</a>');
            }
            if (c.usable) {
                t.push('<a class="use" href="#">use</a>')
            }
            if (c.castable) {
                t.push('<a class="cast" href="#">cast</a>');
            }
            t.push('<a class="discard" href="#">discard</a>');
            belt.append('<li>' + t.join(' | ') + '</li>');
        });
        const dDoors = $('.table .discardedDoors');
        dDoors.html('');
        [].concat(table.discardedDoors).reverse().map(x => {
            dDoors.append('<li>' + x + '</li>');
        });
        const dTreasure = $('.table .discardedTreasure');
        dTreasure.html('');
        [].concat(table.discardedTreasure).reverse().map(x => {
            dTreasure.append('<li>' + x + '</li>');
        });
        if (table.fight) {
            $('.fight .result').html(table.fight.getWinningSide());
            $('.p-attack').html(table.fight.getPlayersAttack());
            $('.m-attack').html(table.fight.getMonstersAttack());
            const mList = $('.monsters-list');
            mList.html('');
            table.fight.monsters.map(x => {
                mList.append('<li>' + x.monster + '</li>');
            });
        }
        // const pList = $('.players-list');
        // table.fight.players.map(x => {
        //     pList.append('<li><ul><li>modifiers</li></ul></li>')
        // });
        rebindHooks();
    };
    const add = function () {
        const item = $('.player .add');
        if (!Card.byId(item.val())) {
            alert('no such card');
            return false;
        }
        player.hand.push(item.val());
        item.val('');
        updateView();
    };
    const rebindHooks = function () {
        $('.player .hand .wield').click(e => {
            const id = /<a.*?>(.*?)<\/a>/.exec($(e.target).closest('li').html())[1];
            Server.wieldCard(id);
            return false;
        });
        $('.player .belt .wield').click(e => {
            const id = /<a.*?>(.*?)<\/a>/.exec($(e.target).closest('li').html())[1];
            updateView();
            return false;
        });
        $('.player .hand .use').click(e => {
            const id = /<a.*?>(.*?)<\/a>/.exec($(e.target).closest('li').html())[1];
            if (Card.byId(id).canBeUsed(player, table)) {
                player.hand.splice(player.hand.indexOf(id), 1);
                if (Card.byId(id).onUsed(player, table)) {
                    table.discard(id);
                }
            }
            updateView();
            return false;
        });
        $('.player .hand .cast').click(e => {
            const id = /<a.*?>(.*?)<\/a>/.exec($(e.target).closest('li').html())[1];
            if (Card.byId(id).canBeCast(player, 'gelatinous_octahedron', table)) {
                player.hand.splice(player.hand.indexOf(id), 1);
                // TODO: add variety :)
                var dest = '';
                if (id == 'cotion_of_ponfusion') {
                    dest = 'gelatinous_octahedron';
                } else {
                    dest = player;
                }
                if (Card.byId(id).onCast(player, dest, table)) {
                    table.discard(id);
                }
            }
            updateView();
            return false;
        });
        
        $('.player .wielded .to-belt').click(e => {
            const id = /<a.*?>(.*?)<\/a>/.exec($(e.target).closest('li').html())[1];
            player.unwield(id, table);
            player.belt.push(id);
            updateView();            console.log(id);
            
            return false;
        });
        
        $('.player .hand .discard').click(e => {
            const id = /<a.*?>(.*?)<\/a>/.exec($(e.target).closest('li').html())[1];
            player.hand.splice(player.hand.indexOf(id), 1);
            table.discard(id);
            updateView();
            return false;
        });
        $('.player .wielded .discard').click(e => {
            const id = /<a.*?>(.*?)<\/a>/.exec($(e.target).closest('li').html())[1];
            player.unwield(id, table);
            table.discard(id);
            updateView();
            return false;
        });
        $('.player .belt .discard').click(e => {
            const id = /<a.*?>(.*?)<\/a>/.exec($(e.target).closest('li').html())[1];
            player.belt.splice(player.belt.indexOf(id), 1);
            table.discard(id);
            updateView();
            return false;
        });
    };
    
    $('#id').keypress(e => {
        if (e.which == 13) {
            $('#img').html('<img width="330" height="524" src="' + __l($('#id').val()) + '">');
        }
    });
    
    $('.connectButton').click(e => {
        const username = $('#username').val();
        player.name = username;
        Server.connect(username, $('#ip').val(), 'abacaba');
    });
    $('.playButton').click(e => {
        Server.play();
    });
    $('.startButton').click(e => {
        Server.start();
    });
    $('.roomRequestButton').click(e => {
        Server.roomRequest();
    });
    $('.resurrectButton').click(e => {
        Server.resurrect();
    });
    
    const __f = function () {
        updateView();
        setTimeout(__f, 500);
    };
    __f();
}