/**
 * Created by ionagamed on 8/18/16.
 */

import { Card } from '../../../Card';
import { Player } from '../../../Player';

const id = 'cotion_of_ponfusion';

class CotionOfPonfusion extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'treasure';
        this.type = 'modifier';
        this.castable = true;
        this.price = 100;
    }

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

    getModFor(x) {
        return 3;
    }
}
Card.cards[id] = new CotionOfPonfusion();
