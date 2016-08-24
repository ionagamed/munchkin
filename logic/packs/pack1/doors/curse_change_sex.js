import { Card } from '../../../Card';
import { Curse } from '../helpers/Curse';

const id = 'curse_change_sex';

class curse_change_sex extends Curse {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'curse';
        this.castable = true;
    }
    onCast(source, dest, table) {
        if (dest.sex == 'male')
            dest.sex = 'female';
        else
            dest.sex = 'male';
    }
    getAttackFor(x) {
        return -5;
    }
    //TODO:
}
Card.cards[id] = new curse_change_sex();