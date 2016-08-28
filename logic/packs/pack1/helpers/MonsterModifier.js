/**
 * Created by ionagamed on 8/23/16.
 */

import { Player } from '../../../Player';
import { Card } from '../../../Card';

export class MonsterModifier extends Card {
    canBeCast(source, dest, table) {
        return (typeof dest == 'string') && table.fight != null;
    }

    onCast(source, dest, table) {
        table.fight.monsters.map(x => {
            if (x.monster == dest) {
                x.modifiers.push(this.id);
            }
        });
    }

    /**
     * Return the modifier
     *
     * @param {object} x
     * @param {Table} table
     * @return {number}
     */
    getModFor(x, table) {
        
    }

    /**
     * Returns the additional treasure
     * 
     * @param {object} x
     * @param {Table} table
     * @returns {number}
     */
    getTreasureFor(x, table) {
        
    }
}
