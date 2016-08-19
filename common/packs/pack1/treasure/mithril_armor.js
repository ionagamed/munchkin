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
        this.price = 600;
    }
    
    canBeHeld(player, table) {
        return !player.hasCardWielded('wizard') && 
            player.wielded.filter(x => Card.byId(x).type == 'armor').length == 1;
    }
    
    canBeWielded(player, table) {
        return !player.hasCardWielded('wizard') && 
            player.wielded.filter(x => Card.byId(x).type == 'armor').length == 0 &&
            table.fight == null;
    }
    
    getAttackFor(player) {
        return 3;
    }
}
Card.cards[id] = new MithrilArmor();
