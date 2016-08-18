    /**
 * Created by ionagamed on 8/13/16.
 */

import { Card } from '../../../Card';

const id = 'ghoulfiends';

class ghoulfiends extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
    }
    
    onEscape(player, dice, table) {
        if (dice >= 5) {
            return true;
        } else {
            /*
             TODO: do not use item
             */
            var m = 50;
            table.players.map(x => {
                if (x.level < m) 
                    m = x.level;
            });
            if(m != 50)
                player.level = m;
        }
    }
    
    getAttackFor(players) {
        return 8;
    }
    
    get treasureCount() {
        return 2;
    }
}
Card.cards[id] = new ghoulfiends();