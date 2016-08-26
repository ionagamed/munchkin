/**
 * Created by ionagamed on 8/25/16.
 */

import { Card } from '../../logic/Card';
import { Player } from '../../logic/Player';
import { Fight } from '../../logic/Fight';

import packs from '../../logic/packs';

import _t from './translate';

export function updateView(player, table) {
    let updatePlayer = (_player) => {
        let content = `<div class="list-group-item" data-player="${_player.name}">`;
        content += _player.name;
        content += ` | пол: ${_t(_player.sex)}`;
        content += ` | уровень: ${_player.level} | сила: <b>${_player.getAttack()}</b>`;
        content += '<br><ul>';
        content += '<li>рука:<ul class="list-group">';
        _player.hand.map(x => {
            const c = Card.byId(x);
            var t = [];
            t.push(`${_t(x)}<br>`);
            if (c.getAttackFor && c.getAttackFor(player) != 0) {
                t.push(`<b>+${c.getAttackFor(_player)}</b>`);
            }
            if (c.big) {
                t.push('большая');
            }
            if (c.price) {
                t.push(`${c.price} голдов`);
            }
            if (player.name == _player.name) {
                t.push(_t(c.type));
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
            content += `<li class='list-group-item itemId' data-id="${x}">${t.join(' | ')}</li>`;
        });
        content += '</ul></li><li>пояс:<ul class="list-group">';
        _player.belt.map(x => {
            const c = Card.byId(x);
            var t = [];
            t.push(`${_t(x)}<br>`);
            if (c.getAttackFor && c.getAttackFor(player) != 0) {
                t.push(`<b>+${c.getAttackFor(_player)}</b>`);
            }
            if (c.big) {
                t.push('большая');
            }
            if (c.price) {
                t.push(`${c.price} голдов`);
            }
            if (_player.name == player.name) {
                t.push(_t(c.type));
                if (c.wieldable) {
                    t.push(`<a class="wield">надеть</a>`);
                }
                if (c.usable) {
                    t.push(`<a class="use">использовать</a>`);
                }
                if (c.castable) {
                    t.push(`<a class="cast">кастануть</a>`);
                }
                t.push(`<a class="discard">в сброс</a>`);
            }
            content += `<li class='list-group-item itemId' data-id="${x}">${t.join(' | ')}</li>`;
        });
        content += '</ul></li><li>стол:<ul class="list-group">';
        _player.wielded.map(x => {
            const c = Card.byId(x);
            var t = [];
            t.push(`${_t(x)}<br>`);
            if (c.getAttackFor && c.getAttackFor(player) != 0) {
                t.push(`<b>+${c.getAttackFor(_player)}</b>`);
            }
            if (c.big) {
                t.push('большая');
            }
            if (c.price) {
                t.push(`${c.price} голдов`);
            }
            if (_player.name == player.name) {
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
                t.push(`<a class="discard">в сброс</a>`);
            }
            content += `<li class='list-group-item itemId' data-id="${x}">${t.join(' | ')}</li>`;
        });
        content += '</ul></li></ul>';
        content += `<div class='btn-group'>`;
        if (table.players[table.turn].name == player.name && player.name == _player.name) {
            if (table.phase == 'begin') {
                content += `<button class='btn btn-primary kickDoor'>Пнуть дверь</button>`;
            }
            if (table.phase == 'open' && table.fight == null) {
                content += `<button class='btn btn-primary closeDoor'>Почистить нычки</button>`
            }
            if (table.phase != 'begin') {
                if (table.fight == null) {
                    content += `<button class='btn btn-primary endTurn'>Закончить ход</button>`;
                } else {
                    content += `<button class='btn btn-primary disabled'>Нельзя закончить ход</button>`
                }
            }
        }
        content += '</div></div>';
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
    
    let updateFight = () => {
        const fightEl = $('.fight');
        if (!table.fight) {
            fightEl.html('на данный момент все спокойно');
        } else {
            let content = '';
            if (table.fight.getWinningSide() == 'players') {
                if (+(new Date()) - table.fight.beganAt < 5) {
                    content += ` | осталось ${+(new Date()) - table.fight.beganAt} секунд`;
                } else {
                    content += ` | <a href='#' class='winFight'>выиграть</a>`;
                }
            } else {
                content += ` | <a href='#' class='escape'>смывка</a>`;
            }
            content += `<ul><li>монстры: | атака: <b>${table.fight.getMonstersAttack()}</b><ul>`;
            table.fight.monsters.map(x => {
                content += `<li><a class='itemId' data-id='${x.monster}'>${_t(x.monster)}</a> | атака: <b>${Card.byId(x.monster).getAttackAgainst(table.fight.players.map(y => y.player))}</b>`;
                content += `<ul>`;
                x.modifiers.map(y => {
                    content += `<li><a class='itemId' data-id='${y}'>${_t(y)}</a></li>`;
                });
                content += `</ul></li>`;
            });
            content += `</ul></li><li>игроки: | атака: <b>${table.fight.getPlayersAttack()}</b><ul>`;
            table.fight.players.map(x => {
                content += `<li>${x.player.name} | атака: <b>${x.player.getAttack()}</b><ul>`;
                x.modifiers.map(y => {
                    content += `<li><a class='itemId' data-id='${y}'>${_t(y)}</a></li>`;
                });
                content += `</ul></li>`;
            });
            content += '</ul></li></ul>';
            fightEl.html(content);
        }
    };
    let updateKickedDoor = () => {
        if (table.recentDoor) {
            $('.recentDoor').html(`<a class='itemId' data-id='${table.recentDoor}'>${_t(table.recentDoor)}</a>`);
        }
    };
    let updateDiscard = () => {
        if (table.discardedDoors.length > 0) {
            const id = table.discardedDoors[table.discardedDoors.length - 1];
            $('.discardedDoors').html(`<a class='itemId' data-id='${id}'>${_t(id)}</a>, ...`)
        }
        if (table.discardedTreasure.length > 0) {
            const id = table.discardedTreasure[table.discardedTreasure.length - 1];
            $('.discardedTreasure').html(`<a class='itemId' data-id='${id}'>${_t(id)}</a>, ...`)
        }
    };
    let updateTable = () => {
        updateDiscard();
        updateKickedDoor();
        updateFight();
    };
    
    if (table.fight) {
        console.log(table.fight.players[0].player.hasRaceAdvantages);
    }
    updatePlayers();
    updateTable();
}