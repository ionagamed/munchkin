import { Card } from '../../../Card'
import { Monster } from '../helpers/Monster';

const id = 'bigfoot';

class bigfoot extends Monster {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
        this.treasure = 3;
    }
    
    badThing(player, table) {
        player.wielded.map(x => {
            if (Card.byId(x).type == 'headgear')
                player.unwield(x, table);
        });
    }
    
    getAttackFor(players) {
        var level = 12;
        players.map(x => {
            if (x.hasRaceDisadvantages('halfling') || x.hasRaceDisadvantages('dwarf'))
                level = 15;
        });
        return level;
    }
}
Card.cards[id] = new bigfoot();