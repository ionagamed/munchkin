/**
 * Created by ionagamed on 8/18/16.
 */

import { Card } from '../../../Card';
import { Item } from '../helpers/Item';

const id = 'huge_rock';

class _ extends Item {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'treasure';
        this.type = '2-handed';
        this.hands = 2;
        this.big = true;
        this.wieldable = true;
        this.price = 0;
    }

    getAttackFor(player) {
        return 3;
    }
}
Card.cards[id] = new _();
