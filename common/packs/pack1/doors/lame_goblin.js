import { Card } from '../../../Card';

const id = 'lame_goblin';

class lame_goblin extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
    }
    
    onEscape(player, dice, table) {
        if (dice >= 4) 
            return true;
        player.level--;
    }
    getAttackFor(players) {
        return 1;
    }
    get treasureCount() {
        return 1;
    }
}
Card.cards[id] = new lame_goblin();