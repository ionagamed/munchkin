import { Card } from '../../../Card';

const id = 'squidzilla';

class squidzilla extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
    }
    
    onEscape(player, dice, table) {
        
    }
    
    getAttackFor(players) {
        var iself = false;
        players.map(x => {
            if(x.hasRaceDisadvantages('elf')) 
                iself = true;
        })
        if (iself)
            return 22;
        return 18;
    }
    // TODO: level += 2, death
    get treasureCount() {
        return 4;
    }
}
Card.cards[id] = new squidzilla();