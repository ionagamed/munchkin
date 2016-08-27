import { Card } from '../../../Card';
import { Monster } from '../helpers/Monster';

const id = 'gazebo';

class _ extends Monster {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
        this.treasure = 2;
    }
    
    badThing(player, table) {
        player.decreaseLevel(3);
    }
    
    getAttackAgainst(players) {
        return 8;
    }
    
    onFightEnded(fight, table) {
        super.onFightEnded();
        if (fight.players.length != 1) {
            console.log('gazebo debug');
            throw new Exception();
        }
    }
}
Card.cards[id] = new _();
