/**
 * Created by ionagamed on 8/13/16.
 */

class Fight {
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
            ret += x.monster.getAttack();
            x.modifiers.map(y => {
                ret += Card.byId(y).getModFor(x.player);
            });
        })
        return ret;
    }

    /**
     * Get the side, which will win in current conditions
     * 
     * @returns 'players'|'monsters'
     */
    winningSide() {
        var playersPts = 0;
        this.players.map(x => {
            playersPts += x.player.getAttack();
            x.modifiers.map(y => {
                playersPts += Card.byId(y).getModifierForPlayer(x.player);
            });
        });
    }
}