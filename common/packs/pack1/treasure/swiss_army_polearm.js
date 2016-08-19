/**
 * Created by ionagamed on 8/19/16.
 */

import { Card } from '../../../Card';
import { Item } from '../helpers/Item';

const id = 'swiss_army_polearm';

class SwissArmyPolearm extends Item {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'treasure';
        this.type = '2-handed';
        this.hands = 2;
        this.big = true;
        this.wieldable = true;
        this.price = 600;
    }

    canBeHeld(player, table) {
        return player.hasRaceAdvantages('human') && super.canBeHeld(player, table);
    }

    canBeWielded(player, table) {
        return player.hasRaceAdvantages('human') && super.canBeWielded(player, table);
    }

    getAttackFor(player) {
        return 4;
    }
}
Card.cards[id] = new SwissArmyPolearm();
