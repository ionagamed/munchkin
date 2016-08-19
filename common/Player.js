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

        /**
         * Player sex
         * 
         * @type {string}
         */
        this.sex = 'male';
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
     * Returns true on success
     * 
     * @param card string
     * @param table Table
     * 
     * @returns boolean
     */
    wield(card, table) {
        if (Card.byId(card).canBeWielded(this, table)) {
            this.wielded.push(card);
            Card.byId(card).onWielded(this, table);
            this.updateConstraints(table);
            return true;
        }
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
        this.updateConstraints(table);
    }

    /**
     * Get base attack for player
     *
     * @returns {number}
     */
    
    getAttack() {
        var ret = this.level;
        this.wielded.map(x => {
            const c = Card.byId(x);
            if (c.getAttackFor)
                ret += c.getAttackFor(this);
        });
        return ret;
    }

    /**
     * Checks that player's current build is valid, and, if not, makes it valid
     * 
     * @param table
     */
    updateConstraints(table) {
        this.wielded.map(x => {
            if (!Card.byId(x).canBeHeld(this, table)) {
                this.unwield(x);
                if (Card.byId(x).kind == 'treasure') {
                    this.belt.push(x);
                } else {
                    table.discard(x);
                }
            }
        });
    }

    /**
     * Determines if player has a card wielded
     * 
     * @param c
     */
    hasCardWielded(c) {
        var ret = false;
        this.wielded.map(x => {
            if (Card.byId(x).id == c) {
                ret = true;
            }
        });
        return ret;
    }

    /**
     * How much cards of that type are wielded
     * 
     * @param t
     */
    cardsOfTypeWielded(t) {
        return this.wielded.filter(x => Card.byId(x).type == t).length;
    }

    /**
     * Determines if the player has the class advantages
     * 
     * @param c
     */
    hasClassAdvantages(c) {
        /**
         * The player for now has class advantages if and only if he has that class
         */
        return this.hasCardWielded(r);
    }

    /**
     * Determines if the player has the class disadvantages
     * 
     * @param c
     */
    hasClassDisadvantages(c) {
        const has = this.hasCardWielded(c);
        const sm = this.wielded.indexOf('supermunchkin') > -1;
        const classes = this.wielded.filter(x => Card.byId(x).type == 'class').length;
        return has && !(sm && classes == 1);
    }

    /**
     * Determines if the player has the race advantages
     *
     * @param r
     */
    hasRaceAdvantages(r) {
        /**
         * The player for now has race advantages if and only if he has that race
         */
        return this.hasCardWielded(r);
    }

    /**
     * Determines if the player has the class disadvantages
     *
     * @param r
     */
    hasRaceDisadvantages(r) {
        const has = this.hasCardWielded(c);
        const sm = this.wielded.indexOf('half-breed') > -1;
        const races = this.wielded.filter(x => Card.byId(x).type == 'race').length;
        return has && !(sm && races == 1);
    }

    /**
     * Get the amount of non-free hands
     * 
     * @returns {number}
     */
    getBusyHandCount() {
        const types = this.wielded.map(x => Card.byId(x).type);
        return types.filter(x => x == '1-handed').length +
            types.filter(x => x == '2-handed').length * 2;
    }
}
