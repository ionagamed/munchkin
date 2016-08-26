import { Card } from '../../../Card';
import { Curse } from '../helpers/Curse';

const id = 'curse_change_class';

class curse_change_class extends Curse {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'curse';
        this.castable = true;
    }
    onCast(source, dest, table) {
        var hasCl = false;
        var buf = [];
        dest.wielded.map(x => {
            if (Card.byId(x).type == 'class') {
                buf.push(x);
                dest.unwield(x, table);
                hasCl = true;
            } 
        });
        if (hasCl) {
            for (let i of [].concat(table.discardedDoors).reverse()) {
                if (Card.byId(i).type == 'class' && buf.indexOf(i) < 0) {
                    dest.wield(i, table);
                    break;
                }
            }
        }
        return true;
    }
}
Card.cards[id] = new curse_change_class();