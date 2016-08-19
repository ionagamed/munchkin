/**
 * Created by ionagamed on 8/19/16.
 */

import { Card } from '../../../Card';

export class Armor {
    /**
     * Can be wielded if and only if the player has no armor items
     *
     * @param {Player} player
     * @param {Table} table
     * @returns {boolean}
     */
    static canBeWielded(player, table) {
        return player.wielded.filter(x => Card.byId(x).type == 'armor').length == 0;
    }
    
    /**
     * Can be held if and only if the player has one armor item
     * 
     * @param {Player} player
     * @param {Player} table
     * @returns {boolean}
     */
    static canBeHeld(player, table) {
        return player.wielded.filter(x => Card.byId(x).type == 'armor').length <= 1;
    }
}