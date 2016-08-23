/**
 * Created by ionagamed on 8/20/16.
 */

import { Card } from '../../../Card';
import { Modifier } from '../helpers/Modifier';
import { Player } from "../../../Player";

const id = 'yuppie_water';

class _ extends Modifier {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'treasure';
        this.type = 'modifier';
        this.castable = true;
        this.price = 100;
    }

    canBeCast(source, dest, table) {
        return table.fight != null && (dest instanceof Player) && (dest.hasRaceAdvantages('elf'));
    }
    
    onCast(source, dest, table) {
        table.fight.players.map(x => {
            if (x.player.hasRaceAdvantages('elf'))
                x.modifiers.push('yuppie_water_helper');
        });
    }
}

class __ extends Modifier {
    constructor() {
        super();
        this.id = 'yuppie_water_helper';
        this.pack = 'pack1';
        this.kind = 'treasure';
        this.type = 'modifier';
    }
    
    getModFor(x) {
        return 2;
    }
}

Card.cards[id] = new _();
Card.cards['yuppie_water_helper'] = new __();

