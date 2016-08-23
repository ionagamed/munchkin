
import { Card } from '../../../Card';
import { Player } from '../../../Player';

const id = 'truly_obnoxious_curse';

class _ extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'curse';
        this.castable = true;
    }
    canBeCast(source, dest, table) {
        return dest instanceof Player;
    }
    onCast(source, dest, table) {
        var m = 0, max = 0;
        dest.wielded.map (x => {
            if (Card.byId(x).type == 'modifier') {
                if (Card.byId(x).getAttackFor(player) > max) {
                    max = getAttackFor(player);
                    m = x;
                }
            }
        });
        dest.unwield(m, table);
    }
}
Card.cards[id] = new _();