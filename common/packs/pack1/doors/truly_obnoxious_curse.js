
import { Card } from '../../../Card';
import { Player } from '../../../Player';
import { Curse } from '../helpers/Curse';

const id = 'truly_obnoxious_curse';

class _ extends Curse {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'curse';
        this.castable = true;
    }
    onCast(source, dest, table) {
        var m = '', max = 0;
        dest.wielded.map(x => {
            if (Card.byId(x).type == 'modifier') {
                const atk = Card.byId(x).getAttackFor(dest);
                if (atk > max) {
                    max = atk;
                    m = x;
                }
            }
        });
        dest.unwield(m, table);
    }
}
Card.cards[id] = new _();