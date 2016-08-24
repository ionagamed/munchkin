import { Card } from '../../../Card';
import { Figth } from '../../../Figth';

const id = 'out_to_lunch';

class out_to_lunch extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'out_to_lunch';
    }
    
    Fight.monsters.map( x => {
        table.discard(x.monster); 
    });
    
}
Card.cards[id] = new out_to_lunch();