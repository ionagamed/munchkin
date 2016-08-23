/**
 * Created by ionagamed on 8/18/16.
 */

import { Card } from '../../../Card';
import { Modifier } from '../helpers/Modifier';

const id = 'acid_potion';

class _ extends Modifier {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'treasure';
        this.type = 'modifier';
        this.castable = true;
        this.price = 200;
    }

    getModFor(x) {
        return 5;
    }
}
Card.cards[id] = new _();
