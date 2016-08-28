/**
 * Created by ionagamed on 8/18/16.
 */

import { Card } from '../../../Card';
import { Player } from '../../../Player';
import { Modifier } from '../helpers/Modifier';

const id = 'doppleganger';

class _ extends Modifier {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'treasure';
        this.type = 'modifier';
        this.castable = true;
        this.price = 300;
    }
    
    canBeCast(source, dest, table) {
        return dest instanceof Player && table.fight && table.fight.players.length <= 1 && source instanceof Player && source.name == dest.name;
    }

    getModFor(arg) {
        /**
         * HACK: warrior
         */
        return arg.player.level + arg.player.wielded
            .filter(x => x.type != 'class')
            .filter(x => Card.byId(x).getAttackFor)
            .map(x => Card.byId(x).getAttackFor(arg.player))
            .reduce((acc, v) => acc + v, 0) +
            arg.modifiers
                .filter(x => x != 'doppleganger')
                .map(x => Card.byId(x).getModFor(arg))
                .reduce((acc, v) => acc + v, 0);
    }
}
Card.cards[id] = new _();
