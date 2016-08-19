/**
 * Created by ionagamed on 8/14/16.
 */

import { Card } from '../../../Card';
import { BigItem } from "../helpers/BigItem";
import { Armor } from "../helpers/Armor";
import { Item } from "../helpers/Item";

const id = 'mithril_armor';

class MithrilArmor extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'treasure';
        this.type = 'armor';
        this.big = true;
        this.wieldable = true;
        this.price = 600;
    }
    
    canBeHeld(player, table) {
        return !player.hasCardWielded('wizard') && 
            BigItem.canBeHeld(player, table) &&
            Armor.canBeHeld(player, table);    
    }
    
    canBeWielded(player, table) {
        return !player.hasCardWielded('wizard') && 
            Item.canBeWielded(player, table) &&    
            BigItem.canBeWielded(player, table) &&
            Armor.canBeWielded(player, table);    
    }
    
    getAttackFor(player) {
        return 3;
    }
}
Card.cards[id] = new MithrilArmor();
