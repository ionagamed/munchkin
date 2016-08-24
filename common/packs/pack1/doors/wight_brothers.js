import { Card } from '../../../Card';
import { Monster } from "../helpers/Monster";

const id = 'wight_brothers';

class flying_frogs extends Monster {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
        this.undead = true;
        this.levels = 2;
        this.treasure = 4;
    }
    
    onEscape(player, dice, table) {
        if(player.level <= 3)
            return true;
        player.decreaseLevel(2);
        return super.onEscape(player, dice, table);
    }
    
    badThing(player, table) { 
        player.level = 1;
    }

    getAttackFor(players) {
        return 16;
    }
}
Card.cards[id] = new flying_frogs();