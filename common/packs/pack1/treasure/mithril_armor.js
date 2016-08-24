/**
 * Created by ionagamed on 8/14/16.
 */

import { Card } from '../../../Card';
import { Item } from '../helpers/Item';

const id = 'mithril_armor';

class _ extends Item {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'treasure';
        this.type = 'armor';
        this.big = true;
        this.wieldable = true;
        this.price = 600;
    }
    
    canBeHeld(player, table) {
        return !player.hasClassDisadvantages('wizard') && super.canBeHeld(player, table);
    }
    
    canBeWielded(player, table) {
        return !player.hasClassDisadvantages('wizard') && super.canBeWielded(player, table);
    }
    
    getAttackFor(player) {
        return 3;
    }
}
Card.cards[id] = new _();
