/**
 * Created by ionagamed on 8/11/16.
 */

var Player = function () {
    /**
     * An array of cards which are in player's hand (not on the table)
     * 
     * @type [Card]
     */
    this.hand = [];
    
    /**
     * An array of cards which are currently wielded (on the table)
     * Cheats are applied by placing two cards in order: ... , cheat, stuff, ...
     * Supermunchkin and such are applied similarly: ... , supermunchkin, first class, second class, ...
     * 
     * @type [Card]
     */
    this.wielded = [];

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
};

var proto = Player.prototype;

/**
 * Called when a player receives a card from any source
 * 
 * @param card Card
 * @param source Player|'deck'|'looting'
 */
proto.onCardReceived = function (card, source) {
    
};

/**
 * Get base attack for player
 * 
 * @returns {number}
 */
proto.getAttack = function () {
    var ret = this.level;
    this.wielded.map(function (x) {
        ret += x.getBaseAttack();
    });
    return ret;
};