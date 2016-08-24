import { Card } from '../../../Card';
import { Monster } from '../helpers/Monster';

const id = 'undead_horse';

class undead_horse extends Monster {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
        this.undead = true;
        this.treasure = 4;
    }
    
    badThing(player, table) {
        player.decreaseLevel(2);
    }
    
    getAttackFor(players) {
        var isDwarf = false;
        players.map(x => {
            if(x.hasRaceDisadvantages('dwarf')) 
                isDwarf = true;
        });
        if (isDwarf) {
            return 9;
        } else {
            return 4;
        }
    }
}
Card.cards[id] = new undead_horse();