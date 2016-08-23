import { Card } from '../../../Card';
import { Monster } from "../helpers/Monster";

const id = 'squidzilla';

class squidzilla extends Monster {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
        this.treasure = 4;
        this.levels = 2;
    }
    
    onEscape(player, dice, table) {
        if (player.level < 4 && !player.hasRaceDisadvantages('elf')) {
            return true;
        }
        return super.onEscape(player, dice, table);
    }
    
    badThing(player, table) {
        player.die();
    }
    
    getAttackFor(players) {
        var isElf = false;
        players.map(x => {
<<<<<<< HEAD
            if(x.hasRaceDisadvantages('elf'))
                isElf = true;
        });
        if (isElf)
=======
            if(x.hasRaceDisadvantages('elf')) 
                iself = true;
        });
        if (iself)
>>>>>>> origin/tsmish
            return 22;
        return 18;
    }
}
Card.cards[id] = new squidzilla();
