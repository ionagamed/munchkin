/**
 * Created by ionagamed on 8/23/16.
 */

import { Card } from '../../../Card';

export class Class extends Card {
    canBeWielded(player, table) {
        if (player.hasCardWielded('super_munchkin')) {
            return player.cardsOfTypeWielded('class') < 2;
        } else {
            return player.cardsOfTypeWielded('class') < 1;
        }
    }

    canBeHeld(player, table) {
        if (player.hasCardWielded('super_munchkin')) {
            return player.cardsOfTypeWielded('class') <= 2;
        } else {
            return player.cardsOfTypeWielded('class') <= 1;
        }
    }
    
    onUnwielded(player, table) {
        player.wielded.map(x => {
            if (Card.byId(x).type == 'super_munckin') {
                player.unwield(x, table);
            }
        });
    }
}