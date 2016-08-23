/**
 * Created by ionagamed on 8/19/16.
 */

import { Card } from '../../../Card';
import { Item } from '../helpers/Item';

const id = 'buckler_of_swashing';

class _ extends Item {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'treasure';
        this.type = '1-handed';
        this.hands = 1;
        this.wieldable = true;
        this.price = 400;
    }

    getAttackFor(player) {
        return 2;
    }
}
Card.cards[id] = new _();
