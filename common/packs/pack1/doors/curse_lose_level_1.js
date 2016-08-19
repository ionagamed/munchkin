import { Card } from '../../../Card';
import { Player } from '../../../Player';

const id = 'curse_lose_level_1';

class curse_lose_level_1 extends Card {
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
        player.level--;
    }
}
Card.cards[id] = new curse_lose_level_1();