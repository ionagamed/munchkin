import { Card } from '../../../Card';

const id = 'bullrog';

class bullrog extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
    }
    
    onEscape(player, dice, table) {
        if (player.level <= 4)
            return true;
        if (dice >= 5) {
            return true;
        } else {
            
        }
    }
    // TODO: level += 2, death
    getAttackFor(players) {   
        return 18;
    }
    
    get treasureCount() {
        return 5;
    }
}
Card.cards[id] = new bullrog();