/**
 * Created by ionagamed on 8/19/16.
 */

import { Card } from '../../../Card';    
    
export class Item extends Card {
    constructor() {
        super();
    }
    
    __big_canBeWielded(player, table) {
        return player.wielded.filter(x => Card.byId(x).big).length == 0 ||
            player.hasRaceAdvantages('dwarf');    
    }
    __hands_canBeWielded(player, table, hands) {
        return player.getBusyHandCount() <= 2 - hands;
    }
    __armor_canBeWielded(player, table) {
        return player.cardsOfTypeWielded('armor') == 0;
    }
    __headgear_canBeWielded(player, table) {
        return player.cardsOfTypeWielded('headgear') == 0;
    }
    __footgear_canBeWielded(player, table) {
        return player.cardsOfTypeWielded('footgear') == 0;
    }
    canBeWielded(player, table) {
        return super.canBeWielded(player, table) &&
            table.fight == null &&
            (this.big ? this.__big_canBeWielded(player, table) : true) &&
            (this.hands ? this.__hands_canBeWielded(player, table, this.hands) : true) &&
            (this.type == 'armor' ? this.__armor_canBeWielded(player, table) : true) &&
            (this.type == 'headgear' ? this.__headgear_canBeWielded(player, table) : true) &&
            (this.type == 'footgear' ? this.__footgear_canBeWielded(player, table) : true);
    }
    
    __big_canBeHeld(player, table) {
        return player.wielded.filter(x => Card.byId(x).big).length == 1 ||
            player.hasRaceAdvantages('dwarf');
    }
    __hands_canBeHeld(player, table, hands) {
        return player.getBusyHandCount() <= 2;
    }
    __armor_canBeHeld(player, table) {
        return player.cardsOfTypeWielded('armor') <= 1;
    }
    __headgear_canBeHeld(player, table) {
        return player.cardsOfTypeWielded('headgear') <= 1;
    }
    __footgear_canBeHeld(player, table) {
        return player.cardsOfTypeWielded('footgear') <= 1;
    }
    canBeHeld(player, table) {
        return super.canBeHeld(player, table) &&
            (this.big ? this.__big_canBeHeld(player, table) : true) &&
            (this.hands ? this.__hands_canBeHeld(player, table, this.hands) : true) &&
            (this.type == 'armor' ? this.__armor_canBeHeld(player, table) : true) &&
            (this.type == 'headgear' ? this.__headgear_canBeHeld(player, table) : true) &&
            (this.type == 'footgear' ? this.__footgear_canBeHeld(player, table) : true);
    }
}
