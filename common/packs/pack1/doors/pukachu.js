import { Card } from '../../../Card';

const id = 'pukachu';

class pukachu extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
    }
    
    onEscape(player, dice, table) {
        if (dise >= 5)
            return true;
        player.hand.map(x => {
           unwield(x, table) 
        });
    }
    
    getAttackFor(players) {
        return 6;
    }
    get treasureCount() {
        return 2;
    }
}
Card.cards[id] = new pukachu();