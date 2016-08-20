/**
 * Created by ionagamed on 8/20/16.
 */

import { Card } from '../../../Card';
import { Item } from '../helpers/Item';

const id = 'tuba_of_charm';

class _ extends Item {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'treasure';
        this.type = '1-handed';
        this.hands = 1;
        this.big = true;
        this.wieldable = true;
        this.price = 300;
    }

    onEscape(player, dice, table) {
        return dice + 3;
    }

    onFightEnded(fight, table) {
        fight.players.map(x => {
            if (x.player.hasCardWielded('tuba_of_charm') && x.state == 'escape') {
                //TODO: get one closed treasure
            }
        });
    }
}
Card.cards[id] = new _();
