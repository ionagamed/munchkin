/**
 * Created by ionagamed on 8/14/16.
 */

import { Card } from '../../../Card';

const id = 'mithril_armor';

class MithrilArmor extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.type = 'treasure';
        this.big = true;
        this.wieldable = true;
    }
}
Card.cards[id] = new MithrilArmor();
