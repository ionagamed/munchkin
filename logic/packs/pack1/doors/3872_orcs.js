import { Card } from '../../../Card';
import dice from '../../../dice';
import { Monster } from '../helpers/Monster';

const id = '3872_orcs';

class a3872_orcs extends Monster {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
        this.treasure = 3;
    }
    
    badThing(player, table) {
        var d = dice();
        if (d <= 2) {
            player.die(table);
        } else {
            player.decreaseLevel(d);
        }
    }
    
    getAttackAgainst(players) {
        var isDwarf = false;
        players.map(x => {
            if(x.hasRaceDisadvantages('dwarf')) 
                isDwarf = true;
        });
        if (isDwarf)
            return 16;
        return 10;
    }
}
Card.cards[id] = new a3872_orcs();