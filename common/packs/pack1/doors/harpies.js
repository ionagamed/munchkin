import { Card } from '../../../Card';

const id = 'harpies';

class harpies extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
    }
    
    onEscape(player, dice, table) {
        if (dice >= 5) {
            return true;
        } else {
            player.level -= 2;
        }
    }
    
    getAttackFor(players) {
        var iswizard = false;
        players.map(x => {
            if(x.hasClassDisadvantages('wizard')) 
                iswizard = true;
        })
        if (iswizard) return 9;
        return 4;
    }
    
    get treasureCount() {
        return 2;
    }
}
Card.cards[id] = new harpies();