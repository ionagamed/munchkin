/**
 * Created by ionagamed on 8/20/16.
 */

import { Card } from '../../../Card';
import { Item } from '../helpers/Item';

const id = 'q-dice';

class _ extends Item {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'treasure';
        this.type = 'item';
        this.price = 1000;
    }
}
Card.cards[id] = new _();
