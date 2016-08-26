import { Card } from '../../../Card';
import { Monster } from '../helpers/Monster';

const id = 'flying_frogs';

class flying_frogs extends Monster {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
        this.treasure = 1;
    }
    
    onEscape(player, dice, table) {
        return super.onEscape(player, dice - 1, table);
    }
    badThing(player, table) {
        player.decreaseLevel(2);
    }
    getAttackAgainst(players) {
        return 2;
    }
}
Card.cards[id] = new flying_frogs();
