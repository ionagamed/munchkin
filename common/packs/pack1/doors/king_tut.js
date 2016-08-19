import { Card } from '../../../Card';

const id = 'king_tut';

class king_tut extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
    }
    
    onEscape(player, dice, table) {
        if(player.level <= 3)
            return true;
        player.level -= 2;
        if (dice >= 5) {
            return true;
        }
        player.hand.map(table.discard);
    
        //TODO: looseall item
    }
    //TODO: level += 2
    getAttackFor(players) {
        return 16;
    }
    get treasureCount() {
        return 4;
    }
}
Card.cards[id] = new king_tut();