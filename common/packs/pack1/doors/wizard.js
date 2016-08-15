/**
 * Created by ionagamed on 8/15/16.
 */

import { Card } from '../../../Card';

const id = 'wizard';

class Wizard extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'class';
        this.wieldable = true;
    }
}
Card.cards[id + '_1'] = new Wizard();
Card.cards[id + '_2'] = new Wizard();
Card.cards[id + '_3'] = new Wizard();
