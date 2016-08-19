import { Card } from '../../../Card';

const id = 'flying_frogs';

class flying_frogs extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
    }
    
    onEscape(player, dice, table) {
        if (dice >= 6) 
            return true;
        player.level -= 2;
    }
    getAttackFor(players) {
        return 2;
    }
    get treasureCount() {
        return 1;
    }
}
Card.cards[id] = new flying_frogs();