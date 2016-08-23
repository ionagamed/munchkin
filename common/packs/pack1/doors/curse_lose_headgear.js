import { Card } from '../../../Card';
import { Curse } from '../helpers/Curse';

const id = 'curse_lose_headgear';

class CurseLoseHeadgear extends Curse {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'curse';
        this.castable = true;
    }
    onCast(source, dest, table) {
        for (let i of dest.wielded) {
            if (Card.byId(i).type == 'headgear') {
                dest.unwield(i);
                table.discard(i);
            }
        }
    }
}
Card.cards[id] = new CurseLoseHeadgear();
