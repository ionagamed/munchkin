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
        this.type = 'door';
    }
    
    onEscape(player, dice) {
        dice += 1;
        if (dice >= 5) {
            console.log('successful escape');
            return true;
        } else {
            console.log('nop');
            // TODO: do a bad thing
        }
    }
}
Card.cards[id] = new GelatinousOctahedron();