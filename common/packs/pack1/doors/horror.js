import { Card } from '../../../Card';
import dice from '../../../dice';

const id = 'horror';

class horror extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
    }
    
    onEscape(player, _dice, table) {
        if (dice >= 5)
            return true;
        player.wielded.map (x => {
           if (Card.byId(x).type == 'class')
               if (x == 'wizard') {
                   unwield(Card.byId(x), table);
                   return false;
               }
        // TODO: death;
    }
    getAttackFor(players) {
        var iswarrior = false;
        players.map(x => {
            if(x.hasRaceDisadvantages('warrior')) 
                iswarrior = true;
        })
        if (iswarrior)
            return 18;
        return 14;
    }
    
    get treasureCount() {
        return 4;
    }
}
Card.cards[id] = new horror();