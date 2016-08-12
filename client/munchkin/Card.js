/**
 * Created by ionagamed on 8/11/16.
 */

/**
 * Represents a card (can be both door and treasure)
 * 
 * @param options Object
 */
var Card = function (options) {
    /**
     * Determines if the card is wieldable (could be placed on table)
     * 
     * @type {boolean}
     */
    this.wieldable = options.wieldable || false;

    /**
     * Determines if the card is usable (could be cast without target)
     * 
     * @type {boolean}
     */
    this.usable = options.usable || false;
    
    /**
     * Determines if the card is castable (could be casted on another player)
     * 
     * @type {boolean}
     */
    this.castable = options.castable || false;
};

var proto = Card.prototype;

/**
 * Called on dealing card in open way (such that everybody sees the content)
 *
 * @param player Player who dealt the card
 */
proto.onDealtOpen = function (player) {
    
};

/**
 * Called on dealing card in closed way (such that only himself can see the content)
 * 
 * @param player Player who dealt the card
 */
proto.onDealtClose = function (player) {
    
};

/**
 * Called when a card is wielded (placed on the table)
 * 
 * @param player Player who wielded the card
 */
proto.onWielded = function (player) {
    
};

/**
 * Called when a card is unwielded (got off the table in some way)
 * 
 * @param player
 */
proto.onUnwielded = function (player) {
    
};

/**
 * Called when a card is received from some source
 * Source could be another player, the deck, looting
 * 
 * @param player Player
 * @param source Player|'deck'|'looting'
 */
proto.onReceived = function (player, source) {
    
};

/**
 * Called when a card is being disposed (removed from everywhere and placed into discarded deck)
 */
proto.onDisposed = function () {

};

/**
 * Returns the base attack modifier value for a card, when wielded, or used, whichever is applicable
 * 
 * @returns {number}
 */
proto.getBaseAttack = function () {
    return 0;
};