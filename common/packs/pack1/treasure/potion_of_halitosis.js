/**
 * Created by ionagamed on 8/19/16.
 */

import { Card } from '../../../Card';
import { Modifier } from '../helpers/Modifier';

const id = 'potion_of_halitosis';

class _ extends Modifier {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'treasure';
        this.type = 'modifier';
        this.castable = true;
        this.price = 100;
    }
    
    onCast(source, dest, table) {
        if (dest == 'floating_nose') {
            for (let i in table.fight.monsters) {
                if (table.fight.monsters.hasOwnProperty(i)) {
                    if (table.fight.monsters[i].monster == 'floating_nose') {
                        table.fight.monsters.splice(i, 1);
                        break;
                    }
                }
            }
        } else {
            super.onCast(source, dest, table);
        }
    }

    getModFor(x) {
        return 2;
    }
}
Card.cards[id] = new _();
