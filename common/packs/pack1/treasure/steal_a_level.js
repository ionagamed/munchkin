/**
 * Created by ionagamed on 8/20/16.
 */

import { Card } from '../../../Card';
import { Player } from '../../../Player';

const id = 'steal_a_level';

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
        return (dest instanceof Player) && 
            (source instanceof Player) && 
            source.level < 9 && 
            dest.level > 1;
    }

    onCast(source, dest, table) {
        source.level++;
        dest.level--;
    }
}
