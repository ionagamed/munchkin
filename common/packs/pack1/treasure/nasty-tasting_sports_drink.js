/**
 * Created by ionagamed on 8/19/16.
 */

import { Card } from '../../../Card';
import { Modifier } from '../helpers/Modifier';

const id = 'nasty-tasting_sports_drink';

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
        return 2;
    }
}
Card.cards[id] = new _();
