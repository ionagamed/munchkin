import { Card } from '../../../Card';
import { Player } from '../../../Player';

const id = 'curse_change_race';

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
        var hasRa = false;
        player.wielded.map (x => {
           if (Card.byId(x).type == 'race') {
               player.unwield(x, table);
               hasRa = true;
           } 
        });
        if (hasRa) {
            for (let i of [].concat(discardedDoors).reverse()) {
                if (Card.byId(x).type == 'race')
                    wield(Card.byId(x), table);
                    break;
            }
        }
    }
}
Card.cards[id] = new _();