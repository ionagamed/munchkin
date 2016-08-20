/**
 * Created by ionagamed on 8/20/16.
 */

import { Card } from "../../../Card";
import { Fight } from "../../../Fight";

export class Monster extends Card {
    // TODO: add common monster code
    
    constructor() {
        /**
         * Levels given to the player if he won
         * 
         * @type {number}
         */
        this.levels = 1;

        /**
         * How much treasure is given upon death
         * 
         * @type {number}
         */
        this.treasure = 0;
        
        this.usable = true;
    }
    
    canBeUsed(player, table) {
        return table.currentPlayer().name == player.name && table.phase == 'open' && table.fight == null;
    }
    
    onUsed(player, table) {
        table.fight = new Fight();
        table.fight.players.push({
            player: player,
            state: 'fighting',
            modifiers: []
        });
        table.fight.players.push({
            monster: this.id,
            modifiers: []
        });
    }

    /**
     * Called when a player tries to escape from monster
     * 
     * @param {Player} player
     * @param {number} dice
     * @param {Table} table
     * @returns {boolean}
     */
    onEscape(player, dice, table) {
        if (dice >= 5) {
            return true;
        } else {
            this.badThing(player, table);
        }
    }

    /**
     * Thing, which is done when the escape is unsuccessful
     * 
     * @param {Player} player
     * @param {Table} table
     */
    badThing(player, table) {
        
    }
    
    onFightEnded(fight, table) {
        fight.players.map(x => {
            if (x.state == 'success') {
                x.player.level += this.levels;
                //TODO: add treasure
            }
        });
    }

    /**
     * Redefines the card attack for an array of players
     * 
     * @param {[Player]} players
     */
    getAttackFor(players) {
        
    }

    /**
     * The treasure count for fight
     *
     * @param {Fight} fight
     * @param {Table} table
     */
    getTreasure(fight, table) {
        return this.treasure;
    }

    /**
     * The levels given for all who are eligible
     * 
     * @param {Fight} fight
     * @param {Table} table
     */
    getLevels(fight, table) {
        return this.levels;
    }
}