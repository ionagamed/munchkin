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
    
    onEscape(player, dice) {
        dice += 1;
        if (dice >= 5) {
            return true;
        } else {
            
        }
    }
}
Card.cards[id] = new GelatinousOctahedron();