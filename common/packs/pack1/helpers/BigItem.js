/**
 * Created by ionagamed on 8/19/16.
 */

import { Card } from '../../../Card';

export class BigItem {
    /**
     * Can be wielded if either:
     *   * player has the 'dwarf' card
     *   * player has no big items
     * 
     * @param {Player} player
     * @param {Table} table
     */
    static canBeWielded(player, table) {
        return player.hasCardWielded('dwarf') ||
            player.wielded.filter(x => Card.byId(x).big).length == 0;
    }

    /**
     * Can be held if either:
     *   * player has the 'dwarf' card
     *   * player has less than one big item
     * 
     * @param {Player} player
     * @param {Table} table
     * @returns {boolean}
     */
    static canBeHeld(player, table) {
        return player.hasCardWielded('dwarf') ||
            player.wielded.filter(x => Card.byId(x).big).length <= 1;
    }
}