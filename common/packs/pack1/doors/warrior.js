/**
 * Created by ionagamed on 8/18/16.
 */

import { Card } from '../../../Card';

const id = 'warrior';

class Warrior extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'class';
        this.wieldable = true;
    }

    canBeWielded(player, table) {
        if (player.hasCardWielded('super_munchkin')) {
            return player.cardsOfTypeWielded('class') < 2;
        } else {
            return player.cardsOfTypeWielded('class') < 1;
        }
    }

    canBeHeld(player, table) {
        if (player.hasCardWielded('super_munchkin')) {
            return player.cardsOfTypeWielded('class') <= 2;
        } else {
            return player.cardsOfTypeWielded('class') <= 1;
        }
    }
    
    getAttackFor(player) {
        return 1;
    }
}
Card.cards[id + '_1'] = new Warrior();
Card.cards[id + '_2'] = new Warrior();
Card.cards[id + '_3'] = new Warrior();
