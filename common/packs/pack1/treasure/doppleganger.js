/**
 * Created by ionagamed on 8/18/16.
 */

import { Card } from '../../../Card';
import { Player } from '../../../Player';

const id = 'doppleganger';

class Doppleganger extends Card {
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
        return table.fight != null;
    }

    onCast(source, dest, table) {
        if (dest instanceof Player) {
            table.fight.players.map(x => {
                if (x.player.name == dest.name) {
                    x.modifiers.push(this.id);
                }
            });
        } else {
            table.fight.monsters.map(x => {
                if (x.monster == dest) {
                    x.modifiers.push(this.id);
                }
            });
        }
    }

    getModFor(arg) {
        if (arg instanceof Player) {
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
