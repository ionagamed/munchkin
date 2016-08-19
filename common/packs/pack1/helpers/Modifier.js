/**
 * Created by ionagamed on 8/19/16.
 */

import { Player } from '../../../Player';
    
export class Modifier {
    static canBeCast(source, dest, table) {
        return table.fight != null;
    }
    
    static onCast(source, dest, table, self) {
        if (dest instanceof Player) {
            table.fight.players.map(x => {
                if (x.player.name == dest.name) {
                    x.modifiers.push(self.id);
                }
            });
        } else {
            table.fight.monsters.map(x => {
                if (x.monster == dest) {
                    x.modifiers.push(self.id);
                }
            });
        }
    }
}