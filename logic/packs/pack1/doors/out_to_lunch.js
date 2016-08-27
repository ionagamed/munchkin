import { Card } from '../../../Card';
import { Figth } from '../../../Fight';

const id = 'out_to_lunch';

class out_to_lunch extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'out_to_lunch';
        this.castable = true;
    }
    
    onCast(source, destination, table) {
        table.fight.monsters.map( x => {
            table.discard(x.monster); 
        });
        table.fight.monsters = [];
    }
}
Card.cards[id] = new out_to_lunch();