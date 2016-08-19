/**
 * Created by ionagamed on 8/11/16.
 */

/**
 * Represents a card (can be both door and treasure)
 */
export class Card {
    constructor() {
        /**
         * Either 'door' or 'treasure'
         * 
         * @type {string}
         */
        this.type = '';

        /**
         * If this card could be wielded
         * 
         * @type {boolean}
         */
        this.wieldable = false;

        /**
         * If this card could be used
         * 
         * @type {boolean}
         */
        this.usable = false;

        /**
         * If this card could be cast
         * 
         * @type {boolean}
         */
        this.castable = false;

        /**
         * Card id
         * 
         * @type {string}
         */
        this.id = '';
    }


    /**
     * Get the image name
     * 
     * @returns {string}
     */
    get image() {
        return [this.pack, this.kind, this.id].join('_');
    }
    
    /**
     * Called on dealing card in open way (such that everybody sees the content)
     *
     * @param {Player} player who dealt the card
     * @param {Player} table Table
     */
    onDealtOpen(player, table) {
        
    }

    /**
     * Called on dealing card in closed way (such that only himself can see the content)
     *
     * @param {Player} player who dealt the card
     * @param {Player} table
     */
    onDealtClose(player, table) {

    }
    
    /**
     * Called when a card is received from some source
     * Source could be another player, the deck, looting
     *
     * @param {Player} player
     * @param {Player|'deck'|'looting'} source 
     * @param {Table} table
     */
    onReceived(player, source, table) {
        
    }

    /**
     * Called when a card is cast on a player
     * Returns true if card needs to be disposed
     * 
     * @param {Player|'deck'} source 
     * @param {Player} destination
     * @param {Player} table 
     * @returns boolean
     */ 
    onCast(source, destination, table) {
        return true;
    }

    /**
     * Determines if a card could be used by a player
     * 
     * @param {Player} player
     * @param {Table} table 
     * @returns {boolean}
     */
    canBeUsed(player, table) {
        return this.usable;
    }

    /**
     * Called when a card is used by player
     * 
     * @param {Player} player
     * @param {Player} table
     */
    onUsed(player, table) {
        
    }

    /**
     * Determines if a card could be wielded by a player
     * 
     * @param {Player} player
     * @param {Table} table 
     * @returns {boolean}
     */
    canBeWielded(player, table) {
        return this.wieldable;
    }

    /**
     * Called when a card is wielded by player
     * 
     * @param {Player} player 
     * @param {Table} table
     */
    onWielded(player, table) {
        
    }

    /**
     * Called whan a card is unwielded by player
     * 
     * @param {Player} player 
     * @param {Table} table 
     */
    onUnwielded(player, table) {
        
    }

    /**
     * Determines if a card can be held wielded on table
     * 
     * @see Player.updateConstraints()
     * @param {Player} player
     * @param {Table} table
     */
    canBeHeld(player, table) {
        return this.canBeWielded(player, table);
    }

    /**
     * Called when a card is being disposed (removed from everywhere and placed into discarded deck)
     * 
     * @param {Table} table 
     */
    onDisposed(table) {
        
    }

    /**
     * When the fight begins
     * 
     * @param {Fight} fight
     * @param {Fight} table
     */
    onFightBegan(fight, table) {
        
    }

    /**
     * When the fight ends
     * 
     * @param {Fight} fight
     * @param {Fight} table
     */
    onFightEnded(fight, table) {
        
    }

    /**
     * Get attack for a creature
     * Could be either Player or monster card id
     * 
     * @param {Player|string} x
     */
    getAttackFor(x) {
        
    }
}

/**
 * Array of cards by id
 * 
 * @type {{string: Card}}
 */
Card.cards = {};

/**
 * Get a card by its string id
 * 
 * @param id
 * @returns {Card}
 */
Card.byId = function(id) {
    return Card.cards[id];
};
