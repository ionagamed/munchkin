/**
 * Created by ionagamed on 8/25/16.
 */

import { Card } from '../../logic/Card';
import { Player } from '../../logic/Player';
import { Fight } from '../../logic/Fight';

import packs from '../../logic/packs';

import item from './item';

import _t from './translate';

export function updateView(player, table, currentlySelling) {
    let updatePlayer = (_player) => {
        let content = `<div class="list-group-item" data-player="${_player.name}">`;
        content += _player.name;
        content += ` | пол: ${_t(_player.sex)}`;
        content += ` | уровень: ${_player.level} | сила: <b>${_player.getAttack()}</b>`;
        content += '<br><ul>';
        content += '<li>рука:<ul class="list-group">';
        _player.hand.map(x => {
            content += item(x, [
                'name',
                'attack',
                'big',
                'price',
                'sell',
                'type',
                'wield',
                'toBelt',
                'use',
                'cast',
                'discard'
            ], player, _player);
        });
        content += '</ul></li><li>пояс:<ul class="list-group">';
        _player.belt.map(x => {
            content += item(x, [
                'name',
                'attack',
                'big',
                'price',
                'sell',
                'type',
                'wield',
                'use',
                'cast',
                'discard'
            ], player, _player);
        });
        content += '</ul></li><li>стол:<ul class="list-group">';
        _player.wielded.map(x => {
            content += item(x, [
                'name',
                'attack',
                'big',
                'price',
                'sell',
                'type',
                'unwield',
                'use',
                'cast',
                'discard'
            ], player, _player);
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
                    if ((player.hasClassAdvantages('dwarf') && player.hand.length > 6) || player.hand.length > 5) {
                        content += `<button class='btn btn-primary disabled'>Нельзя закончить ход</button>`
                    } else {
                        content += `<button class='btn btn-primary endTurn'>Закончить ход</button>`;
                    }
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
            let isFighting = false;
            table.fight.players.map(x => {
                if (x.player.name == player.name) isFighting = true;
            });
            
            let content = '';
            if (table.fight.players[0].state == 'fighting' && isFighting && table.fight.players[0].player.name == player.name) {
                if (table.fight.getWinningSide() == 'players') {
                    if (+(new Date()) - table.fight.beganAt < 5) {
                        content += ` | осталось ${+(new Date()) - table.fight.beganAt} секунд`;
                    } else {
                        content += ` | <a href='#' class='winFight'>выиграть</a>`;
                    }
                } else {
                    content += ` | <a href='#' class='escape'>смывка</a>`;
                }
                if (table.fight.players[0].player.name == player.name && table.currentlyHelping.length > 0) {
                    content += ` | помощь от: `;
                    let t = [];
                    table.currentlyHelping.map(x => {
                        t.push(`<a class='acceptHelp' data-from='${x}'>${x}</a>`);
                    });
                    content += t.join(', ');
                }
            }
            if (table.fight.players[0].state == 'fighting' && !isFighting) {
                if (table.currentlyHelping.indexOf(player.name) < 0) {
                    content += ` | <a href='#' class='help'>помочь</a>`;
                } else {
                    content += ` | предложена помощь`;
                }
            }
            content += `<ul><li>монстры: | атака: <b>${table.fight.getMonstersAttack()}</b>`;
            content += `<ul>`;
            table.fight.monsters.map((x, i) => {
                content += `<li><a class='itemId' data-id='${x.monster}'>${_t(x.monster)}</a> | атака: <b>${Card.byId(x.monster).getAttackAgainst(table.fight.players.map(y => y.player))}</b>`;
                if (table.fight.players[0].state == 'escaping' && isFighting) {
                    content += ` | <button class='m_escape' data-pos='${i}'>смыться</button>`;
                }
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
    let updateDice = () => {
        const el = $('.dice');
        el.html('');
        for (let i of [].concat(table.diceRolls).reverse().splice(0, 10)) {
            el.append(`<img width='25' height='25' src='/img/dice-${i}.png'>`);
        }
    };
    let updateTable = () => {
        updateDiscard();
        updateKickedDoor();
        updateFight();
        updateDice();
    };
    
    let updateCastList = () => {
        const wrapper = $('.cast-list-wrapper');
        const list = $('.cast-list');
        list.html('');
        if (wrapper.hasClass('hidden')) return;
        const card = Card.byId(wrapper.data('card'));
        table.players.map(x => {
            if (card.canBeCast(player, x, table)) {
                list.append(`<li><a class='doCast' data-type='player' data-target='${x.name}'>${x.name}</a></li>`);
            }
        });
        if (table.fight) {
            table.fight.monsters.map(x => {
                if (card.canBeCast(player, x.monster, table)) {
                    list.append(`<li><a class='doCast' data-type='monster' data-target='${x.monster}'>${_t(x.monster)}</a></li>`);
                }
            });
        }
    };
    
    let updateSelling = () => {
        let sum = 0;
        const list = $('.sell-list');
        list.html('');
        currentlySelling.map(x => {
            sum += Card.byId(x).price;
            list.append(`<li><a class='itemId' data-id='${x}'>${_t(x)}</a></li>`);
        });
        $('.price').html(sum);
    };
    
    updatePlayers();
    updateTable();
    updateCastList();
    updateSelling();
}