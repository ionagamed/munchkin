import { Card } from '../../../Card';
import { Monster } from "../helpers/Monster";

const id = 'drooling_slime';

class drooling_slime extends Monster {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
        this.treasure = 1;
    }
    
    badThing(player, table) {
        var hadFootgear = false;
        player.wielded.map(x => {
            if (Card.byId(x).type == 'footgear') {
                player.unwield(x, table);
                hadFootgear = true;
            }
        });
        if (!hadFootgear)
            player.decreaseLevel(1);
    }
    getAttackFor(players) {
        var isElf = false;
        players.map(x => {
            if(x.hasRaceDisadvantages('elf')) 
                isElf = true;
        });
        if (isElf)
            return 5;
        return 1;
    }
}
Card.cards[id] = new drooling_slime();