/**
 * Created by ionagamed on 8/15/16.
 */

import { Card } from '../../../Card';
import { Class } from "../helpers/Class";

const id = 'wizard';

class Wizard extends Class {
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
}
Card.cards[id + '_1'] = new Wizard();
Card.cards[id + '_2'] = new Wizard();
Card.cards[id + '_3'] = new Wizard();
