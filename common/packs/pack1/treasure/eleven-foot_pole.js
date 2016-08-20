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
        this.type = '2-handed';
        this.hands = 2;
        this.wieldable = true;
        this.price = 200;
    }

    getAttackFor(player) {
        return 1;
    }
}
Card.cards[id] = new _();
