import { Card } from '../../../Card';
import { Monster } from "../helpers/Monster";

const id = 'harpies';

class harpies extends Monster {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
        this.treasure = 2;
    }
    
    badThing(player, table) {
        player.decreaseLevel(2);
    }
    
    getAttackFor(players) {
        var isWizard = false;
        players.map(x => {
            if(x.hasClassDisadvantages('wizard')) 
                isWizard = true;
        });
        if (isWizard) return 9;
        return 4;
    }
}
Card.cards[id] = new harpies();