/**
 * Created by ionagamed on 8/19/16.
 */

import { Card } from '../../../Card';

const id = 'spiky_knees';

class SpikyKnees extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'treasure';
        this.type = 'knees';
        this.wieldable = true;
        this.price = 200;
    }

    canBeHeld(player, table) {
        return true;
    }

    canBeWielded(player, table) {
        return table.fight == null;
    }

    getAttackFor(player) {
        return 1;
    }
}
Card.cards[id] = new SpikyKnees();
