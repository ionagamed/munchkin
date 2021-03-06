/**
 * Created by ionagamed on 8/18/16.
 */

import { Card } from '../../../Card';

const id = 'super_munchkin';

class Supermunchkin extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'super_munchkin';
        this.wieldable = true;
    }

    canBeWielded(player, table) {
        return player.cardsOfTypeWielded('super_munchkin') == 0;
    }

    canBeHeld(player, table) {
        return true;
    }
    
    onUnwielded(player, table) {
        player.wielded.map(x => {
            if (Card.byId(x).type == 'class') {
                player.unwield(x, table);
                table.discard(x);
            }
        });
    }
}
Card.cards[id + '_1'] = new Supermunchkin();
Card.cards[id + '_2'] = new Supermunchkin();
