/**
 * Created by ionagamed on 8/20/16.
 */

import { Card } from '../../../Card';
import { Player } from "../../../Player";

const id = 'whine_at_the_gm';

class _ extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'treasure';
        this.type = 'level';
        this.castable = true;
    }
    
    canBeCast(source, dest, table) {
        return (dest instanceof Player) && dest.level < 10 && dest.level < table.players.reduce((acc, v) => (acc < v ? acc : v));
    }
    
    onCast(source, dest, table) {
        dest.level++;
    }
}
Card.cards[id] = new _();
