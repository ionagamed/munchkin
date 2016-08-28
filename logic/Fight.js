/**
 * Created by ionagamed on 8/13/16.
 */
    
import { Card } from './Card';    

export class Fight {
    constructor() {
        /**
         * The player side of a fight
         *
         * Schema: [{
         *     player: {Player},
         *     state: {'fighting'|'success'|'escape'|'monster'},
         *     modifiers: {[string]}
         * }]
         *
         * States:
         *   * 'fighting'
         *   * 'success' - monster is beaten
         *   * 'escape' - successful escape
         *   * 'monster' - unsuccessful escape
         * 
         * @type [Object]
         */
        this.players = [];

        /**
         * The player, who started the fight
         * 
         * @type {Player}
         */
        this.mainPlayer = null;
        
        /**
         * The monster side of a fight
         * 
         * @type [Object]
         */
        this.monsters = [];

        /**
         * Timestamp, when the fight began
         * 
         * @type {number}
         */
        this.beganAt = 0;
    }

    /**
     * Get overall attack of all players
     * 
     * @param {Table} table
     * @returns {number}
     */
    getPlayersAttack(table) {
        var ret = 0;
        this.players.map(x => {
            ret += x.player.getAttack();
            x.modifiers.map(y => {
                ret += Card.byId(y).getModFor(x);
            });
        });
        return ret;
    }

    /**
     * Get overall attack of all monsters
     * 
     * @param {Table} table
     * @returns {number}
     */
    getMonstersAttack(table) {
        var ret = 0;
        this.monsters.map(x => {
            ret += Card.byId(x.monster).getAttackAgainst(this.players.map(x => {
                return x.player;
            }));
            x.modifiers.map(y => {
                ret += Card.byId(y).getModFor(x, table);
            });
        });
        return ret;
    }

    /**
     * When the fight began
     * 
     * @param {Table} table
     */
    onBegan(table) {
        this.beganAt = +(new Date());
        this.players.map(x => {
            x.player.wielded.map(x => {
                const c = Card.byId(x);
                c.onFightBegan(this, table);
            });
        });
    }

    /**
     * When the fight ends
     * 
     * @param {Table} table
     */
    onEnded(table) {
        this.players.map(x => {
            x.player.wielded.map(x => {
                const c = Card.byId(x);
                c.onFightEnded(this, table);
            });
        });
        this.monsters.map(x => {
            Card.byId(x.monster).onFightEnded(this, table);
        });
        this.players.map(x => {
            x.modifiers.map(y => {
                table.discard(y);
            });
        });
        this.monsters.map(x => {
            x.modifiers.map(y => {
                table.discard(y);
            });
            table.discard(x.monster);
            console.log('should\'ve discarded ' + x.monster);
        });
    }

    /**
     * Get the side, which will win in current conditions
     * 
     * @param {Table} table
     * @returns 'players'|'monsters'
     */
    getWinningSide(table) {
        return (this.getPlayersAttack(table) > this.getMonstersAttack(table) ? 'players' : 'monsters');
    }
}