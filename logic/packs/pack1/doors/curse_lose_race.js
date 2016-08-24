import { Card } from '../../../Card';
import { Curse } from '../helpers/Curse';

const id = 'curse_lose_race';

class _ extends Curse {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'curse';
        this.castable = true;
    }
    onCast(source, dest, table) {
        dest.wielded.map (x => {
            if (Card.byId(x).type == 'race') {
                dest.unwield(x, table);
            } 
        });
    }
} 
Card.cards[id] = new _();