import { Card } from '../../../Card';
import { Player } from '../../../Player';

const id = 'curse_duck_of_doom';

class CurseLoseHeadgear extends Card {
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
        player.level -= 2;
    }
}
Card.cards[id] = new curse_duck_of_doom();