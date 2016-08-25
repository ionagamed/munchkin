/**
 * Created by ionagamed on 8/25/16.
 */

import { Card } from '../../logic/Card';
import { Player } from '../../logic/Player';

import packs from '../../logic/packs';

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

import _t from './translate';

export function updateView(player, table) {
    let updateClasses = () => {
        table.players = table.players.map(x => Object.assign(new Player(), x));
    };
    
    let updatePlayer = (player) => {
        let content = `<div class="list-group-item" data-player="${player.name}">`;
        content += player.name;
        content += ` | уровень: ${player.level} | сила: <b>${player.getAttack()}</b>`;
        content += '<ul>';
        content += '<li>рука:<ul>';
        player.hand.map(x => {
            const c = Card.byId(x);
            var t = [];
            t.push(_l(c, x));
            if (c.getAttackFor) {
                t.push(`<b>+${c.getAttackFor(player)}</b>`);
            }
            if (c.big) {
                t.push('болшая');
            }
            if (c.price) {
                t.push(`${c.price} голдов`);
            }
            t.push(_t(c.type));
            if (c.wieldable) {
                t.push(`<a class="wield">одеть</a>`);
            }
            if (c.usable) {
                t.push(`<a class="use">использовать</a>`);
            }
            if (c.castable) {
                t.push(`<a class="cast">кастануть</a>`);
            }
            t.push(`<a class="toBelt">в пояс</a>`);
            t.push(`<a class="discard">в сброс</a>`);
            content += `<li>${t.join(' | ')}</li>`;
        });
        content += '</ul></li><li>пояс:<ul>';
        player.belt.map(x => {
            const c = Card.byId(x);
            var t = [];
            t.push(_l(c, x));
            if (c.getAttackFor) {
                t.push(`<b>+${c.getAttackFor(player)}</b>`);
            }
            if (c.big) {
                t.push('болшая');
            }
            if (c.price) {
                t.push(`${c.price} голдов`);
            }
            t.push(_t(c.type));
            if (c.wieldable) {
                t.push(`<a class="wield">одеть</a>`);
            }
            if (c.usable) {
                t.push(`<a class="use">использовать</a>`);
            }
            if (c.castable) {
                t.push(`<a class="cast">кастануть</a>`);
            }
            t.push(`<a class="toBelt">в пояс</a>`);
            t.push(`<a class="discard">в сброс</a>`);
            content += `<li>${t.join(' | ')}</li>`;
        });
        content += '</ul></li><li>стол:<ul>';
        player.wielded.map(x => {
            const c = Card.byId(x);
            var t = [];
            t.push(_l(c, x));
            if (c.getAttackFor) {
                t.push(`<b>+${c.getAttackFor(player)}</b>`);
            }
            if (c.big) {
                t.push('болшая');
            }
            if (c.price) {
                t.push(`${c.price} голдов`);
            }
            t.push(_t(c.type));
            if (c.wieldable) {
                t.push(`<a class="unwield">снять</a>`);
            }
            if (c.usable) {
                t.push(`<a class="use">использовать</a>`);
            }
            if (c.castable) {
                t.push(`<a class="cast">кастануть</a>`);
            }
            t.push(`<a class="toBelt">в пояс</a>`);
            t.push(`<a class="discard">в сброс</a>`);
            content += `<li>${t.join(' | ')}</li>`;
        });
        content += '</ul></li></ul></div>';
        $('#players-list').append(content);
    };
    let updatePlayers = () => {
        $('#players').html('<div class="list-group" id="players-list"></div>');
        let idx = -1;
        table.players.map((x, i) => {
            if (x.name == player.name) {
                idx = i;
            }
        });
        if (idx < 0) throw new Exception();
        let passed = 0;
        for (let i = idx; passed < table.players.length; i++) {
            const item = table.players[i % table.players.length];
            updatePlayer(item);
            passed++;
        }
    };
    
    updateClasses();
    updatePlayers();
}