/**
 * Created by ionagamed on 8/19/16.
 */

import { Card } from '../../../Card';
import { Item } from '../helpers/Item';

const id = 'really_impressive_title';

class _ extends Item {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'treasure';
        this.type = 'title';
        this.wieldable = true;
        this.price = -1;
    }

    getAttackFor(player) {
        return 3;
    }
}
Card.cards[id] = new _();
