import { Card } from '../../../Card';
import { Monster } from '../helpers/Monster';

const id = 'face_sucker';

class flying_frogs extends Monster {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
        this.treasure = 2;
    }
    
    badThing(player, table) {
        player.decreaseLevel(1);
        player.wielded.map(x => {
            if (Card.byId(x).type == 'headgear' || x == 'curse_chicken') {
                player.unwield(x, table);
                table.discard(x);
            }
        });
    }
    getAttackAgainst(players) {
        var isElf = false;
        players.map(x => {
            if(x.hasRaceDisadvantages('elf')) 
                isElf = true;
        });
        if (isElf)
            return 14;
        return 8;
    }
}
Card.cards[id] = new flying_frogs();
