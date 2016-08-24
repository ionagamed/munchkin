/**
 * Created by ionagamed on 8/23/16.
 */

import { Card } from '../../../Card';

const id = 'half-breed';

class _ extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'half-breed';
        this.wieldable = true;
    }

    canBeWielded(player, table) {
        return true;
    }

    canBeHeld(player, table) {
        return true;
    }

    onUnwielded(player, table) {
        player.wielded.map(x => {
            if (Card.byId(x).type == 'race') {
                player.unwield(x, table);
                table.discard(x);
            }
        });
    }
}
Card.cards[id + '_1'] = new _();
Card.cards[id + '_2'] = new _();
