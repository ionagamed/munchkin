import { Card } from '../../../Card';
import { Monster } from '../helpers/Monster';

const id = 'large_angry_chicken';

class _ extends Monster {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
        this.treasure = 1;
    }
    
    badThing(player, table) {
        player.decreaseLevel(1);
    }
    
    getAttackAgainst(players) {
        return 2;
    }
    
    onFightEnded(fight, table) {
        super.onFightEnded(fight, table);
        fight.players.map(x => {
            if (x.state == 'success') {
                if (x.player.name == fight.mainPlayer || x.player.hasRaceAdvantages('elf')) {
                    if (x.player.hasCardWielded('staff_of_napalm') || x.player.hasCardWielded('flaming_armor') || x.modifiers.indexOf('flaming_poison_potion') >= 0) {
                        x.player.increaseLevel(1, true);
                    }
                }
            }
        });
    }
}
Card.cards[id] = new _();
