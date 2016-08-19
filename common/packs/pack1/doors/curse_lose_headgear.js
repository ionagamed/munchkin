import { Card } from '../../../Card';
import { Player } from '../../../Player';

const id = 'curse_lose_headgear';

class CurseLoseHeadgear extends Card {
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
        for (let i of dest.wielded) {
            if (Card.byId(i).type == 'headgear') {
                dest.unwield(i);
                table.dispose(i);
            }
        }
    }
}
Card.cards[id] = new CurseLoseHeadgear();