/**
 * Created by ionagamed on 8/19/16.
 */

import { Card } from '../../../Card';
import { Item } from '../helpers/Item';
import { Player } from '../../../Player';

const id = 'rat_on_a_stick';

class _ extends Item {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'treasure';
        this.type = '1-handed';
        this.hands = 1;
        this.wieldable = true;
        this.castable = true;
        this.price = 0;
    }
    
    canBeCast(source, dest, table) {
        return !(dest instanceof Player) &&
            Card.byId(dest).getAttackAgainst(new Player()) <= 8;
    }
    
    onCast(source, dest, table) {
        for (let i in table.fight.monsters) {
            if (table.fight.monsters.hasOwnProperty(i)) {
                if (table.fight.monsters[i] == dest) {
                    table.fight.monsters.splice(i, 1);
                    break;
                }
            }
        }
    }

    getAttackFor(player) {
        return 1;
    }
}
Card.cards[id] = new _();
