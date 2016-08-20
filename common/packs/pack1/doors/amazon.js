import { Card } from '../../../Card';
 // is not done
 // is not done
 // is not done
 // is not done
 // is not done
const id = 'amazon';

class amazon extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
    }
    
    onEscape(player, dice, table) {
        if (player.sex == 'female') {
            return true;
        }
        if (dice >= 5) 
            return true;
        var hasCl = false;
        player.wielded.map (x => {
           if (Card.byId(x).type == 'class') {
               player.unwield(x, table);
               hasCl = true;
           } 
        });
        if (!hasCl)
            player.level -= 3;
    }
    getAttackFor(players) {
        return 8;
    }
    get treasureCount() {
    if (player.sex == 'female') {
            return 1;
        return 2;
    }
}
Card.cards[id] = new amazon();