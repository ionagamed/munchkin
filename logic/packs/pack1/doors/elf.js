import { Card } from '../../../Card';
import { Race } from '../helpers/Race';

const id = 'elf';

class Elf extends Race {
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
Card.cards[id + '_1'] = new Elf();
Card.cards[id + '_2'] = new Elf();
Card.cards[id + '_3'] = new Elf();