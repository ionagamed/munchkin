import { Card } from '../../../Card';
import { Monster } from "../helpers/Monster";

const id = 'amazon';

class amazon extends Monster {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
        this.treasure = 2;
    }

    onFightBegan(fight, table) {
        // TODO: handle new females
        if (fight.players.filter(x => x.player.sex == 'female').length > 0) {
            // TODO: give 1 treasure
            fight.onEnded(table);
        }
    }
    
    badThing(player, table) {
        var hadClass = false;
        player.wielded.map(x => {
            if (Card.byId(x).type == 'class') {
                hadClass = true;
                player.unwield(x, table);
            }
        });
        if (!hadClass) {
            player.decreaseLevel(3);
        }
    }
    
    getAttackFor(players) {
        return 8;
    }
}
Card.cards[id] = new amazon();