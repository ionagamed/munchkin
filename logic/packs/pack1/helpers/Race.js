/**
 * Created by ionagamed on 8/23/16.
 */

import { Card } from '../../../Card';

export class Race extends Card {
    canBeWielded(player, table) {
        if (player.hasCardWielded('half-breed')) {
            return player.cardsOfTypeWielded('class') < 2;
        } else {
            return player.cardsOfTypeWielded('class') < 1;
        }
    }

    canBeHeld(player, table) {
        if (player.hasCardWielded('half-breed')) {
            return player.cardsOfTypeWielded('class') <= 2;
        } else {
            return player.cardsOfTypeWielded('class') <= 1;
        }
    }
}