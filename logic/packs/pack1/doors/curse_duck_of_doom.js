import { Card } from '../../../Card';
import { Curse } from '../helpers/Curse';

const id = 'curse_duck_of_doom';

class curse_duck_of_doom extends Curse {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'curse';
        this.castable = true;
    }
    onCast(source, dest, table) {
        dest.decreaseLevel(2);
        return true;
    }
}
Card.cards[id] = new curse_duck_of_doom();