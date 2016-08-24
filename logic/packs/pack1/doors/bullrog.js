import { Card } from '../../../Card';

const id = 'bullrog';

class bullrog extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
        this.levels = 2;
        this.treasure = 5;
    }
    
    onEscape(player, dice, table) {
        if (player.level <= 4)
            return true;
        return super.onEscape(player, dice, table);
    }

    badThing(player, table) {
        player.die(table);
    }

    getAttackFor(players) {
        return 18;
    }
}
Card.cards[id] = new bullrog();