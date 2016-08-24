import { Card } from '../../../Card';
import { Curse } from '../helpers/Curse';

const id = 'curse_change_race';

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
        var hasRa = false;
        dest.wielded.map(x => {
            if (Card.byId(x).type == 'race') {
                dest.unwield(x, table);
                hasRa = true;
            } 
        });
        if (hasRa) {
            for (let i of [].concat(table.discardedDoors).reverse()) {
                if (Card.byId(i).type == 'race') {
                    dest.wield(i, table);
                    break;
                }
            }
        }
    }
}
Card.cards[id] = new _();