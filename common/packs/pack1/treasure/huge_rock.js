/**
 * Created by ionagamed on 8/18/16.
 */

import { Card } from '../../../Card';

const id = 'huge_rock';

class HugeRock extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'treasure';
        this.type = '2-handed';
        this.big = true;
        this.wieldable = true;
        this.price = 0;
    }

    canBeHeld(player, table) {
        return player.wielded.filter(x => Card.byId(x).big).length == 1 &&
            player.getBusyHandCount() <= 2;
    }

    canBeWielded(player, table) {
        return !player.hasCardWielded('wizard') &&
            player.wielded.filter(x => x.type == 'armor').length == 0 &&
            player.getBusyHandCount() <= 0 &&    
            table.fight == null;
    }

    getAttackFor(player) {
        return 3;
    }
}
Card.cards[id] = new HugeRock();
