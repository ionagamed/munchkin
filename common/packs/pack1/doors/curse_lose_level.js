import { Card } from '../../../Card';
import { Curse } from "../helpers/Curse";

const id = 'curse_lose_level';

class curse_lose_level extends Curse {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'curse';
        this.castable = true;
    }
    onCast(source, dest, table) {
        player.level--;
    }
}
Card.cards[id + '_1'] = new curse_lose_level();
Card.cards[id + '_2'] = new curse_lose_level();
