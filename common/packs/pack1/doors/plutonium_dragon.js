import { Card } from '../../../Card';
import { Monster } from '../helpers/Monster';

const id = 'plutonium_dragon';

class plutonium_dragon extends Monster {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
        this.levels = 2;
        this.treasure = 5;
    }
    
    onEscape(player, dice, table) {
        if (player.level <= 5) {
            return true;
        }
        return super.onEscape(player, dice, table);
    }

    badThing(player, table) {
        player.die();
    }
    
    getAttackFor(players) {
        return 20;
    }
}
Card.cards[id] = new plutonium_dragon();
