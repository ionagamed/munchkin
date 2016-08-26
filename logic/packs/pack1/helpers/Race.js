/**
 * Created by ionagamed on 8/23/16.
 */

import { Card } from '../../../Card';

export class Race extends Card {
    canBeWielded(player, table) {
        if (player.hasCardWielded('half-breed')) {
            return player.cardsOfTypeWielded('race') < 2;
        } else {
            return player.cardsOfTypeWielded('race') < 1;
        }
    }

    canBeHeld(player, table) {
        if (player.hasCardWielded('half-breed')) {
            return player.cardsOfTypeWielded('race') <= 2;
        } else {
            return player.cardsOfTypeWielded('race') <= 1;
        }
    }
}