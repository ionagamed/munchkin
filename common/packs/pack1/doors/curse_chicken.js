.type == 'headgear
import { Card } from '../../../Card';
import { Player } from '../../../Player';

const id = 'curse_chicken';

class curse_chicken extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'curse';
        this.castable = true;
    }
    canBeCast(source, dest, table) {
        return dest instanceof Player;
    }
    onCast(source, dest, table) {
        
    }
    onEscape(player, dice, table) {
            return (dice - 1);
    }
    // TODO: connect with haedgear;
}
Card.cards[id] = new curse_change_sex();