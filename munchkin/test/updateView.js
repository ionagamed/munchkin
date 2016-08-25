/**
 * Created by ionagamed on 8/25/16.
 */

import { Card } from '../../logic/Card';
import { Player } from '../../logic/Player';

import packs from '../../logic/packs';

import _t from './translate';

function idToInt(id) {
    if (Card.byId(id).kind == 'door') {
        return packs.pack1.doors.indexOf(id);
    } else {
        return packs.pack1.treasure.indexOf(id);
    }
}
function _l(c, x) {
    if (c.kind == 'door') {
        return `<a class="itemId" data-uri="/packs/pack1/img/doors-${idToInt(x)}.png">${_t(x)}</a>`;
    } else {
        return `<a class="itemId" data-uri="/packs/pack1/img/treasure-${idToInt(x)}.png">${_t(x)}</a>`;
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

export function updateView(player, table) {
    let updateClasses = () => {
        table.players = table.players.map(x => Object.assign(new Player(), x));
    };
    
    var _d = $('.doors');
    for (let i of [].concat(packs.pack1.doors).sort()) {
        _d.append(`<img width="165" height="257" src="${__l(i)}">`);
    }
    _d = $('.treasure');
    for (let i of [].concat(packs.pack1.treasure).sort()) {
        _d.append(`<img width="165" height="257" src="${__l(i)}">`);
    }
    
    let updatePlayer = (_player) => {
        let content = `<div class="list-group-item" data-player="${_player.name}">`;
        content += _player.name;
        content += ` | пол: ${_t(_player.sex)}`;
        content += ` | уровень: ${_player.level} | сила: <b>${_player.getAttack()}</b>`;
        content += '<ul>';
        content += '<li>рука:<ul>';
        _player.hand.map(x => {
            const c = Card.byId(x);
            var t = [];
            t.push(_l(c, x));
            if (c.getAttackFor && c.getAttackFor(player) != 0) {
                t.push(`<b>+${c.getAttackFor(_player)}</b>`);
            }
            if (c.big) {
                t.push('большая');
            }
            if (c.price) {
                t.push(`${c.price} голдов`);
            }
            t.push(_t(c.type));
            if (player.name == _player.name) {
                if (c.wieldable) {
                    t.push(`<a class="wield">надеть</a>`);
                }
                if (c.usable) {
                    t.push(`<a class="use">использовать</a>`);
                }
                if (c.castable) {
                    t.push(`<a class="cast">кастануть</a>`);
                }
                if (c.price && c.price >= 0) {
                    t.push(`<a class="toBelt">в пояс</a>`);
                }
                t.push(`<a class="discard">в сброс</a>`);
            }
            content += `<li data-id="${x}">${t.join(' | ')}</li>`;
        });
        content += '</ul></li><li>пояс:<ul>';
        _player.belt.map(x => {
            const c = Card.byId(x);
            var t = [];
            t.push(_l(c, x));
            if (c.getAttackFor && c.getAttackFor(player) != 0) {
                t.push(`<b>+${c.getAttackFor(_player)}</b>`);
            }
            if (c.big) {
                t.push('большая');
            }
            if (c.price) {
                t.push(`${c.price} голдов`);
            }
            t.push(_t(c.type));
            if (_player.name == player.name) {
                if (c.wieldable) {
                    t.push(`<a class="wield">надеть</a>`);
                }
                if (c.usable) {
                    t.push(`<a class="use">использовать</a>`);
                }
                if (c.castable) {
                    t.push(`<a class="cast">кастануть</a>`);
                }
                if (c.price && c.price >= 0) {
                    t.push(`<a class="toBelt">в пояс</a>`);
                }
                t.push(`<a class="discard">в сброс</a>`);
            }
            content += `<li data-id="${x}">${t.join(' | ')}</li>`;
        });
        content += '</ul></li><li>стол:<ul>';
        _player.wielded.map(x => {
            const c = Card.byId(x);
            var t = [];
            t.push(_l(c, x));
            if (c.getAttackFor && c.getAttackFor(player) != 0) {
                t.push(`<b>+${c.getAttackFor(_player)}</b>`);
            }
            if (c.big) {
                t.push('большая');
            }
            if (c.price) {
                t.push(`${c.price} голдов`);
            }
            t.push(_t(c.type));
            if (_player.name == player.name) {
                if (c.wieldable) {
                    t.push(`<a class="unwield">снять</a>`);
                }
                if (c.usable) {
                    t.push(`<a class="use">использовать</a>`);
                }
                if (c.castable) {
                    t.push(`<a class="cast">кастануть</a>`);
                }
                if (c.price && c.price >= 0) {
                    t.push(`<a class="toBelt">в пояс</a>`);
                }
                t.push(`<a class="discard">в сброс</a>`);
            }
            content += `<li data-id="${x}">${t.join(' | ')}</li>`;
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