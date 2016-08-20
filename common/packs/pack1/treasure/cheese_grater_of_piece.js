/**
 * Created by ionagamed on 8/19/16.
 */

import { Card } from '../../../Card';
import { Item } from '../helpers/Item';

const id = 'cheese_grater_of_piece';

class _ extends Item {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'treasure';
        this.type = '1-handed';
        this.hands = 1;
        this.wieldable = true;
        this.price = 600;
    }

    canBeHeld(player, table) {
        return player.hasClassAdvantages('cleric') && super.canBeHeld(player, table);
    }

    canBeWielded(player, table) {
        return player.hasClassAdvantages('cleric') && super.canBeWielded(player, table);
    }

    getAttackFor(player) {
        return 3;
    }
}
Card.cards[id] = new _();
