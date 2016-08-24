/**
 * Created by ionagamed on 8/20/16.
 */

import { Card } from '../../../Card';
import { Item } from '../helpers/Item';

const id = 'sandals_of_protection';

class _ extends Item {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'treasure';
        this.type = 'footgear';
        this.wieldable = true;
        this.price = 700;
    }
}
Card.cards[id] = new _();
