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
        return [this.pack, this.type, this.id].join('_');
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
     * Called when a card is received from some source
     * Source could be another player, the deck, looting
     *
     * @param player Player
     * @param source Player|'deck'|'looting'
     */
    onReceived(player, source) {
        
    }

    /**
     * Called when a card is cast on a player
     * 
     * @param source Player|'deck'
     * @param destination Player
     */ 
    onCast(source, destination) {
        
    }

    /**
     * Determines if a card could be used by a player
     * 
     * @param player
     * @returns {boolean}
     */
    canBeUsed(player) {
        if (!this.usable) {
            return false;
        }
    }

    /**
     * Called when a card is used by player
     * 
     * @param player
     */
    onUsed(player) {
        
    }

    /**
     * Determines if a card could be wielded by a player
     * 
     * @param player
     * @returns {boolean}
     */
    canBeWielded(player) {
        if (!this.wieldable) {
            return false;
        }
    }

    /**
     * Called when a card is wielded by player
     * 
     * @param player
     */
    onWielded(player) {
        
    }

    /**
     * Called whan a card is unwielded by player
     * 
     * @param player
     */
    onUnwielded(player) {
        
    }
    
    /**
     * Called when a card is being disposed (removed from everywhere and placed into discarded deck)
     */
    onDisposed() {
        
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
