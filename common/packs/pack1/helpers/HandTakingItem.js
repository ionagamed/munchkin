/**
 * Created by ionagamed on 8/19/16.
 */

import { Item } from './Item';    
    
export class HandTakingItem {
    /**
     * Can be held if there are 2 or less busy hands 
     * 
     * @param {Player} player
     * @param {Table} table
     * @param {number} handCount how much hands are needed
     * @returns {boolean}
     */
    static canBeHeld(player, table, handCount) {
        return player.getBusyHandCount() <= 2;
    }

    /**
     * Can be wielded if there are 2 - handCount or less busy hands
     * 
     * @param {Player} player
     * @param {Table} table
     * @param {number} handCount
     * @returns {boolean}
     */
    static canBeWielded(player, table, handCount) {
        if (!Item.canBeWielded(player, table)) {
            return false;
        }
        return player.getBusyHandCount() <= 2 - handCount;
    }
}