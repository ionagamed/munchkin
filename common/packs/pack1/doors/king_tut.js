import { Card } from '../../../Card';

const id = 'king_tut';

class king_tut extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
        this.level = 2;
    }
    
    onEscape(player, dice, table) {
        if(player.level <= 3)
            return true;
        player.level -= 2;
        if (dice >= 5) {
            return true;
        }
        this.wilded.map(x => {
                if(Card.byId(x).type != 'race' && Card.byId(x).type != 'class' && Card.byId(x).type != 'super_munchkin' && Card.byId(x).type != 'half-breed')
                    this.unwield(x, table);
            });
        this.hand.map(x => {
            this.unwield(x, table);
        });
        this.belt.map(x => {
            this.unwield(x, table);
        });
    }
    getAttackFor(players) {
        return 16;
    }
    get treasureCount() {
        return 4;
    }
}
Card.cards[id] = new king_tut();