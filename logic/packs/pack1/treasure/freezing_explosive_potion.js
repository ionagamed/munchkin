/**
 * Created by ionagamed on 8/19/16.
 */

import { Card } from '../../../Card';
import { Modifier } from '../helpers/Modifier';

const id = 'freezing_explosive_potion';

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
        return 3;
    }
}
Card.cards[id] = new _();

