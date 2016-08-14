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
        this.hand = [];

        /**
         * An array of cards which are currently wielded (on the table)
         * Cheats are applied by placing two cards in order: ... , cheat, stuff, ...
         * Supermunchkin and such are applied similarly: ... , supermunchkin, first class, second class, ...
         *
         * @type [string]
         */
        this.wielded = [];

        /**
         * Array of cards which are placed on table, but not wielded
         * @type [string]
         */
        this.belt = [];

        /**
         * Player name
         * Must be entered on login
         *
         * @type {string}
         */
        this.name = '';

        /**
         * Player level
         *
         * @type {number}
         */
        this.level = 1;
    }
    
    /**
     * Called when a player receives a card from any source
     *
     * @param card string
     * @param source Player|'deck'|'looting'
     */
    onCardReceived(card, source) {
        
    }

    /**
     * Wield a card
     * 
     * @param card string
     * @param table Table
     */
    wield(card, table) {
        this.wielded.push(card);
        Card.byId(card).onWielded(this, table);
    }

    /**
     * Unwield a card
     * 
     * @param card string
     * @param table Table
     */
    unwield(card, table) {
        this.wielded = this.wielded.filter(x => x != card);
        Card.byId(card).onUnwielded(this, table);
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
