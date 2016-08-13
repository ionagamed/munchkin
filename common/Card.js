/**
 * Created by ionagamed on 8/11/16.
 */

/**
 * Represents a card (can be both door and treasure)
 */
export class Card {
    constructor() {
        /**
         * Determines if the card is wieldable (could be placed on table)
         *
         * @type {boolean}
         */
        this.wieldable = false;

        /**
         * Determines if the card is usable (could be cast without target)
         *
         * @type {boolean}
         */
        this.usable = false;

        /**
         * Determines if the card is castable (could be casted on another player)
         *
         * @type {boolean}
         */
        this.castable = false;
    }
    
    
    /**
     * Called on dealing card in open way (such that everybody sees the content)
     *
     * @param player Player who dealt the card
     */
    onDealtOpen(player) {
        
    }

    /**
     * Called on dealing card in closed way (such that only himself can see the content)
     *
     * @param player Player who dealt the card
     */
    onDealtClose(player) {
        
    }
    
    /**
     * Called when a card is wielded (placed on the table)
     *
     * @param player Player who wielded the card
     */
    onWielded(player) { 
        
    }

    /**
     * Called when a card is unwielded (got off the table in some way)
     *
     * @param player
     */
    onUnwielded(player) {
        
    }
    
    /**
     * Called when a card is received from some source
     * Source could be another player, the deck, looting
     *
     * @param player Player
     * @param source Player|'deck'|'looting'
     */
    onReceived(player, source) {
        
    }
    
    /**
     * Called when a card is being disposed (removed from everywhere and placed into discarded deck)
     */
    onDisposed() {
        
    }
    
    /**
     * Returns the base attack modifier value for a card, when wielded, or used, whichever is applicable
     *
     * @returns {number}
     */
    getBaseAttack() {
        return 0;
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
