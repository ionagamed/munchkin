/**
 * Created by ionagamed on 8/19/16.
 */

import { Card } from '../../../Card';
import { Item } from '../helpers/Item';

const id = 'bow_with_ribbons';

class _ extends Item {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'treasure';
        this.type = '2-handed';
        this.hands = 2;
        this.wieldable = true;
        this.price = 800;
    }

    canBeHeld(player, table) {
        return player.hasRaceAdvantages('elf') && super.canBeHeld(player, table);
    }

    canBeWielded(player, table) {
        return player.hasRaceAdvantages('elf') && super.canBeWielded(player, table);
    }

    getAttackFor(player) {
        return 4;
    }
}
Card.cards[id] = new _();
