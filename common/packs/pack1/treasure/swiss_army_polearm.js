/**
 * Created by ionagamed on 8/19/16.
 */

import { Card } from '../../../Card';
import { BigItem } from '../helpers/BigItem';
import { HandTakingItem } from '../helpers/HandTakingItem';
import { Item } from '../helpers/Item';

const id = 'swiss_army_polearm';

class SwissArmyPolearm extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'treasure';
        this.type = '2-handed';
        this.big = true;
        this.wieldable = true;
        this.price = 600;
    }

    canBeHeld(player, table) {
        return player.hasRaceAdvantages('human') &&
            BigItem.canBeHeld(player, table) &&
            HandTakingItem.canBeHeld(player, table, 2);
    }

    canBeWielded(player, table) {
        return player.hasRaceAdvantages('human') &&
            Item.canBeWielded(player, table) &&
            BigItem.canBeWielded(player, table) &&
            HandTakingItem.canBeWielded(player, table, 2);
    }

    getAttackFor(player) {
        return 4;
    }
}
Card.cards[id] = new SwissArmyPolearm();
