/**
 * Created by ionagamed on 8/18/16.
 */

import { Card } from '../../../Card';
import { Class } from "../helpers/Class";

const id = 'warrior';

class Warrior extends Class {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'class';
        this.wieldable = true;
    }
    
    getAttackFor(player) {
        return 1;
    }
}
Card.cards[id + '_1'] = new Warrior();
Card.cards[id + '_2'] = new Warrior();
Card.cards[id + '_3'] = new Warrior();
