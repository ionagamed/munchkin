/**
 * Created by ionagamed on 8/19/16.
 */

import { Card } from '../../../Card';
import { BigItem } from '../helpers/BigItem';
import { Item } from '../helpers/Item';

const id = 'stepladder';

class Stepladder extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'treasure';
        this.type = 'item';
        this.big = true;
        this.wieldable = true;
        this.price = 400;
    }

    canBeHeld(player, table) {
        return player.hasCardWielded('halfling') &&
            BigItem.canBeHeld(player, table);    
    }

    canBeWielded(player, table) {
        return !player.hasCardWielded('wizard') &&
            Item.canBeWielded(player, table) &&
            BigItem.canBeWielded(player, table);    
    }

    getAttackFor(player) {
        return 3;
    }
}
Card.cards[id] = new Stepladder();
