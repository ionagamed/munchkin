/**
 * Created by ionagamed on 8/19/16.
 */

import { Card } from '../../../Card';
import { Player } from '../../../Player';

const id = '1000_gold';

class _ extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'treasure';
        this.type = 'level';
        this.castable = true;
    }

    canBeCast(source, dest, table) {
        return (dest instanceof Player) && dest.level < 9;
    }

    onCast(source, dest, table) {
        dest.level++;
    }
}
/*
 Note: all simple levelups are here
 */
Card.cards[id] = new _();
Card.cards['boil_an_anthill'] = new _();
Card.cards['bribe_gm_with_food'] = new _();
Card.cards['convenient_addition_error'] = new _();
Card.cards['invoke_obscure_rules'] = new _();
Card.cards['potion_of_general_studliness'] = new _();
Card.cards['go_up_a_level'] = new _();
