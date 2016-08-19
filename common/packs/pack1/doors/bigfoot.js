import { Card } from '../../../Card';

const id = 'bigfoot';

class bigfoot extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
    }
    
    onEscape(player, dice, table) {
        if (dice >= 5)
            return true;
        player.wielded.map(x => {
            if (Card.byId(x).type == 'headgear')
                unwield(x, table);
            });
    }
    getAttackFor(players) {
        var level = 12
        fight.players.map(x => {
            if (x.race == 'halfling' || player(x).race == 'dwarf')
                level = 15;
        });
        return level;
    }
    get treasureCount() {
        return 3;
    }
}
Card.cards[id] = new bigfoot();