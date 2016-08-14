/**
 * Created by ionagamed on 8/13/16.
 */

import { Card } from '../../../Card';

const id = 'gelatinous_octahedron';

class GelatinousOctahedron extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
    }
    
    onEscape(player, dice, table) {
        dice += 1;
        if (dice >= 5) {
            return true;
        } else {
            /*
             drop all big
             */
            player.wielded.map(x => {
                if (Card.byId(x).big) {
                    player.unwield(x);
                    Card.byId(x).onDisposed(table);
                    table.dispose(x);
                }
            });
            player.belt.map((x, i) => {
                if (Card.byId(x).big) {
                    player.belt.splice(i, 1);
                    Card.byId(x).onDisposed(table);
                    table.dispose(x);
                }
            });
            player.hand.map((x, i) => {
                if (Card.byId(x).big) {
                    player.hand.splice(i, 1);
                    Card.byId(x).onDisposed(table);
                    table.dispose(x);
                }
            })
        }
    }
}
Card.cards[id] = new GelatinousOctahedron();