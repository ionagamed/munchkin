import { Card } from '../../../Card';
import { Monster } from '../helpers/Monster';

const id = 'mr_bones';

class mr_bones extends Monster {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
        this.undead = true;
        this.treasure = 1;
    }
    
    onEscape(player, dice, table) {
        player.decreaseLevel(1);
        return super.onEscape(player, dice, table);
    }
    
    badThing(player, table) {
        player.decreaseLevel(2);
    }
    
    getAttackFor(players) {
        return 2;
    }
}
Card.cards[id] = new mr_bones();
