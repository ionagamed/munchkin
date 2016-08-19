import { Card } from '../../../Card';

const id = 'flying_frogs';

class flying_frogs extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
    }
    
    onEscape(player, dice, table) {
        if (dice >= 5) 
            return true;
        player.level--;
        player.wielded.map(x => {
            if (Card.byId(x).type == 'headgear')
                unwield(x, table);
        });
    }
    getAttackFor(players) {
        var iself = false;
        players.map(x => {
            if(x.hasRaceDisadvantages('elf')) 
                iself = true;
        })
        if (iself)
            return 14;
        return 8;
    }
    get treasureCount() {
        return 2;
    }
}
Card.cards[id] = new flying_frogs();