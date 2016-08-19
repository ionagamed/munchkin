/**
 * Created by ionagamed on 8/14/16.
 */

import { Card } from '../../../Card';
import { Player } from '../../../Player';

const id = 'curse_lose_armor';

class CurseLoseArmor extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'curse';
        this.castable = true;
    }
    canBeCast(source, dest, table) {
        return dest instanceof Player;
    }
    onCast(source, dest, table) {
        for (let i of dest.wielded) {
            if (Card.byId(i).type === 'armor') {
                dest.unwield(i);
                table.dispose(i);
            }
        }
    }
}
Card.cards[id] = new CurseLoseArmor();