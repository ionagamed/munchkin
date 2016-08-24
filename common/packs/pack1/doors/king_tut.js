import { Card } from '../../../Card';
import { Monster } from "../helpers/Monster";

const id = 'king_tut';

class king_tut extends Monster {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
        this.undead = true;
        this.levels = 2;
        this.treasure = 4;
    }
    
    onEscape(player, dice, table) {
        if(player.level <= 3)
            return true;
        player.decreaseLevel(2);
        return super.onEscape(player, dice, table);
    }
    badThing(player, table) {
        player.hand.map(table.discard);
        player.hand = [];
        player.wielded.map(x => {
            if (Card.byId(x).price >= 0) {
                player.unwield(x);
                table.discard(x);
            }
        });
        player.belt.map((x, i) => {
            if (Card.byId(x).price >= 0) {
                player.belt.splice(i, 1);
                table.discard(x);
            }
        });
    }
    getAttackFor(players) {
        return 16;
    }
}
Card.cards[id] = new king_tut();