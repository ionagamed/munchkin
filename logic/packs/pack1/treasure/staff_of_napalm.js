/**
 * Created by ionagamed on 8/15/16.
 */

import { Card } from '../../../Card';
import { Item } from '../helpers/Item';

const id = 'staff_of_napalm';

class _ extends Item {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'treasure';
        this.type = '1-handed';
        this.hands = 1;
        this.wieldable = true;
        this.price = 800;
    }

    canBeHeld(player, table) {
        return player.hasRaceAdvantages('wizard') && super.canBeHeld(player, table);
    }
    
    canBeWielded(player, table) {
        return player.hasRaceAdvantages('wizard') && super.canBeWielded(player, table);
    }

    getAttackFor(player) {
        return 5;
    }
}
Card.cards[id] = new _();
