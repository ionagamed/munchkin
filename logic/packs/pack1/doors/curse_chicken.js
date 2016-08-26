import { Card } from '../../../Card';
import { Player } from '../../../Player';
import { Curse } from '../helpers/Curse';

const id = 'curse_chicken';

class curse_chicken extends Curse {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'curse';
        this.castable = true;
    }
}
Card.cards[id] = new curse_chicken();