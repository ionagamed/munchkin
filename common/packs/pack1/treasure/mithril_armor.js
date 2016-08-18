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
        this.kind = 'treasure';
        this.type = 'armor';
        this.big = true;
        this.wieldable = true;
    }
    
    canBeWielded(player, table) {
        return !player.hasCardWielded('wizard') && table.fight == null;
    }
    
    getAttackFor(player) {
        return 3;
    }
}
Card.cards[id] = new MithrilArmor();
