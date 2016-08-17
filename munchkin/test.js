/**
 * Created by ionagamed on 8/14/16.
 */

import { Player } from '../common/Player';
import { Table } from '../common/Table';
import { Card } from '../common/Card';

import { packs } from '../common/packs.js';

function idToInt(id) {
    if (Card.byId(id).type == 'door') {
        return packs.pack1.doors.indexOf(id);
    } else {
        return packs.pack1.treasure.indexOf(id);
    }
}

$(function () {
    const player = new Player();
    const table = new Table();
    
    const updateView = function () {
        $('.player .player-info').html('player: <b>+' + player.getAttack() + '</b>');
        const wielded = $('.player .wielded');
        wielded.html('');
        player.wielded.map(x => {
            const c = Card.byId(x);
            var t = [];
            t.push('<a href="/packs/pack1/img/' + c.type + '-' + idToInt(x) + '.png">' + x + '</a>');
            if (c.getAttackFor) {
                t.push('<b>+' + c.getAttackFor(player) + '</b>');
            }
            if (c.wieldable) {
                t.push('<a class="unwield" href="#">unwield</a>');
            }
            t.push('<a class="discard" href="#">discard</a>');
            wielded.append('<li>' + t.join(' | ') + '</li>');
        });
        const hand = $('.player .hand');
        hand.html('');
        player.hand.map(x => {
            const c = Card.byId(x);
            var t = [];
            t.push('<a href="/packs/pack1/img/' + c.type + '-' + idToInt(x) + '.png">' + x + '</a>');
            if (c.getAttackFor) {
                t.push('<b>+' + c.getAttackFor(player) + '</b>');
            }
            if (c.wieldable) {
                t.push('<a class="wield" href="#">wield</a>');
            }
            if (c.usable) {
                t.push('<a class="use" href="#">use</a>')
            }
            t.push('<a class="discard" href="#">discard</a>');
            hand.append('<li>' + t.join(' | ') + '</li>');
        });
        const belt = $('.player .belt');
        belt.html('');
        player.belt.map(x => {
            const c = Card.byId(x);
            var t = [];
            t.push('<a href="/packs/pack1/img/' + c.type + '-' + idToInt(x) + '.png">' + x + '</a>');
            if (c.getAttackFor) {
                t.push('<b>+' + c.getAttackFor(player) + '</b>');
            }
            if (c.wieldable) {
                t.push('<a class="wield" href="#">wield</a>');
            }
            if (c.usable) {
                t.push('<a class="use" href="#">use</a>')
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
        rebindHooks();
    };
    const rebindHooks = function () {
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
        $('.player .addButton').click(add);
        $('.player .add').keypress(e => {
            if (e.which == 13) {
                add();
                return false;
            }
        });
        $('.player .wield').click(e => {
            const id = $(e.target).closest('li').html().split(' ')[0];
            if (player.wield(id)) {
                player.hand.splice(player.hand.indexOf(id), 1);
            }
            updateView();
        });
        $('.player .hand .use').click(e => {
            const id = $(e.target).closest('li').html().split(' ')[0];
            player.hand.splice(player.hand.indexOf(id), 1);
            if (Card.byId(id).onUsed(player, table)) {
                table.discard(id);
            }
            updateView();
        });
        
        $('.player .hand .discard').click(e => {
            const id = $(e.target).closest('li').html().split(' ')[0];
            player.hand.splice(player.hand.indexOf(id), 1);
            table.discard(id);
            updateView();
        });
        $('.player .wielded .discard').click(e => {
            const id = $(e.target).closest('li').html().split(' ')[0];
            player.wielded.splice(player.wielded.indexOf(id), 1);
            table.discard(id);
            updateView();
        });
        $('.player .belt .discard').click(e => {
            const id = $(e.target).closest('li').html().split(' ')[0];
            player.belt.splice(player.belt.indexOf(id), 1);
            table.discard(id);
            updateView();
        });
    };
    
    updateView();
});