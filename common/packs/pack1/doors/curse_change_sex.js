import { Card } from '../../../Card';
import { Player } from '../../../Player';

const id = 'curse_change_sex';

class curse_change_sex extends Card {
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
        if (player.sex == 'male')
            player.sex = 'female';
        else
            player.sex = 'male';
    }
    getAttackFor() {
        return -5;
    }
    //TODO:
}
Card.cards[id] = new curse_change_sex();