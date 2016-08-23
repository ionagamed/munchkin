/**
 * Created by ionagamed on 8/23/16.
 */

import { Player } from '../../../Player';
import { Card } from '../../../Card';

export class MonsterModifier extends Card {
    canBeCast(source, dest, table) {
        return (dest instanceof String) && table.fight != null;
    }

    onCast(source, dest, table) {
        table.fight.monsters.map(x => {
            if (x.monster == dest) {
                x.modifiers.push(this.id);
            }
        });
    }

    /**
     * Returns the additional treasure
     * 
     * @param x
     * @returns {number}
     */
    getTreasureFor(x) {
        
    }
}
