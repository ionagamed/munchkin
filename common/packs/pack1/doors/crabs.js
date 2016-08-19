import { Card } from '../../../Card';

const id = 'crabs';

class crabs extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
    }
    
    onEscape(player, dice, table) {
        player.wielded.map(x => {
            if (Card.byId(x).type == 'footgear' || Card.byId(x).type == 'armor' || Card.byId(x).type == 'knees')
                unwield(x, table);
        });
    }
    getAttackFor(players) {
        return 1;
    }
    get treasureCount() {
        return 1;
    }
}
Card.cards[id] = new crabs();