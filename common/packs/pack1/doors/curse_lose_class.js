import { Card } from '../../../Card';
import { Curse } from '../helpers/Curse';

const id = 'curse_change_race';

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
        var hasCl = false;
        dest.wielded.map (x => {
            if (Card.byId(x).type == 'race') {
                dest.unwield(x, table);
                hasCl = true;
            } 
        });
        // TODO: remake 
        if (!hasCl)
            dest.decreaseLevel(1);
    }
}
Card.cards[id] = new _();