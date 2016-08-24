import { Card } from '../../../Card';

const id = 'pukachu';

class pukachu extends Card {
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
        player.hand.map(x => {
            player.unwield(x, table);
        });
    }
    
    getAttackFor(players) {
        return 6;
    }
    get treasureCount() {
        return 2;
    }
    onFightEnded(fight, table) {
        if(fight.players.length == 1 && fight.players[0].modifiers.length == 0) {
            var iswarrior = false;
            players.map(x => {
            if(x.hasClassAdvantages('warrior')) 
                iswarrior = true;
            if(iswarrior)
                if(player.level >=6)
                    player.level++;
            else
                if(player.level > 6)
                    player.level++;
            });
        }        
    }
}
Card.cards[id] = new pukachu();