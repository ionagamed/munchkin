/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/client";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Card = __webpack_require__(2);

	var _Player = __webpack_require__(3);

	/**
	 * Created by ionagamed on 8/11/16.
	 */

	$(function () {
	    document.ws = new WebSocket("ws://localhost:8081");
	    var game = new Phaser.Game('100', '100', Phaser.AUTO, '', {
	        preload: preload,
	        create: create,
	        update: update
	    });

	    function preload() {}

	    function create() {}

	    function update() {}
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Created by ionagamed on 8/11/16.
	 */

	/**
	 * Represents a card (can be both door and treasure)
	 */
	var Card = exports.Card = function () {
	  function Card() {
	    _classCallCheck(this, Card);

	    /**
	     * Determines if the card is wieldable (could be placed on table)
	     *
	     * @type {boolean}
	     */
	    var wieldable = false;

	    /**
	     * Determines if the card is usable (could be cast without target)
	     *
	     * @type {boolean}
	     */
	    var usable = false;

	    /**
	     * Determines if the card is castable (could be casted on another player)
	     *
	     * @type {boolean}
	     */
	    var castable = false;
	  }

	  /**
	   * Called on dealing card in open way (such that everybody sees the content)
	   *
	   * @param player Player who dealt the card
	   */


	  _createClass(Card, [{
	    key: "onDealtOpen",
	    value: function onDealtOpen(player) {}

	    /**
	     * Called on dealing card in closed way (such that only himself can see the content)
	     *
	     * @param player Player who dealt the card
	     */

	  }, {
	    key: "onDealtClose",
	    value: function onDealtClose(player) {}

	    /**
	     * Called when a card is wielded (placed on the table)
	     *
	     * @param player Player who wielded the card
	     */

	  }, {
	    key: "onWielded",
	    value: function onWielded(player) {}

	    /**
	     * Called when a card is unwielded (got off the table in some way)
	     *
	     * @param player
	     */

	  }, {
	    key: "onUnwielded",
	    value: function onUnwielded(player) {}

	    /**
	     * Called when a card is received from some source
	     * Source could be another player, the deck, looting
	     *
	     * @param player Player
	     * @param source Player|'deck'|'looting'
	     */

	  }, {
	    key: "onReceived",
	    value: function onReceived(player, source) {}

	    /**
	     * Called when a card is being disposed (removed from everywhere and placed into discarded deck)
	     */

	  }, {
	    key: "onDisposed",
	    value: function onDisposed() {}

	    /**
	     * Returns the base attack modifier value for a card, when wielded, or used, whichever is applicable
	     *
	     * @returns {number}
	     */

	  }, {
	    key: "getBaseAttack",
	    value: function getBaseAttack() {
	      return 0;
	    }
	  }]);

	  return Card;
	}();

	Card.cards = {};
	Card.byId = function (id) {
	  return Card.cards[id];
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Player = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by ionagamed on 8/11/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _Card = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Player = exports.Player = function () {
	  function Player() {
	    _classCallCheck(this, Player);

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


	  _createClass(Player, [{
	    key: 'onCardReceived',
	    value: function onCardReceived(card, source) {}

	    /**
	     * Get base attack for player
	     *
	     * @returns {number}
	     */

	  }, {
	    key: 'getAttack',
	    value: function getAttack() {
	      var ret = this.level;
	      this.wielded.map(function (x) {
	        ret += _Card.Card.byId(x).getBaseAttack();
	      });
	      return ret;
	    }
	  }]);

	  return Player;
	}();

/***/ }
/******/ ]);