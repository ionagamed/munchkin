/**
 * Created by ionagamed on 8/14/16.
 */

import { Player } from '../common/Player';
import { Table } from '../common/Table';
import { Card } from '../common/Card';

$(function () {
    const player = new Player();
    const table = new Table();
    
    const updateView = function () {
        $('.player .player-info').html('player: <b>+' + player.getAttack() + '</b>');
        const wielded = $('.player .wielded');
        wielded.html('');
        player.wielded.map(x => {
            const c = Card.byId(x);
            var t = [x];
            if (t.getAttack) {
                t.push('+' + t.getAttack());
            }
            if (c.wieldable) {
                t.push('<a class="unwield" href="#">unwield</a>');
            }
            wielded.append('<li>' + t.join(' | ') + '</li>');
        });
        const hand = $('.player .hand');
        hand.html('');
        player.hand.map(x => {
            const c = Card.byId(x);
            var t = [x];
            if (t.getAttack) {
                t.push('+' + t.getAttack());
            }
            if (c.wieldable) {
                t.push('<a class="wield" href="#">wield</a>');
            }
            if (c.usable) {
                t.push('<a class="use" href="#">use</a>')
            }
            hand.append('<li>' + t.join(' | ') + '</li>');
        });
        const belt = $('.player .belt');
        belt.html('');
        player.belt.map(x => {
            const c = Card.byId(x);
            var t = [x];
            if (t.getAttack) {
                t.push('+' + t.getAttack());
            }
            if (c.wieldable) {
                t.push('<a class="wield" href="#">wield</a>');
            }
            if (c.usable) {
                t.push('<a class="use" href="#">use</a>')
            }
            belt.append('<li>' + t.join(' | ') + '</li>');
        });
    };
    const rebindHooks = function () {
        const add = function () {
            const item = $('.player .add');
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
            const id = $(e.target).html();
            player.hand.splice(player.hand.indexOf(id));
            player.wield(id);
            updateView();
        });
    };
    
    rebindHooks();
    updateView();
});