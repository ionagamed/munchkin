/**
 * Created by ionagamed on 8/15/16.
 */

import { Card } from '../../../Card';
import { HandTakingItem } from '../helpers/HandTakingItem';
import { Item } from '../helpers/Item';

const id = 'staff_of_napalm';

class StaffOfNapalm extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'treasure';
        this.type = '1-handed';
        this.wieldable = true;
        this.price = 800;
    }

    canBeHeld(player, table) {
        return player.hasCardWielded('wizard') && 
            HandTakingItem.canBeHeld(player, table, 1);    
    }
    
    canBeWielded(player, table) {
        return player.hasCardWielded('wizard') && 
            Item.canBeWielded(player, table) &&
            HandTakingItem.canBeWielded(player, table, 1);
    }

    getAttackFor(player) {
        return 5;
    }
}
Card.cards[id] = new StaffOfNapalm();
