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