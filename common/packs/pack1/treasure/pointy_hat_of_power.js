/**
 * Created by ionagamed on 8/19/16.
 */

import { Card } from '../../../Card';
import { Item } from '../helpers/Item';

const id = 'pointy_hat_of_power';

class _ extends Item {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'treasure';
        this.type = 'headgear';
        this.wieldable = true;
        this.price = 400;
    }

    canBeHeld(player, table) {
        return player.hasClassAdvantages('wizard') && super.canBeHeld(player, table);
    }

    canBeWielded(player, table) {
        return player.hasClassAdvantages('wizard') && super.canBeWielded(player, table);
    }

    getAttackFor(player) {
        return 3;
    }
}
Card.cards[id] = new _();
