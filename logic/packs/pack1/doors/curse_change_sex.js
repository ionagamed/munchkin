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
    onFightEnded(fight, table) {
        super.onFightEnded(fight, table);
        fight.players.map(x => {
            x.player.wielded.map((card, pos) => {
                if(card == this.id)
                    x.player.wielded.splice(pos, 1);
            });
        });
    }
    getAttackFor(x) {
        return -5;
    }
}
Card.cards[id] = new curse_change_sex();
