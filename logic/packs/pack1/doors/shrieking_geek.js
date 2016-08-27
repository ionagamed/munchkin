import { Card } from '../../../Card';
import { Monster } from '../helpers/Monster';

const id = 'shrieking_geek';

class shrieking_geek extends Monster {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
        this.treasure = 2;
    }
    
    badThing(player, table) {
        player.wielded.map (x => {
            if (Card.byId(x).type == 'class' || Card.byId(x).type == 'race')
                player.unwield(x, table);
        });
    }
    
    getAttackAgainst(players) {
        var isWarrior = false;
        players.map(x => {
            if(x.hasClassDisadvantages('warrior')) 
                isWarrior = true;
        });
        if (isWarrior) return 12;
        return 6;
    }
}
Card.cards[id] = new shrieking_geek();