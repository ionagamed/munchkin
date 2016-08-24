import { Card } from '../../../Card';
import { Class } from "../helpers/Class";

const id = 'dwarf';

class Dwarf extends Race {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'race';
        this.wieldable = true;
    }
    //TODO: function;
}
Card.cards[id + '_1'] = new Dwarf();
Card.cards[id + '_2'] = new Dwarf();
Card.cards[id + '_3'] = new Dwarf();