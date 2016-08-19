/**
 * Created by ionagamed on 8/18/16.
 */

import { Card } from '../../../Card';
import { Player } from '../../../Player';
import { Modifier } from '../helpers/Modifier';

const id = 'doppleganger';

class Doppleganger extends Modifier {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'treasure';
        this.type = 'modifier';
        this.castable = true;
        this.price = 300;
    }

    getModFor(arg) {
        if (arg instanceof Player) {
            /**
             * HACK: warrior
             */
            return arg.wielded
                .filter(x => x.type != 'class')
                .filter(x => Card.byId(x).getAttackFor)
                .map(x => Card.byId(x).getAttackFor(arg))
                .reduce((acc, v) => acc + v);
        } else {
            return Card.byId(arg).getAttack();
        }
    }
}
Card.cards[id] = new Doppleganger();
