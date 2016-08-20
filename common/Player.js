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
        var idx = this.wielded.indexOf(card);
        if (idx > 0) {
            if (Card.byId(this.wielded[idx - 1]).type == 'cheat') {
                idx--;
                this.wielded.splice(idx, 1);
                Card.byId('cheat').onUnwielded(this, table);
            }
        }
        this.wielded.splice(idx, 1);
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
        for (let i in this.wielded) {
            if (this.wielded.hasOwnProperty(i)) {
                const id = this.wielded[i];
                if (!Card.byId(id).canBeHeld(this, table) && i > 0 && Card.byId(this.wielded[i - 1]).type == 'cheat') {
                    this.unwield(x);
                    if (Card.byId(x).kind == 'treasure') {
                        this.belt.push(x);
                    } else {
                        table.discard(x);
                    }
                }
            }
        }
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
        return this.hasCardWielded(c);
    }

    /**
     * Determines if the player has the class disadvantages
     * 
     * @param c
     */
    hasClassDisadvantages(c) {
        const has = this.hasCardWielded(c);
        const sm = this.hasCardWielded('super_munchkin');
        const classes = this.wielded.filter(x => Card.byId(x).type == 'class').length;
        return has && !(sm && classes == 1);
    }

    /**
     * Determines if the player has the race advantages
     *
     * @param r
     */
    hasRaceAdvantages(r) {
        if (r == 'human') {
            if (this.hasCardWielded('super_munchkin')) {
                return this.cardsOfTypeWielded('class') <= 1;
            } else {
                return this.cardsOfTypeWielded('class') <= 0;
            }
        } else {
            return this.hasCardWielded(r);
        }
    }

    /**
     * Determines if the player has the class disadvantages
     *
     * @param r
     */
    hasRaceDisadvantages(r) {
        const has = this.hasCardWielded(c);
        const sm = this.hasCardWielded('half-breed');
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
    
    die(table) {
        this.wilded.map(x => {
                if(Card.byId(x).type != 'race' && Card.byId(x).type != 'class' && Card.byId(x).type != 'super_munchkin' && Card.byId(x).type != 'half-breed')
                    this.unwield(x, table);
            });
        this.hand.map(x => {
            this.unwield(x, table);
        });
        this.belt.map(x => {
            this.unwield(x, table);
        });
        this.dead = true;
    }
}
