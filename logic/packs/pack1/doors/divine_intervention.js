/**
 * Created by ionagamed on 8/23/16.
 */

import { Card } from '../../../Card';

const id = 'divine_intervention';

class _ extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'divine_intervention';
    }
    
    onReceived(player, source, table) {
        table.players.map(x => {
            if (x.hasClassAdvantages('cleric')) {
                player.increaseLevel(1, true);
            }
        });
        player.hand = player.hand.filter(x => x != 'divine_intervention');
        table.discardedDoors.push(id);
    }
}
Card.cards[id] = new _();
