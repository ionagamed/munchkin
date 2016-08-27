import { Card } from '../../../Card';
import { Monster } from '../helpers/Monster';

const id = 'pukachu';

class pukachu extends Monster {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
        this.treasure = 2;
    }
    
    badThing(player, table) {
        player.hand.map(table.discard);
        player.hand = [];
    }
    
    getAttackAgainst(players) {
        return 6;
    }
    onFightEnded(fight, table) {
        player.increaseLevel(1, true);
        if(fight.players.length == 1 && fight.players[0].modifiers.length == 0) {
            const player = fight.players[0].player;
            if (player.hasClassAdvantages('warrior')) {
                if (player.level >= 6) {
                    player.increaseLevel(1, true);
                }
            } else {
                if (player.level > 6) {
                    player.increaseLevel(1, true);
                }
            }
        }        
    }
}
Card.cards[id] = new pukachu();
