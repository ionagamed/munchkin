import { Card } from '../../../Card';

const id = 'gazebo';

class _ extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
        this.treasure = 2;
    }
    
    onEscape(player, dice, table) {
        if (dise >= 5)
            return true;
        player.level -= 3;
    }
    
    getAttackFor(players) {
        return 8;
    }
    
    onFightEnded(fight, table) {
        if (fight.players.length == 1) {
            conole.log('gazebo debag');
            throw new Exception();
        }
    }
}
Card.cards[id] = new _();