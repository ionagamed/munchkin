import { Card } from '../../../Card';

const id = 'potted_plant';

class potted_plant extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
    }
    
    onEscape(player, dice, table) {
        return true;
    }
    
    getAttackFor(players) {
        return 1;
    }
    
    getTreasure(fight, table) {
        var isElf = false;
        fight.players.map(x => {
            if(x.player.hasRaceAdvantages('elf'))
                isElf = true;
        });
        if (isElf)
            return 2;
        return 1;
    }
}
Card.cards[id] = new potted_plant();