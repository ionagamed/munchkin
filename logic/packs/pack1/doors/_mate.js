import { Card } from '../../../Card';
import { MonsterModifier } from '../helpers/MonsterModifier';

const id = 'mate';

class _ extends MonsterModifier {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster_modifier';
        this.castable = true;
    }
    
    getModFor(x, table) {
        return Card.byId(x.monster).getAttackAgainst(table.fight.players.map(x => x.player)) +
            x.modifiers.map(x => Card.byId(x).getModFor(x)).reduce((acc, v) => acc + v);
    }
    
    getTreasureFor(x, table) {
        return Card.byId(x.monster).getTreasure(table.fight, table);
    }
}
Card.cards[id] = new _();
