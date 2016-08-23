import { Card } from '../../../Card';

const id = 'large_angry_chicken';

class _ extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
    }
    
    onEscape(player, dice, table) {
        if(dice >= 5)
            return true;
        player.level--;
    }
    
    getAttackFor(players) {
        return 2;
    }
    get treasureCount() {
        return 1;
    }
    getLevels(fight, table) {
        var isfire = false;
        player.wielded.map(x => {
           if(x == 'staff_of_napalm' || x == 'flaming_armor')
               isfire = true;
            
        });
        if(figth.players == 'success' && true)
            player.level++;
    }
}
Card.cards[id] = new _();