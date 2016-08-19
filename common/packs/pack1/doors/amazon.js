import { Card } from '../../../Card';
 // is not done
 // is not done
 // is not done
 // is not done
 // is not done
const id = 'amazon';

class amazon extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
    }
    
    onEscape(player, dice, table) {
        if (player.sex == 'female') {
            return true;
            get treasureCount()
                return 1;
        }
        if (dice >= 5) 
            return true;
        
            
        }
        player.level -= 3;
    }
    getAttackFor(players) {
        return 8;
    }
    get treasureCount() {
    if (player.sex == 'female') {
            return 1;
        return 2;
    }
}
Card.cards[id] = new amazon();