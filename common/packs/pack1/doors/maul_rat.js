import { Card } from '../../../Card';

const id = 'maul_rat';

class maul_rat extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
    }
    
    onEscape(player, dice, table) {
        if (dice >= 5)
            return true;
        player.level -= 1;
    }
    
    getAttackFor(players) {
        var iscleric = false;
        players.map(x => {
            if(x.hasClassDisadvantages('cleric')) 
                iscleric = true;
        })
        if (iscleric)
            return 4;
        return 1;
    }
    get treasureCount() {
        return 1;
    }
}
Card.cards[id] = new maul_rat();