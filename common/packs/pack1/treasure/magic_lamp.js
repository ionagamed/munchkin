/**
 * Created by ionagamed on 8/19/16.
 */

import { Card } from '../../../Card';
import { Player } from "../../../Player";

const id = 'magic_lamp';

class _ extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'treasure';
        this.type = 'magic_lamp';
        this.castable = true;
        this.price = 400;
    }

    canBeCast(source, dest, table) {
        return table.fight != null &&
            !(dest instanceof Player);     
    }
    
    onCast(source, dest, table) {
        for (let i in table.fight.monsters) {
            if (table.fight.monsters.hasOwnProperty(i)) {
                if (table.fight.monsters[i].monster == dest) {
                    table.fight.monsters.splice(i, 1);
                    break;
                }
            }
        }
        return true;
    }
}
Card.cards[id] = new _();
