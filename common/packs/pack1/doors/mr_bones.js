import { Card } from '../../../Card';

const id = 'mr_bones';

class mr_bones extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
    }
    
    onEscape(player, dice, table) {
        player.level--;
        if (dice >= 5)
            return true;
        player.level--;
    }
    
    getAttackFor(players) {
        return 2;
    }
    get treasureCount() {
        return 1;
    }
}
Card.cards[id] = new mr_bones();