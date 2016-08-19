import { Card } from '../../../Card';

const id = 'undead_horse';

class undead_horse extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
    }
    
    onEscape(player, dice, table) {
        if (dice >= 5) {
            return true;
        }
        player.level -= 2;
    }
    
    getAttackFor(players) {
        var isdwarf = false;
        players.map(x => {
            if (x.hasRaceDisadvantages('dwarf'))
                isdwarf = true;
            if (isdwarf)
                return 9;
            return 5;
        });
    }
        
    get treasureCount() {
        return 4;
    }
}
Card.cards[id] = new undead_horse();