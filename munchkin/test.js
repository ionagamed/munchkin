/**
 * Created by ionagamed on 8/14/16.
 */

import { Player } from '../logic/Player';
import { Table } from '../logic/Table';
import { Card } from '../logic/Card';
import { Fight } from '../logic/Fight';

import packs from '../logic/packs.js';

function idToInt(id) {
    if (Card.byId(id).kind == 'door') {
        return packs.pack1.doors.indexOf(id);
    } else {
        return packs.pack1.treasure.indexOf(id);
    }
}
function _l(c, x) {
    if (c.kind == 'door') {
        return '<a href="/packs/pack1/img/doors-' + idToInt(x) + '.png">' + x + '</a>';
    } else {
        return '<a href="/packs/pack1/img/treasure-' + idToInt(x) + '.png">' + x + '</a>';
    }
}

function __l(x) {
    const c = Card.byId(x);
    if (c.kind == 'door') {
        return '/packs/pack1/img/doors-' + idToInt(x) + '.png';
    } else {
        return '/packs/pack1/img/treasure-' + idToInt(x) + '.png';
    }
}

$(function () {
    const player = new Player();
    var table = new Table();
    table.players.push(player);
    table.phase = 'open';
    
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
        $('.player .addButton').click(e => {
            add();
            return false;
        });
        $('.player .hand .wield').click(e => {
            const id = /<a.*?>(.*?)<\/a>/.exec($(e.target).closest('li').html())[1];
            console.log(id);
            if (player.wield(id, table)) {
                player.hand.splice(player.hand.indexOf(id), 1);
            }
            updateView();
            return false;
        });
        $('.player .belt .wield').click(e => {
            const id = /<a.*?>(.*?)<\/a>/.exec($(e.target).closest('li').html())[1];
            console.log(id);
            if (player.wield(id, table)) {
                player.belt.splice(player.belt.indexOf(id), 1);
            }
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
            updateView();
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
    
    $('.player .add').keypress(e => {
        if (e.which == 13) {
            add();
            return false;
        }
    });
    $('#id').keypress(e => {
        if (e.which == 13) {
            $('#img').html('<img width="330" height="524" src="' + __l($('#id').val()) + '">');
        }
    });
    
    $('.connectButton').click(e => {
        document.ws = new WebSocket('ws://' + $('#ip').val() + '/?userName=' + $('#username').val() + '&room=abacaba');
        document.ws.onmessage = function (data) {
            const d = JSON.parse(data.data);
            if (d.event == 'gotCards') {
                player.hand = player.hand.concat(d.data.cards);
                console.log(d);
            }
        };
        document.ws.onopen = function () {
            document.ws.send(JSON.stringify({cmd: 'play'}));
            setTimeout(() => {
                document.ws.send(JSON.stringify({cmd: 'start'}));
                setTimeout(() => {
                    document.ws.send(JSON.stringify({cmd: 'resurrect'}));
                    setTimeout(updateView, 1000);
                }, 1000);
            }, 1000);
        };
    });
    
    updateView();
});