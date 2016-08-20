import { Card } from '../../../Card';
import { Monster } from "../helpers/Monster";

const id = 'lame_goblin';

class lame_goblin extends Monster {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
        this.treasure = 1;
    }
    
    onEscape(player, dice, table) {
        return super.onEscape(player, dice + 1, table);
    }
    badThing(player, table) {
        player.decreaseLevel(1);
    }
    getAttackFor(players) {
        return 1;
    }
}
Card.cards[id] = new lame_goblin();