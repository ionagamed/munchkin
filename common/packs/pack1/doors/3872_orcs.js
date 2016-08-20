import { Card } from '../../../Card';
import dice from '../../../dice';

const id = 'a3872_orcs';

class a3872_orcs extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
    }
    
    onEscape(player, _dice, table) {
        if (_dice >= 5)
            return true;
        var d = dice();
        if (d <= 2)
            {/* TODO: death*/}
        else {
            player.level -= d;
            if(player.level < 1)
                player.level = 1;
        }
    }
    
    getAttackFor(players) {
        var isdwarf = false;
        players.map(x => {
            if(x.hasRaceDisadvantages('dwarf')) 
                isdwarf = true;
        })
        if (isdwarf)
            return 16;
        return 10;
    }
    
    get treasureCount() {
        return 3;
    }
}
Card.cards[id] = new a3872_orcs();