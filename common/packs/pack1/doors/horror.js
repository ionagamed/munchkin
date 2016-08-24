import { Card } from '../../../Card';
import { Monster } from '../helpers/Monster';

const id = 'horror';

class horror extends Monster {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
        this.treasure = 4;
    }
    
    badThing(player, table) {
        if (player.hasClassAdvantages('wizard')) {
            player.wielded.map(x => {
                if (Card.byId(x).id == 'wizard') {
                    player.unwield(x, table);
                }
            });
        } else {
            player.die(table);
        }
    }
    
    getAttackFor(players) {
        var isWarrior = false;
        players.map(x => {
            if(x.hasRaceDisadvantages('warrior')) 
                isWarrior = true;
        });
        if (isWarrior)
            return 18;
        return 14;
    }
}
Card.cards[id] = new horror();