/**
 * Created by ionagamed on 8/14/16.
 */

import { Card } from '../../../Card';
import { Player } from '../../../Player';
import { Curse } from "../helpers/Curse";

const id = 'curse_lose_armor';

class CurseLoseArmor extends Curse {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'curse';
        this.castable = true;
    }
    onCast(source, dest, table) {
        for (let i of dest.wielded) {
            if (Card.byId(i).type === 'armor') {
                dest.unwield(i);
                table.discard(i);
            }
        }
        return true;
    }
}
Card.cards[id] = new CurseLoseArmor();