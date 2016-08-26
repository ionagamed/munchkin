import { Card } from '../../../Card';
import { Class } from '../helpers/Class';

const id = 'thief';

class Thief extends Class {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'class';
        this.wieldable = true;
    }
    //TODO: function;
}
Card.cards[id + '_1'] = new Thief();
Card.cards[id + '_2'] = new Thief();
Card.cards[id + '_3'] = new Thief();