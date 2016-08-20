/**
 * Created by ionagamed on 8/20/16.
 */

import { Card } from '../../../Card';
import { Player } from "../../../Player";

export class Curse extends Card {
    canBeCast(source, dest, table) {
        return dest instanceof Player;
    }
}