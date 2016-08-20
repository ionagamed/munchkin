import { Card } from '../../../Card';
import { Monster } from "../helpers/Monster";

const id = 'maul_rat';

class maul_rat extends Monster {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
        this.treasure = 1;
    }
    
    badThing(player, table) {
        player.decreaseLevel(1);
    }
    
    getAttackFor(players) {
        var isCleric = false;
        players.map(x => {
            if(x.hasClassDisadvantages('cleric')) 
                isCleric = true;
        });
        if (isCleric)
            return 4;
        return 1;
    }
}
Card.cards[id] = new maul_rat();