import { Card } from '../../../Card';
import { Monster } from '../helpers/Monster';

const id = 'squidzilla';

class squidzilla extends Monster {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
        this.level = 2;
        this.treasure = 4;
    }
    
    onEscape(player, dice, table) {
        if(!player.hasRaceDisadvantages('elf') && player.level <= 4)
            return true;
        return super.onEscape(player, dice, table);
    }
    
    badThing(player, table) {
<<<<<<< HEAD
        player.die();
=======
        player.die(table);
>>>>>>> 17531423901606a52d139a865516c0e228cf7e05
    }
    
    getAttackFor(players) {
        var isElf = false;
        players.map(x => {
            if(x.hasRaceDisadvantages('elf'))
                isElf = true;
        });
        if (isElf)
            return 22;
        return 18;
    }
}
Card.cards[id] = new squidzilla();
