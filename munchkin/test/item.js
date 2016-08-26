/**
 * Created by ionagamed on 8/26/16.
 */
import { Card } from '../../logic/Card';
import _t from './translate';

/**
 * Get the html representation of item with options
 * 
 * @param {string} id
 * @param {[string]} opts
 * @param {Player} player me
 * @param {Player} _player current
 * @returns {string}
 */
export default function (id, opts, player, _player) {
    const card = Card.byId(id);
    let t = [];
    for (let option of opts) {
        switch (option) {
            case 'attack':
                if (card.getAttackFor && card.getAttackFor(player) != 0) {
                    t.push(`<b>+${card.getAttackFor(player)}</b>`);
                }
                break;
            case 'name':
                t.push(`${_t(id)}<br>`);
                break;
            case 'big':
                if (card.big) {
                    t.push(`большая`);
                }
                break;
            case 'price':
                if (card.price) {
                    t.push(`${card.price} голдов`);
                }
                break;
            case 'sell':
                if (_player.name == player.name && card.price) {
                    t.push(`<a class='sell'>продать</a>`);
                }
                break;
            case 'type':
                t.push(_t(card.type));
                break;
            case 'wield':
                if (_player.name == player.name && card.wieldable) {
                    t.push(`<a class='wield'>надеть</a>`);
                }
                break;
            case 'unwield':
                if (_player.name == player.name && card.wieldable) {
                    t.push(`<a class='unwield'>снять</a>`);
                }
                break;
            case 'use':
                if (_player.name == player.name && card.usable) {
                    t.push(`<a class='use'>использовать</a>`);
                }
                break;
            case 'cast':
                if (_player.name == player.name && card.castable) {
                    t.push(`<a class='cast'>кастануть</a>`);
                }
                break;
            case 'discard':
                if (_player.name == player.name) {
                    t.push(`<a class='discard'>в сброс</a>`);
                }
                break;
        }
    }
    return `<li class='list-group-item itemId' data-id='${id}'>${t.join(' | ')}</li>`;
};