import { Card } from '../../../Card';
import { Monster } from '../helpers/Monster';

const id = 'crabs';

class crabs extends Monster {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
        this.treasure = 1;
    }
    
    onEscape(player, dice, table) {
        player.wielded.map(x => {
            if (Card.byId(x).type == 'footgear' || Card.byId(x).type == 'armor' || Card.byId(x).type == 'knees')
                player.unwield(x, table);
        });
    }
    getAttackAgainst(players) {
        return 1;
    }
}
Card.cards[id] = new crabs();