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
     * @param player Player who dealt the card
     * @param table Table
     */
    onDealtOpen(player, table) {
        
    }

    /**
     * Called on dealing card in closed way (such that only himself can see the content)
     *
     * @param player Player who dealt the card
     * @param table Table
     */
    onDealtClose(player, table) {

    }
    
    /**
     * Called when a card is received from some source
     * Source could be another player, the deck, looting
     *
     * @param player Player
     * @param source Player|'deck'|'looting'
     * @param table Table
     */
    onReceived(player, source, table) {
        
    }

    /**
     * Called when a card is cast on a player
     * Returns true if card needs to be disposed
     * 
     * @param source Player|'deck'
     * @param destination Player
     * @param table Table
     * @returns boolean
     */ 
    onCast(source, destination, table) {
        return true;
    }

    /**
     * Determines if a card could be used by a player
     * 
     * @param player
     * @param table Table
     * @returns {boolean}
     */
    canBeUsed(player, table) {
        return this.usable
    }

    /**
     * Called when a card is used by player
     * 
     * @param player Player
     * @param table Table
     */
    onUsed(player, table) {
        
    }

    /**
     * Determines if a card could be wielded by a player
     * 
     * @param player Player
     * @param table Table
     * @returns {boolean}
     */
    canBeWielded(player, table) {
        return this.wieldable;
    }

    /**
     * Called when a card is wielded by player
     * 
     * @param player Player
     * @param table Table
     */
    onWielded(player, table) {
        
    }

    /**
     * Called whan a card is unwielded by player
     * 
     * @param player Player
     * @param table Table
     */
    onUnwielded(player, table) {
        
    }
    
    /**
     * Called when a card is being disposed (removed from everywhere and placed into discarded deck)
     * 
     * @param table Table
     */
    onDisposed(table) {
        
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
