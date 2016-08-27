/**
 * Created by ionagamed on 8/19/16.
 */

import { Card } from '../../../Card';
import { Item } from '../helpers/Item';

const id = 'singing_and_dancing_sword';

class _ extends Item {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'treasure';
        this.type = 'item';
        this.wieldable = true;
        this.price = 600;
    }

    canBeHeld(player, table) {
        return !player.hasClassDisadvantages('thief') && super.canBeHeld(player, table);
    }

    canBeWielded(player, table) {
        return !player.hasClassDisadvantages('thief') && super.canBeWielded(player, table);
    }

    getAttackFor(player) {
        return 2;
    }
}
Card.cards[id] = new _();
