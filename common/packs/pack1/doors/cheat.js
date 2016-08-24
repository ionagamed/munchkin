/**
 * Created by ionagamed on 8/23/16.
 */

import { Card } from '../../../Card';

const id = 'cheat';

class _ extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'cheat';
        this.wieldable = true;
    }
    
    onWielded(player, table) {
        const idx = player.wielded.indexOf('cheat');
        player.wielded.splice(idx + 1, 0, 'cheat_free_helper');
    }
}

class __ extends Card {
    constructor() {
        super();
        this.id = 'cheat_free_helper';
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'cheat_free_helper';
    }
    
    canBeHeld(player, table) {
        return true;
    }
}

Card.cards[id] = new _();
Card.cards['cheat_free_helper'] = new __();
