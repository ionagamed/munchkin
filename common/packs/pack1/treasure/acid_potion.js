/**
 * Created by ionagamed on 8/18/16.
 */

import { Card } from '../../../Card';
import { Modifier } from '../helpers/Modifier';

const id = 'acid_potion';

class AcidPotion extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'treasure';
        this.type = 'modifier';
        this.castable = true;
        this.price = 200;
    }
    
    canBeCast(source, dest, table) {
        return Modifier.canBeCast(source, dest, table);
    }

    onCast(source, dest, table) {
        return Modifier.onCast(player, dest, table, this);
    }

    getModFor(x) {
        return 5;
    }
}
Card.cards[id] = new AcidPotion();
