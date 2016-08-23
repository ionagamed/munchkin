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
}
Card.cards[id] = new _();
