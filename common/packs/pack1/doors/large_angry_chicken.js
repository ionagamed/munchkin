import { Card } from '../../../Card';

const id = 'large_angry_chicken';

class _ extends Card {
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
    
    getAttackFor(players) {
        return 2;
    }
    
    onFightEnded(fight, table) {
        fight.players.map(x => {
            if (x.state == 'success') {
                if (x.player.name == fight.mainPlayer || x.player.hasRaceAdvantages('elf')) {
                    if (x.player.hasCardWielded('staff_of_napalm') || x.player.hasCardWielded('flaming_armor') || x.modifiers.indexOf('flaming_poison_potion') >= 0) {
                        x.player.level++;
                    }
                }
            }
        });
    }
}
Card.cards[id] = new _();