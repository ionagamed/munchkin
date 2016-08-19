face_sucker
import { Card } from '../../../Card';

const id = 'drooling_slime';

class drooling_slime extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
    }
    
    onEscape(player, dice, table) {
        if (dice >= 5) 
            return true;
        var hadfootgear = true;
        player.wielded.map(x => {
            if (Card.byId(x).type == 'footgear') {
                unwield(x, table);
                hadfootgear = false;
            }
        });
        if (hadfootgear)
            player.level--;
    }
    getAttackFor(players) {
        var iself = false;
        players.map(x => {
            if(x.hasRaceDisadvantages('elf')) 
                iself = true;
        })
        if (iself)
            return 5;
        return 1;
    }
    get treasureCount() {
        return 1;
    }
}
Card.cards[id] = new drooling_slime();