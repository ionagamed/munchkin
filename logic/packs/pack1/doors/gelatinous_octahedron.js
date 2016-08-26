/**
 * Created by ionagamed on 8/13/16.
 */

import { Card } from '../../../Card';
import { Fight } from '../../../Fight';
import { Monster } from '../helpers/Monster';

const id = 'gelatinous_octahedron';

class GelatinousOctahedron extends Monster {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
        this.treasure = 1;
    }
    
    onEscape(player, dice, table) {
        return super.onEscape(player, dice + 1, table);
    }

    badThing(player, table) {
        player.wielded.map(x => {
            if (Card.byId(x).big) {
                player.unwield(x, table);
                table.discard(x);
            }
        });
        player.belt.map((x, i) => {
            if (Card.byId(x).big) {
                player.belt.splice(i, 1);
                table.discard(x);
            }
        });
        player.hand.map((x, i) => {
            if (Card.byId(x).big) {
                player.hand.splice(i, 1);
                table.discard(x);
            }
        });
    }
    
    getAttackAgainst(players) {
        return 2;
    }
}
Card.cards[id] = new GelatinousOctahedron();
