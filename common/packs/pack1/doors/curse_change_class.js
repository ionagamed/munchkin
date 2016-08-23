import { Card } from '../../../Card';
import { Player } from '../../../Player';

const id = 'curse_change_class';

class curse_change_class extends Card {
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
        var hasCl = false;
        player.wielded.map (x => {
           if (Card.byId(x).type == 'class') {
               player.unwield(x, table);
               hasCl = true;
           } 
        });
        if (hasCl) {
            for (let i of [].concat(discardedDoors).reverse()) {
                if (Card.byId(x).type == 'class')
                    wield(Card.byId(x), table);
                    break;
            }
        }
    }
}
Card.cards[id] = new curse_change_class();