/**
 * Created by ionagamed on 8/23/16.
 */

import { Card } from '../../../Card';
import { MonsterModifier } from '../helpers/MonsterModifier';

const id = 'enraged';

class _ extends MonsterModifier {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster_modifier';
        this.castable = true;
    }

    getModFor(x) {
        return 5;
    }

    getTreasureFor(x) {
        return 1;
    }
}
Card.cards[id] = new _();
