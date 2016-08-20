import { Card } from '../../../Card';

const id = 'plutonium_dragon';

class plutonium_dragon extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
        this.level = 2;
    }
    
    onEscape(player, dice, table) {
        player.level--;
        if (dice >= 5)
            return true;
        player.die(table);
    }
    
    getAttackFor(players) {
        return 20;
    }
    get treasureCount() {
        return 5;
    }
}
Card.cards[id] = new plutonium_dragon();