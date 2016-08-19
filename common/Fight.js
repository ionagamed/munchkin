/**
 * Created by ionagamed on 8/13/16.
 */
    
import { Card } from './Card';    

export class Fight {
    constructor() {
        /**
         * The player side of a fight
         * 
         * @type [Object]
         */
        this.players = [];
        
        /**
         * The monster side of a fight
         * 
         * @type [Object]
         */
        this.monsters = [];
    }

    /**
     * Get overall attack of all players
     * 
     * @returns {number}
     */
    getPlayersAttack() {
        var ret = 0;
        this.players.map(x => {
            ret += x.player.getAttack();
            x.modifiers.map(y => {
                ret += Card.byId(y).getModFor(x.player);
            });
        });
        return ret;
    }

    /**
     * Get overall attack of all monsters
     * 
     * @returns {number}
     */
    getMonstersAttack() {
        var ret = 0;
        this.monsters.map(x => {
            ret += Card.byId(x.monster).getAttackFor(this.players);
            x.modifiers.map(y => {
                ret += Card.byId(y).getModFor(x.monster);
            });
        });
        return ret;
    }

    /**
     * Get the side, which will win in current conditions
     * 
     * @returns 'players'|'monsters'
     */
    getWinningSide() {
        return (this.getPlayersAttack() > this.getMonstersAttack() ? 'players' : 'monsters');
    }
}