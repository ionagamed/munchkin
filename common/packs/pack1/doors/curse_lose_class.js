curse_lose_class
import { Card } from '../../../Card';
import { Player } from '../../../Player';

const id = 'curse_change_race';

class _ extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'curse';
        this.castable = true;
    }
    canBeCast(source, dest, table) {
        return dest instanceof Player;
    }
    onCast(source, dest, table) {
        var hasCl = false;
        player.wielded.map (x => {
           if (Card.byId(x).type == 'race') {
               player.unwield(x, table);
               hasCl = true;
           } 
        });
        // TODO: remake 
        if (!hasCl)
            player.level--;
    }
}
Card.cards[id] = new _();