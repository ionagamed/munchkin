/**
 * Created by ionagamed on 8/19/16.
 */

import { Player } from '../../../Player';
import { Card } from '../../../Card';
    
export class Modifier extends Card {
    canBeCast(source, dest, table) {
        return table.fight != null;
    }
    
    onCast(source, dest, table) {
        if (dest instanceof Player) {
            table.fight.players.map(x => {
                if (x.player.name == dest.name) {
                    x.modifiers.push(this.id);
                }
            });
        } else {
            table.fight.monsters.map(x => {
                if (x.monster == dest) {
                    x.modifiers.push(this.id);
                }
            });
        }
    }
}