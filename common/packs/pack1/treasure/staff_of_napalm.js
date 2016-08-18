/**
 * Created by ionagamed on 8/15/16.
 */

import { Card } from '../../../Card';

const id = 'staff_of_napalm';

class StaffOfNapalm extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'treasure';
        this.type = '1-handed';
        this.wieldable = true;
    }

    canBeWielded(player, table) {
        return player.hasCardWielded('wizard') && table.fight == null;
    }

    getAttackFor(player) {
        return 5;
    }
}
Card.cards[id] = new StaffOfNapalm();
