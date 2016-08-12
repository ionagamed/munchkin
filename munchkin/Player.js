/**
 * Created by ionagamed on 8/11/16.
 */

import { Card } from './Card';    
    
export class Player {
    constructor() {
        /**
         * An array of cards which are in player's hand (not on the table)
         *
         * @type [string]
         */
        var hand = [];

        /**
         * An array of cards which are currently wielded (on the table)
         * Cheats are applied by placing two cards in order: ... , cheat, stuff, ...
         * Supermunchkin and such are applied similarly: ... , supermunchkin, first class, second class, ...
         *
         * @type [string]
         */
        var wielded = [];

        /**
         * Array of cards which are placed on table, but not wielded
         * @type [string]
         */
        var belt = [];

        /**
         * Player name
         * Must be entered on login
         *
         * @type {string}
         */
        var name = '';

        /**
         * Player level
         *
         * @type {number}
         */
        var level = 1;
    }
    
    /**
     * Called when a player receives a card from any source
     *
     * @param card Card
     * @param source Player|'deck'|'looting'
     */
    onCardReceived(card, source) {
        
    }
    
    /**
     * Get base attack for player
     *
     * @returns {number}
     */
    
    getAttack() {
        var ret = this.level;
        this.wielded.map(x => {
            ret += Card.byId(x).getBaseAttack();
        });
        return ret;
    }
}
