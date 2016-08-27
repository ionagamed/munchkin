import { Card } from '../../../Card';

const id = 'mate';

class out_to_lunch extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'mate';
        this.custable = true;
    }
    onCast(source, destination, table) {
        for(let i of table.fight.monsters) {
            if (i.monster == destination) {
                table.fight.monsters.push(i);
                break;
            }
        }
    }
}
Card.cards[id] = new out_to_lunch();