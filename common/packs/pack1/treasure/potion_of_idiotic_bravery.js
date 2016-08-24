/**
 * Created by ionagamed on 8/19/16.
 */

import { Card } from '../../../Card';
import { Modifier } from '../helpers/Modifier';

const id = 'potion_of_idiotic_bravery';

class _ extends Modifier {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'treasure';
        this.type = 'modifier';
        this.castable = true;
        this.price = 100;
    }

    getModFor(x) {
        return 2;
    }
}
Card.cards[id] = new _();
