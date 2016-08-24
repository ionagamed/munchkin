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

	var _Table = __webpack_require__(4);

	var _packs = __webpack_require__(5);

	var _packs2 = _interopRequireDefault(_packs);

	var _dice = __webpack_require__(8);

	var _dice2 = _interopRequireDefault(_dice);

	__webpack_require__(117);

	__webpack_require__(118);

	__webpack_require__(119);

	__webpack_require__(120);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	$(function () {
	    var game = new Phaser.Game('100', '100', Phaser.AUTO, '', {
	        preload: preload,
	        create: create,
	        update: update
	    });
	    var ccount = 14,
	        cards = [],
	        openChat,
	        closeChat;
	    var paper, keyboard, scale, down_lower, upper_lower;
	    var level, power, antipower, monster, cobble, grass, knight;
	    var buttonAttack, buttonSmivka;
	    var table = new _Table.Table();

	    function preload() {
	        for (var i in _packs2.default.pack1.doors) {
	            if (_packs2.default.pack1.doors.hasOwnProperty(i)) game.load.image('pack1_door_' + _packs2.default.pack1.doors[i], 'packs/pack1/img/doors-' + i + '.png');
	        }
	        for (var _i in _packs2.default.pack1.treasure) {
	            if (_packs2.default.pack1.treasure.hasOwnProperty(_i)) game.load.image('pack1_treasure_' + _packs2.default.pack1.treasure[_i], 'packs/pack1/img/treasure-' + _i + '.png');
	        }
	        load();
	    }

	    function create() {
	        create_lower();
	        create_info();
	        create_cards();
	        create_chat();
	        create_buttons();
	    }

	    function update() {}
	}); /**
	     * Created by ionagamed on 8/11/16.
	     */

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

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


	  _createClass(Card, [{
	    key: 'onDealtOpen',


	    /**
	     * Called on dealing card in open way (such that everybody sees the content)
	     *
	     * @param {Player} player who dealt the card
	     * @param {Table} table
	     */
	    value: function onDealtOpen(player, table) {}

	    /**
	     * Called on dealing card in closed way (such that only himself can see the content)
	     *
	     * @param {Player} player who dealt the card
	     * @param {Table} table
	     */

	  }, {
	    key: 'onDealtClose',
	    value: function onDealtClose(player, table) {}

	    /**
	     * Called when a card is received from some source
	     * Source could be another player, the deck, looting
	     *
	     * @param {Player} player
	     * @param {Player|'deck'|'looting'} source 
	     * @param {Table} table
	     */

	  }, {
	    key: 'onReceived',
	    value: function onReceived(player, source, table) {}

	    /**
	     * Called when a card is cast on a player
	     * Returns true if card needs to be disposed
	     * 
	     * @param {Player|'deck'} source 
	     * @param {Player} destination
	     * @param {Table} table 
	     * @returns boolean
	     */

	  }, {
	    key: 'onCast',
	    value: function onCast(source, destination, table) {
	      return true;
	    }

	    /**
	     * Determines if a card could be used by a player
	     * 
	     * @param {Player} player
	     * @param {Table} table 
	     * @returns {boolean}
	     */

	  }, {
	    key: 'canBeUsed',
	    value: function canBeUsed(player, table) {
	      return this.usable;
	    }

	    /**
	     * Called when a card is used by player
	     * 
	     * @param {Player} player
	     * @param {Table} table
	     */

	  }, {
	    key: 'onUsed',
	    value: function onUsed(player, table) {}

	    /**
	     * Determines if a card could be wielded by a player
	     * 
	     * @param {Player} player
	     * @param {Table} table 
	     * @returns {boolean}
	     */

	  }, {
	    key: 'canBeWielded',
	    value: function canBeWielded(player, table) {
	      return this.wieldable;
	    }

	    /**
	     * Called when a card is wielded by player
	     * 
	     * @param {Player} player 
	     * @param {Table} table
	     */

	  }, {
	    key: 'onWielded',
	    value: function onWielded(player, table) {}

	    /**
	     * Called whan a card is unwielded by player
	     * 
	     * @param {Player} player 
	     * @param {Table} table 
	     */

	  }, {
	    key: 'onUnwielded',
	    value: function onUnwielded(player, table) {}

	    /**
	     * Determines if a card can be held wielded on table
	     * 
	     * @see Player.updateConstraints()
	     * @param {Player} player
	     * @param {Table} table
	     */

	  }, {
	    key: 'canBeHeld',
	    value: function canBeHeld(player, table) {
	      return this.canBeWielded(player, table);
	    }

	    /**
	     * Called when a card is being discarded (removed from everywhere and placed into discarded deck)
	     * 
	     * @param {Table} table 
	     */

	  }, {
	    key: 'onDiscarded',
	    value: function onDiscarded(table) {}

	    /**
	     * When the fight begins
	     * 
	     * @param {Fight} fight
	     * @param {Table} table
	     */

	  }, {
	    key: 'onFightBegan',
	    value: function onFightBegan(fight, table) {}

	    /**
	     * When the fight ends
	     * 
	     * @param {Fight} fight
	     * @param {Table} table
	     */

	  }, {
	    key: 'onFightEnded',
	    value: function onFightEnded(fight, table) {}

	    /**
	     * Get attack for a creature
	     * Could be either Player or monster card id
	     * 
	     * @param {Player|string} x
	     */

	  }, {
	    key: 'getAttackFor',
	    value: function getAttackFor(x) {
	      return 0;
	    }
	  }, {
	    key: 'image',
	    get: function get() {
	      return [this.pack, this.kind, this.id].join('_');
	    }
	  }]);

	  return Card;
	}();

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
	    function Player(name) {
	        _classCallCheck(this, Player);

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
	        this.name = name;

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

	        /**
	         * Player's death status
	         *
	         * @type bool
	         */
	        this.dead = true;
	    }

	    /**
	     * Called when a player receives a card from any source
	     *
	     * @param card string
	     * @param source Player|'deck'|'looting'
	     */


	    _createClass(Player, [{
	        key: 'onCardReceived',
	        value: function onCardReceived(card, source) {}

	        /**
	         * Wield a card
	         * Returns true on success
	         * 
	         * @param {string} card 
	         * @param {Table} table 
	         * 
	         * @returns boolean
	         */

	    }, {
	        key: 'wield',
	        value: function wield(card, table) {
	            var cheat = this.wielded.indexOf('cheat');
	            if (_Card.Card.byId(card).canBeWielded(this, table) || cheat < this.wielded.length - 1 && this.wielded[cheat + 1] == 'cheat_free_helper') {
	                if (cheat >= 0 && cheat < this.wielded.length - 1 && this.wielded[cheat + 1] == 'cheat_free_helper') {
	                    this.wielded.splice(cheat + 1, 1, card);
	                } else {
	                    this.wielded.push(card);
	                }
	                _Card.Card.byId(card).onWielded(this, table);
	                this.updateConstraints(table);
	                return true;
	            }
	        }

	        /**
	         * Unwield a card
	         * 
	         * @param {string} card 
	         * @param {Table} table 
	         */

	    }, {
	        key: 'unwield',
	        value: function unwield(card, table) {
	            var idx = this.wielded.indexOf(card);
	            if (idx > 0) {
	                if (_Card.Card.byId(this.wielded[idx - 1]).type == 'cheat') {
	                    idx--;
	                    this.wielded.splice(idx, 1);
	                    _Card.Card.byId('cheat').onUnwielded(this, table);
	                    table.discard('cheat');
	                }
	            }
	            this.wielded.splice(idx, 1);
	            _Card.Card.byId(card).onUnwielded(this, table);
	            this.updateConstraints(table);
	        }

	        /**
	         * Get base attack for player
	         *
	         * @returns {number}
	         */

	    }, {
	        key: 'getAttack',
	        value: function getAttack() {
	            var _this = this;

	            var ret = this.level;
	            this.wielded.map(function (x) {
	                var c = _Card.Card.byId(x);
	                if (c.getAttackFor) ret += c.getAttackFor(_this);
	            });
	            return ret;
	        }

	        /**
	         * Checks that player's current build is valid, and, if not, makes it valid
	         * 
	         * @param table
	         */

	    }, {
	        key: 'updateConstraints',
	        value: function updateConstraints(table) {
	            console.log(this.wielded);
	            for (var i in this.wielded) {
	                if (this.wielded.hasOwnProperty(i)) {
	                    var id = this.wielded[i];
	                    if (!_Card.Card.byId(id).canBeHeld(this, table) && !(i > 0 && _Card.Card.byId(this.wielded[i - 1]).type == 'cheat')) {
	                        this.unwield(id, table);
	                        if (_Card.Card.byId(id).kind == 'treasure') {
	                            this.belt.push(id);
	                        } else {
	                            table.discard(id);
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

	    }, {
	        key: 'hasCardWielded',
	        value: function hasCardWielded(c) {
	            var ret = false;
	            this.wielded.map(function (x) {
	                if (_Card.Card.byId(x).id == c) {
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

	    }, {
	        key: 'cardsOfTypeWielded',
	        value: function cardsOfTypeWielded(t) {
	            return this.wielded.filter(function (x) {
	                return _Card.Card.byId(x).type == t;
	            }).length;
	        }

	        /**
	         * Determines if the player has the class advantages
	         * 
	         * @param c
	         */

	    }, {
	        key: 'hasClassAdvantages',
	        value: function hasClassAdvantages(c) {
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

	    }, {
	        key: 'hasClassDisadvantages',
	        value: function hasClassDisadvantages(c) {
	            var has = this.hasCardWielded(c);
	            var sm = this.hasCardWielded('super_munchkin');
	            var classes = this.wielded.filter(function (x) {
	                return _Card.Card.byId(x).type == 'class';
	            }).length;
	            return has && !(sm && classes == 1);
	        }

	        /**
	         * Determines if the player has the race advantages
	         *
	         * @param r
	         */

	    }, {
	        key: 'hasRaceAdvantages',
	        value: function hasRaceAdvantages(r) {
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

	    }, {
	        key: 'hasRaceDisadvantages',
	        value: function hasRaceDisadvantages(r) {
	            var has = this.hasCardWielded(r);
	            var sm = this.hasCardWielded('half-breed');
	            var races = this.wielded.filter(function (x) {
	                return _Card.Card.byId(x).type == 'race';
	            }).length;
	            return has && !(sm && races == 1);
	        }

	        /**
	         * Get the amount of non-free hands
	         * 
	         * @returns {number}
	         */

	    }, {
	        key: 'getBusyHandCount',
	        value: function getBusyHandCount() {
	            var types = this.wielded.map(function (x) {
	                return _Card.Card.byId(x).type;
	            });
	            return types.filter(function (x) {
	                return x == '1-handed';
	            }).length + types.filter(function (x) {
	                return x == '2-handed';
	            }).length * 2;
	        }

	        /**
	         * Makes the player DEEEEEEEAD
	         * 
	         * @param {Table} table
	         */

	    }, {
	        key: 'die',
	        value: function die(table) {
	            var _this2 = this;

	            this.wielded.map(function (x) {
	                if (_Card.Card.byId(x).type != 'race' && _Card.Card.byId(x).type != 'class' && _Card.Card.byId(x).type != 'super_munchkin' && _Card.Card.byId(x).type != 'half-breed') {
	                    _this2.unwield(x, table);
	                    table.discard(x);
	                }
	            });
	            this.hand.map(table.discard);
	            this.hand = [];
	            this.belt.map(table.discard);
	            this.belt = [];
	        }

	        /**
	         * Decrease player's level by specific amount
	         * 
	         * @param {number} amount
	         */

	    }, {
	        key: 'decreaseLevel',
	        value: function decreaseLevel(amount) {
	            this.level = Math.max(this.level - amount, 1);
	        }
	    }]);

	    return Player;
	}();

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Table = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by tsmish on 13/08/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


	var _Card = __webpack_require__(2);

	var _Player = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Table = exports.Table = function () {
	  function Table() {
	    _classCallCheck(this, Table);

	    /**
	     * An array of players sitting on the table
	     *
	     * @type {[Player]}
	     */
	    this.players = [];

	    /**
	     * An array of discarded doors
	     *
	     * @type {[string]}
	     */
	    this.discardedDoors = [];

	    /**
	     * An array of discarded treasure cards
	     *
	     * @type {[string]}
	     */
	    this.discardedTreasure = [];

	    /**
	     * Determines if there is an active game playing
	     *
	     * @type {bool}
	     */

	    this.playing = false;

	    /**
	     * Determines whose is the current turn
	     * idx in {players}
	     *
	     * @type {string}
	     */
	    this.turn = 0;

	    /**
	     * Currently going fight
	     *
	     * @type {Fight|null}
	     */
	    this.fight = null;

	    /**
	     * begin -> open -> hand -> closed -> drop
	     * 
	     * @type {string}
	     */
	    this.phase = 'begin';
	  }

	  /**
	   * Move the card to the discard deck
	   * 
	   * @param {string} card
	   */


	  _createClass(Table, [{
	    key: 'discard',
	    value: function discard(card) {
	      if (_Card.Card.byId(card).kind == 'door') {
	        this.discardedDoors.push(card);
	      } else if (_Card.Card.byId(card).kind == 'treasure') {
	        this.discardedTreasure.push(card);
	      }
	    }

	    /**
	     * Return the player whose turn it is right now
	     * 
	     * @returns {Player}
	     */

	  }, {
	    key: 'currentPlayer',
	    value: function currentPlayer() {
	      return this.players[this.turn];
	    }

	    /**
	     * Modifies the turn member so it points to the next player
	     */

	  }, {
	    key: 'nextTurn',
	    value: function nextTurn() {
	      this.turn = (this.turn + 1) % this.players.length;
	    }
	  }]);

	  return Table;
	}();

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Created by ionagamed on 8/13/16.
	 */

	var packs = {
	    pack1: {
	        doors: ['gelatinous_octahedron', //
	        'ghoulfiends', //do not use item
	        'harpies', //
	        'hippogriff', //*
	        'insurance_salesman', //*
	        '3872_orcs', //
	        'amazon', // TODO: remake amazon
	        'bigfoot', //
	        'bullrog', //
	        'crabs', //
	        'curse_lose_small_item_1', //*
	        'curse_lose_small_item_2', //*
	        'curse_lose_armor', //
	        'curse_lose_footgear', //
	        'curse_lose_headgear', //
	        'wizard_1', //*
	        'curse_change_class', //
	        'curse_change_race', //
	        'curse_change_sex', 'curse_chicken', 'halfling_1', 'halfling_2', 'thief_1', 'thief_2', 'thief_3', 'half-breed_2', 'help_me_out_here', 'illusion', 'mate', 'out_to_lunch', 'squidzilla', //
	        'stoned_golem', //*
	        'tongue_demon', //*
	        'undead_horse', //
	        'horror', 'ancient', 'baby', 'enraged', 'humongous', 'intelligent', 'maul_rat', //
	        'mr_bones', //
	        'net_troll', 'pit_bull', 'platycore', 'cleric_1', 'cleric_2', 'cleric_3', 'dwarf_1', 'dwarf_2', 'plutonium_dragon', //
	        'potted_plant', //
	        'pukachu', //
	        'shrieking_geek', //
	        'snails_on_speed', //*
	        'dwarf_3', 'elf_1', 'elf_2', 'elf_3', 'halfling_3', 'king_tut', //looseall item
	        'lame_goblin', //
	        'large_angry_chicken', 'lawyers', //*
	        'leperchaun', //*
	        'drooling_slime', //
	        'face_sucker', //
	        'floating_nose', 'flying_frogs', //
	        'gazebo', 'curse_lose_two_cards', 'curse_lose_class', 'curse_lose_race', 'curse_malign_mirror', 'truly_obnoxious_curse', 'curse_duck_of_doom', //
	        'curse_income_tax', 'curse_lose_big_item', 'curse_lose_level_1', //
	        'curse_lose_level_2', //
	        'warrior_1', 'warrior_2', 'warrior_3', 'wizard_2', 'wizard_3', 'super_munchkin_1', 'super_munchkin_2', 'wandering_monster_1', 'wandering_monster_2', 'wandering_monster_3', 'wannabe_vampire', 'wight_brothers', //
	        'cheat', 'divine_intervention', 'half-breed_2'],
	        treasure: ['magic_lamp', 'pollymorph_potion', 'transferral_potion', 'wand_of_dowsing', 'wishing_ring', 'spiky_knees', 'staff_of_napalm', 'stepladder', 'swiss_army_polearm', 'doppleganger', 'flaming_armor', 'gentlemans_club', 'hammer_of_kneecapping', 'helm of courage', 'horny_helmet', 'bad-ass_bandanna', 'boots_of_butt-kicking', 'bow_with_ribbons', 'broad_sword', 'buckler_of_swashing', 'cotion_of_ponfusion', 'acid_potion', 'flaming_poison_potion', 'freezing_explosive_potion', 'magic_missile', 'pantyhose_of_giant_strength', 'pointy_hat_of_power', 'rapier_of_unfairness', 'rat_on_a_stick', 'really_impressive_title', '1000_gold', 'boil_an_anthill', 'bribe_gm_with_food', 'convenient_addition_error', 'invoke_obscure_rules', 'wishing_ring', 'boots_of_running_really_fast', 'hireling', 'hoard', 'kneepads_of_allure', 'flask_of_glue', 'friendship_potion', 'instant_wall', 'invisibility_potion', 'loaded_die_1', 'huge_rock', 'leather_armor', 'sandwich', 'mace_of_sharpiness', 'mithril_armor', 'chainsaw', 'cheese_grater_of_piece', 'cloak_of_obscurity', 'dagger_of_treachery', 'eleven-foot_pole', 'nasty-tasting_sports_drink', 'potion_of_halitosis', 'potion_of_idiotic_bravery', 'pretty_balloons', 'sleep_potion', 'shield_of_ubiquity', 'short_wide_armor', 'singing_and_dancing_sword', 'slimy_armor', 'sneaky_bastard_sword', 'kill_the_hireling', 'mutilate_the_bodies', 'potion_of_general_studliness', 'whine_at_the_gm', 'yuppie_water', 'go_up_a_level', 'steal_a_level', 'tuba_of_charm', 'sandals_of_protection', 'q-dice']
	    }
	};
	exports.default = packs;
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {

	    for (var _iterator = packs.pack1.doors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var i = _step.value;

	        // TODO: bad solution
	        if (i.substring(i.length - 2, i.length - 1) == '_') i = i.substring(0, i.length - 2);
	        try {
	            __webpack_require__(6)("./" + i);
	        } catch (e) {}
	    }
	} catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	} finally {
	    try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	        }
	    } finally {
	        if (_didIteratorError) {
	            throw _iteratorError;
	        }
	    }
	}

	var _iteratorNormalCompletion2 = true;
	var _didIteratorError2 = false;
	var _iteratorError2 = undefined;

	try {
	    for (var _iterator2 = packs.pack1.treasure[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	        var _i = _step2.value;

	        // TODO: bad solution
	        if (_i.substring(_i.length - 2, _i.length - 1) == '_') _i = _i.substring(0, _i.length - 2);
	        try {
	            __webpack_require__(59)("./" + _i);
	        } catch (e) {}
	    }
	} catch (err) {
	    _didIteratorError2 = true;
	    _iteratorError2 = err;
	} finally {
	    try {
	        if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	        }
	    } finally {
	        if (_didIteratorError2) {
	            throw _iteratorError2;
	        }
	    }
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./3872_orcs": 7,
		"./3872_orcs.js": 7,
		"./amazon": 11,
		"./amazon.js": 11,
		"./ancient": 12,
		"./ancient.js": 12,
		"./baby": 14,
		"./baby.js": 14,
		"./bigfoot": 15,
		"./bigfoot.js": 15,
		"./bullrog": 16,
		"./bullrog.js": 16,
		"./cheat": 17,
		"./cheat.js": 17,
		"./crabs": 18,
		"./crabs.js": 18,
		"./curse_change_class": 19,
		"./curse_change_class.js": 19,
		"./curse_change_race": 20,
		"./curse_change_race.js": 20,
		"./curse_change_sex": 21,
		"./curse_change_sex.js": 21,
		"./curse_chicken": 22,
		"./curse_chicken.js": 22,
		"./curse_duck_of_doom": 23,
		"./curse_duck_of_doom.js": 23,
		"./curse_lose_armor": 25,
		"./curse_lose_armor.js": 25,
		"./curse_lose_footgear": 26,
		"./curse_lose_footgear.js": 26,
		"./curse_lose_headgear": 27,
		"./curse_lose_headgear.js": 27,
		"./curse_lose_level": 28,
		"./curse_lose_level.js": 28,
		"./curse_lose_small_item": 29,
		"./curse_lose_small_item.js": 29,
		"./divine_intervention": 30,
		"./divine_intervention.js": 30,
		"./drooling_slime": 31,
		"./drooling_slime.js": 31,
		"./enraged": 32,
		"./enraged.js": 32,
		"./face_sucker": 33,
		"./face_sucker.js": 33,
		"./flying_frogs": 34,
		"./flying_frogs.js": 34,
		"./gelatinous_octahedron": 35,
		"./gelatinous_octahedron.js": 35,
		"./ghoulfiends": 36,
		"./ghoulfiends.js": 36,
		"./half-breed": 37,
		"./half-breed.js": 37,
		"./harpies": 38,
		"./harpies.js": 38,
		"./horror": 39,
		"./horror.js": 39,
		"./humongous": 40,
		"./humongous.js": 40,
		"./intelligent": 41,
		"./intelligent.js": 41,
		"./king_tut": 42,
		"./king_tut.js": 42,
		"./lame_goblin": 43,
		"./lame_goblin.js": 43,
		"./large_angry_chicken": 44,
		"./large_angry_chicken.js": 44,
		"./maul_rat": 45,
		"./maul_rat.js": 45,
		"./mr_bones": 46,
		"./mr_bones.js": 46,
		"./plutonium_dragon": 47,
		"./plutonium_dragon.js": 47,
		"./potted_plant": 48,
		"./potted_plant.js": 48,
		"./pukachu": 49,
		"./pukachu.js": 49,
		"./shrieking_geek": 50,
		"./shrieking_geek.js": 50,
		"./squidzilla": 51,
		"./squidzilla.js": 51,
		"./super_munchkin": 53,
		"./super_munchkin.js": 53,
		"./undead_horse": 54,
		"./undead_horse.js": 54,
		"./warrior": 55,
		"./warrior.js": 55,
		"./wight_brothers": 57,
		"./wight_brothers.js": 57,
		"./wizard": 58,
		"./wizard.js": 58
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 6;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _dice = __webpack_require__(8);

	var _dice2 = _interopRequireDefault(_dice);

	var _Monster2 = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var id = '3872_orcs';

	var a3872_orcs = function (_Monster) {
	    _inherits(a3872_orcs, _Monster);

	    function a3872_orcs() {
	        _classCallCheck(this, a3872_orcs);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(a3872_orcs).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'monster';
	        _this.treasure = 3;
	        return _this;
	    }

	    _createClass(a3872_orcs, [{
	        key: 'badThing',
	        value: function badThing(player, table) {
	            var d = (0, _dice2.default)();
	            if (d <= 2) {
	                player.die(table);
	            } else {
	                player.decreaseLevel(d);
	            }
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(players) {
	            var isDwarf = false;
	            players.map(function (x) {
	                if (x.hasRaceDisadvantages('dwarf')) isDwarf = true;
	            });
	            if (isDwarf) return 16;
	            return 10;
	        }
	    }]);

	    return a3872_orcs;
	}(_Monster2.Monster);

	_Card.Card.cards[id] = new a3872_orcs();

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (sides) {
	    sides = sides || 6;
	    // TODO: add PRNG with bias to numbers, which haven't been dropped in a while
	    return Math.floor(Math.random() * sides + 1);
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Monster = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card2 = __webpack_require__(2);

	var _Fight = __webpack_require__(10);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/20/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var Monster = exports.Monster = function (_Card) {
	    _inherits(Monster, _Card);

	    // TODO: add common monster code

	    function Monster() {
	        _classCallCheck(this, Monster);

	        /**
	         * Levels given to the player if he won
	         * 
	         * @type {number}
	         */
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Monster).call(this));

	        _this.levels = 1;

	        /**
	         * How much treasure is given upon death
	         * 
	         * @type {number}
	         */
	        _this.treasure = 0;

	        _this.usable = true;
	        return _this;
	    }

	    _createClass(Monster, [{
	        key: 'canBeUsed',
	        value: function canBeUsed(player, table) {
	            return table.currentPlayer().name == player.name && table.phase == 'open' && table.fight == null;
	        }
	    }, {
	        key: 'onUsed',
	        value: function onUsed(player, table) {
	            table.fight = new _Fight.Fight();
	            table.fight.players.push({
	                player: player,
	                state: 'fighting',
	                modifiers: []
	            });
	            table.fight.monsters.push({
	                monster: this.id,
	                modifiers: []
	            });
	        }

	        /**
	         * Called when a player tries to escape from monster
	         * 
	         * @param {Player} player
	         * @param {number} dice
	         * @param {Table} table
	         * @returns {boolean}
	         */

	    }, {
	        key: 'onEscape',
	        value: function onEscape(player, dice, table) {
	            if (dice >= 5) {
	                return true;
	            } else {
	                this.badThing(player, table);
	            }
	        }

	        /**
	         * Thing, which is done when the escape is unsuccessful
	         * 
	         * @param {Player} player
	         * @param {Table} table
	         */

	    }, {
	        key: 'badThing',
	        value: function badThing(player, table) {}
	    }, {
	        key: 'onFightEnded',
	        value: function onFightEnded(fight, table) {
	            var _this2 = this;

	            fight.players.map(function (x) {
	                if (x.state == 'success') {
	                    x.player.level += _this2.levels;
	                    //TODO: add treasure
	                }
	            });
	        }

	        /**
	         * Redefines the card attack for an array of players
	         * 
	         * @param {[Player]} players
	         */

	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(players) {}

	        /**
	         * The treasure count for fight
	         *
	         * @param {Fight} fight
	         * @param {Table} table
	         */

	    }, {
	        key: 'getTreasure',
	        value: function getTreasure(fight, table) {
	            return this.treasure;
	        }

	        /**
	         * The levels given for all who are eligible
	         * 
	         * @param {Fight} fight
	         * @param {Table} table
	         */

	    }, {
	        key: 'getLevels',
	        value: function getLevels(fight, table) {
	            return this.levels;
	        }
	    }]);

	    return Monster;
	}(_Card2.Card);

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Fight = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by ionagamed on 8/13/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _Card = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Fight = exports.Fight = function () {
	    function Fight() {
	        _classCallCheck(this, Fight);

	        /**
	         * The player side of a fight
	         *
	         * Schema: [{
	         *     player: {Player},
	         *     state: {'fighting'|'success'|'escape'|'monster'},
	         *     modifiers: {[string]}
	         * }]
	         *
	         * States:
	         *   * 'fighting'
	         *   * 'success' - monster is beaten
	         *   * 'escape' - successful escape
	         *   * 'monster' - unsuccessful escape
	         * 
	         * @type [Object]
	         */
	        this.players = [];

	        /**
	         * The player, who started the fight
	         * 
	         * @type {Player}
	         */
	        this.mainPlayer = null;

	        /**
	         * The monster side of a fight
	         * 
	         * @type [Object]
	         */
	        this.monsters = [];
	    }

	    /**
	     * Get overall attack of all players
	     * 
	     * @returns {number}
	     */


	    _createClass(Fight, [{
	        key: 'getPlayersAttack',
	        value: function getPlayersAttack() {
	            var ret = 0;
	            this.players.map(function (x) {
	                ret += x.player.getAttack();
	                x.modifiers.map(function (y) {
	                    ret += _Card.Card.byId(y).getModFor(x.player);
	                });
	            });
	            return ret;
	        }

	        /**
	         * Get overall attack of all monsters
	         * 
	         * @returns {number}
	         */

	    }, {
	        key: 'getMonstersAttack',
	        value: function getMonstersAttack() {
	            var _this = this;

	            var ret = 0;
	            this.monsters.map(function (x) {
	                ret += _Card.Card.byId(x.monster).getAttackFor(_this.players);
	                x.modifiers.map(function (y) {
	                    ret += _Card.Card.byId(y).getModFor(x.monster);
	                });
	            });
	            return ret;
	        }

	        /**
	         * When the fight began
	         * 
	         * @param {Table} table
	         */

	    }, {
	        key: 'onBegan',
	        value: function onBegan(table) {
	            var _this2 = this;

	            this.players.map(function (x) {
	                x.player.wielded.map(function (x) {
	                    var c = _Card.Card.byId(x);
	                    c.onFightBegan(_this2, table);
	                });
	            });
	        }

	        /**
	         * When the fight ends
	         * 
	         * @param {Table} table
	         */

	    }, {
	        key: 'onEnded',
	        value: function onEnded(table) {
	            var _this3 = this;

	            this.players.map(function (x) {
	                x.player.wielded.map(function (x) {
	                    var c = _Card.Card.byId(x);
	                    c.onFightEnded(_this3, table);
	                });
	            });
	            this.players.map(function (x) {
	                x.modifiers.map(function (y) {
	                    table.discard(y);
	                });
	            });
	            this.monsters.map(function (x) {
	                x.modifiers.map(function (y) {
	                    table.discard(y);
	                });
	            });
	        }

	        /**
	         * Get the side, which will win in current conditions
	         * 
	         * @returns 'players'|'monsters'
	         */

	    }, {
	        key: 'getWinningSide',
	        value: function getWinningSide() {
	            return this.getPlayersAttack() > this.getMonstersAttack() ? 'players' : 'monsters';
	        }
	    }]);

	    return Fight;
	}();

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Monster2 = __webpack_require__(9);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var id = 'amazon';

	var amazon = function (_Monster) {
	    _inherits(amazon, _Monster);

	    function amazon() {
	        _classCallCheck(this, amazon);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(amazon).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'monster';
	        _this.treasure = 2;
	        return _this;
	    }

	    _createClass(amazon, [{
	        key: 'onFightBegan',
	        value: function onFightBegan(fight, table) {
	            // TODO: handle new females
	            if (fight.players.filter(function (x) {
	                return x.player.sex == 'female';
	            }).length > 0) {
	                // TODO: give 1 treasure
	                fight.onEnded(table);
	            }
	        }
	    }, {
	        key: 'badThing',
	        value: function badThing(player, table) {
	            var hadClass = false;
	            player.wielded.map(function (x) {
	                if (_Card.Card.byId(x).type == 'class') {
	                    hadClass = true;
	                    player.unwield(x, table);
	                }
	            });
	            if (!hadClass) {
	                player.decreaseLevel(3);
	            }
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(players) {
	            return 8;
	        }
	    }]);

	    return amazon;
	}(_Monster2.Monster);

	_Card.Card.cards[id] = new amazon();

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _MonsterModifier2 = __webpack_require__(13);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/23/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'ancient';

	var _ = function (_MonsterModifier) {
	    _inherits(_, _MonsterModifier);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'monster_modifier';
	        _this.castable = true;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'getModFor',
	        value: function getModFor(x) {
	            return 10;
	        }
	    }, {
	        key: 'getTreasureFor',
	        value: function getTreasureFor(x) {
	            return 2;
	        }
	    }]);

	    return _;
	}(_MonsterModifier2.MonsterModifier);

	_Card.Card.cards[id] = new _();

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.MonsterModifier = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Player = __webpack_require__(3);

	var _Card2 = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/23/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var MonsterModifier = exports.MonsterModifier = function (_Card) {
	    _inherits(MonsterModifier, _Card);

	    function MonsterModifier() {
	        _classCallCheck(this, MonsterModifier);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(MonsterModifier).apply(this, arguments));
	    }

	    _createClass(MonsterModifier, [{
	        key: 'canBeCast',
	        value: function canBeCast(source, dest, table) {
	            return dest instanceof String && table.fight != null;
	        }
	    }, {
	        key: 'onCast',
	        value: function onCast(source, dest, table) {
	            var _this2 = this;

	            table.fight.monsters.map(function (x) {
	                if (x.monster == dest) {
	                    x.modifiers.push(_this2.id);
	                }
	            });
	        }

	        /**
	         * Returns the additional treasure
	         * 
	         * @param x
	         * @returns {number}
	         */

	    }, {
	        key: 'getTreasureFor',
	        value: function getTreasureFor(x) {}
	    }]);

	    return MonsterModifier;
	}(_Card2.Card);

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _MonsterModifier2 = __webpack_require__(13);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/23/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'baby';

	var _ = function (_MonsterModifier) {
	    _inherits(_, _MonsterModifier);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'monster_modifier';
	        _this.castable = true;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'getModFor',
	        value: function getModFor(x) {
	            return -5;
	        }
	    }, {
	        key: 'getTreasureFor',
	        value: function getTreasureFor(x) {
	            return -1;
	        }
	    }]);

	    return _;
	}(_MonsterModifier2.MonsterModifier);

	_Card.Card.cards[id] = new _();

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Monster2 = __webpack_require__(9);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var id = 'bigfoot';

	var bigfoot = function (_Monster) {
	    _inherits(bigfoot, _Monster);

	    function bigfoot() {
	        _classCallCheck(this, bigfoot);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(bigfoot).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'monster';
	        _this.treasure = 3;
	        return _this;
	    }

	    _createClass(bigfoot, [{
	        key: 'badThing',
	        value: function badThing(player, table) {
	            player.wielded.map(function (x) {
	                if (_Card.Card.byId(x).type == 'headgear') player.unwield(x, table);
	            });
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(players) {
	            var level = 12;
	            players.map(function (x) {
	                if (x.hasRaceDisadvantages('halfling') || x.hasRaceDisadvantages('dwarf')) level = 15;
	            });
	            return level;
	        }
	    }]);

	    return bigfoot;
	}(_Monster2.Monster);

	_Card.Card.cards[id] = new bigfoot();

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Card2 = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var id = 'bullrog';

	var bullrog = function (_Card) {
	    _inherits(bullrog, _Card);

	    function bullrog() {
	        _classCallCheck(this, bullrog);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(bullrog).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'monster';
	        _this.levels = 2;
	        _this.treasure = 5;
	        return _this;
	    }

	    _createClass(bullrog, [{
	        key: 'onEscape',
	        value: function onEscape(player, dice, table) {
	            if (player.level <= 4) return true;
	            return _get(Object.getPrototypeOf(bullrog.prototype), 'onEscape', this).call(this, player, dice, table);
	        }
	    }, {
	        key: 'badThing',
	        value: function badThing(player, table) {
	            player.die(table);
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(players) {
	            return 18;
	        }
	    }]);

	    return bullrog;
	}(_Card2.Card);

	_Card2.Card.cards[id] = new bullrog();

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card3 = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/23/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'cheat';

	var _ = function (_Card) {
	    _inherits(_, _Card);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'cheat';
	        _this.wieldable = true;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'onWielded',
	        value: function onWielded(player, table) {
	            var idx = player.wielded.indexOf('cheat');
	            player.wielded.splice(idx + 1, 0, 'cheat_free_helper');
	        }
	    }]);

	    return _;
	}(_Card3.Card);

	var __ = function (_Card2) {
	    _inherits(__, _Card2);

	    function __() {
	        _classCallCheck(this, __);

	        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(__).call(this));

	        _this2.id = 'cheat_free_helper';
	        _this2.pack = 'pack1';
	        _this2.kind = 'door';
	        _this2.type = 'cheat_free_helper';
	        return _this2;
	    }

	    _createClass(__, [{
	        key: 'canBeHeld',
	        value: function canBeHeld(player, table) {
	            return true;
	        }
	    }]);

	    return __;
	}(_Card3.Card);

	_Card3.Card.cards[id] = new _();
	_Card3.Card.cards['cheat_free_helper'] = new __();

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card2 = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var id = 'crabs';

	var crabs = function (_Card) {
	    _inherits(crabs, _Card);

	    function crabs() {
	        _classCallCheck(this, crabs);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(crabs).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'monster';
	        _this.treasure = 1;
	        return _this;
	    }

	    _createClass(crabs, [{
	        key: 'onEscape',
	        value: function onEscape(player, dice, table) {
	            player.wielded.map(function (x) {
	                if (_Card2.Card.byId(x).type == 'footgear' || _Card2.Card.byId(x).type == 'armor' || _Card2.Card.byId(x).type == 'knees') player.unwield(x, table);
	            });
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(players) {
	            return 1;
	        }
	    }]);

	    return crabs;
	}(_Card2.Card);

	_Card2.Card.cards[id] = new crabs();

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card2 = __webpack_require__(2);

	var _Player = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var id = 'curse_change_class';

	var curse_change_class = function (_Card) {
	    _inherits(curse_change_class, _Card);

	    function curse_change_class() {
	        _classCallCheck(this, curse_change_class);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(curse_change_class).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'curse';
	        _this.castable = true;
	        return _this;
	    }

	    _createClass(curse_change_class, [{
	        key: 'canBeCast',
	        value: function canBeCast(source, dest, table) {
	            return dest instanceof _Player.Player;
	        }
	    }, {
	        key: 'onCast',
	        value: function onCast(source, dest, table) {
	            var hasCl = false;
	            player.wielded.map(function (x) {
	                if (_Card2.Card.byId(x).type == 'class') {
	                    player.unwield(x, table);
	                    hasCl = true;
	                }
	            });
	            if (hasCl) {
	                var _iteratorNormalCompletion = true;
	                var _didIteratorError = false;
	                var _iteratorError = undefined;

	                try {
	                    for (var _iterator = [].concat(discardedDoors).reverse()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                        var i = _step.value;

	                        if (_Card2.Card.byId(x).type == 'class') wield(_Card2.Card.byId(x), table);
	                        break;
	                    }
	                } catch (err) {
	                    _didIteratorError = true;
	                    _iteratorError = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion && _iterator.return) {
	                            _iterator.return();
	                        }
	                    } finally {
	                        if (_didIteratorError) {
	                            throw _iteratorError;
	                        }
	                    }
	                }
	            }
	        }
	    }]);

	    return curse_change_class;
	}(_Card2.Card);

	_Card2.Card.cards[id] = new curse_change_class();

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card2 = __webpack_require__(2);

	var _Player = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var id = 'curse_change_race';

	var curse_change_race = function (_Card) {
	    _inherits(curse_change_race, _Card);

	    function curse_change_race() {
	        _classCallCheck(this, curse_change_race);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(curse_change_race).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'curse';
	        _this.castable = true;
	        return _this;
	    }

	    _createClass(curse_change_race, [{
	        key: 'canBeCast',
	        value: function canBeCast(source, dest, table) {
	            return dest instanceof _Player.Player;
	        }
	    }, {
	        key: 'onCast',
	        value: function onCast(source, dest, table) {
	            var hasRa = false;
	            player.wielded.map(function (x) {
	                if (_Card2.Card.byId(x).type == 'race') {
	                    player.unwield(x, table);
	                    hasRa = true;
	                }
	            });
	            if (hasRa) {
	                var _iteratorNormalCompletion = true;
	                var _didIteratorError = false;
	                var _iteratorError = undefined;

	                try {
	                    for (var _iterator = [].concat(discardedDoors).reverse()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                        var i = _step.value;

	                        if (_Card2.Card.byId(x).type == 'race') wield(_Card2.Card.byId(x), table);
	                        break;
	                    }
	                } catch (err) {
	                    _didIteratorError = true;
	                    _iteratorError = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion && _iterator.return) {
	                            _iterator.return();
	                        }
	                    } finally {
	                        if (_didIteratorError) {
	                            throw _iteratorError;
	                        }
	                    }
	                }
	            }
	        }
	    }]);

	    return curse_change_race;
	}(_Card2.Card);

	_Card2.Card.cards[id] = new curse_change_race();

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card2 = __webpack_require__(2);

	var _Player = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var id = 'curse_change_sex';

	var curse_change_sex = function (_Card) {
	    _inherits(curse_change_sex, _Card);

	    function curse_change_sex() {
	        _classCallCheck(this, curse_change_sex);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(curse_change_sex).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'curse';
	        _this.castable = true;
	        return _this;
	    }

	    _createClass(curse_change_sex, [{
	        key: 'canBeCast',
	        value: function canBeCast(source, dest, table) {
	            return dest instanceof _Player.Player;
	        }
	    }, {
	        key: 'onCast',
	        value: function onCast(source, dest, table) {
	            if (player.sex == 'male') player.sex = 'female';else player.sex = 'male';
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor() {
	            return -5;
	        }
	        //TODO:

	    }]);

	    return curse_change_sex;
	}(_Card2.Card);

	_Card2.Card.cards[id] = new curse_change_sex();

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card2 = __webpack_require__(2);

	var _Player = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var id = 'curse_chicken';

	var curse_chicken = function (_Card) {
	    _inherits(curse_chicken, _Card);

	    function curse_chicken() {
	        _classCallCheck(this, curse_chicken);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(curse_chicken).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'curse';
	        _this.castable = true;
	        return _this;
	    }

	    _createClass(curse_chicken, [{
	        key: 'canBeCast',
	        value: function canBeCast(source, dest, table) {
	            return dest instanceof _Player.Player;
	        }
	    }]);

	    return curse_chicken;
	}(_Card2.Card);

	_Card2.Card.cards[id] = new curse_chicken();

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Curse2 = __webpack_require__(24);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var id = 'curse_duck_of_doom';

	var curse_duck_of_doom = function (_Curse) {
	    _inherits(curse_duck_of_doom, _Curse);

	    function curse_duck_of_doom() {
	        _classCallCheck(this, curse_duck_of_doom);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(curse_duck_of_doom).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'curse';
	        _this.castable = true;
	        return _this;
	    }

	    _createClass(curse_duck_of_doom, [{
	        key: 'onCast',
	        value: function onCast(source, dest, table) {
	            dest.decreaseLevel(2);
	        }
	    }]);

	    return curse_duck_of_doom;
	}(_Curse2.Curse);

	_Card.Card.cards[id] = new curse_duck_of_doom();

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Curse = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card2 = __webpack_require__(2);

	var _Player = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/20/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var Curse = exports.Curse = function (_Card) {
	    _inherits(Curse, _Card);

	    function Curse() {
	        _classCallCheck(this, Curse);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Curse).apply(this, arguments));
	    }

	    _createClass(Curse, [{
	        key: 'canBeCast',
	        value: function canBeCast(source, dest, table) {
	            return dest instanceof _Player.Player;
	        }
	    }]);

	    return Curse;
	}(_Card2.Card);

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Player = __webpack_require__(3);

	var _Curse2 = __webpack_require__(24);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/14/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'curse_lose_armor';

	var CurseLoseArmor = function (_Curse) {
	    _inherits(CurseLoseArmor, _Curse);

	    function CurseLoseArmor() {
	        _classCallCheck(this, CurseLoseArmor);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CurseLoseArmor).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'curse';
	        _this.castable = true;
	        return _this;
	    }

	    _createClass(CurseLoseArmor, [{
	        key: 'onCast',
	        value: function onCast(source, dest, table) {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = dest.wielded[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var i = _step.value;

	                    if (_Card.Card.byId(i).type === 'armor') {
	                        dest.unwield(i, table);
	                        table.discard(i);
	                    }
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            return true;
	        }
	    }]);

	    return CurseLoseArmor;
	}(_Curse2.Curse);

	_Card.Card.cards[id] = new CurseLoseArmor();

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Curse2 = __webpack_require__(24);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var id = 'curse_lose_footgear';

	var CurseLoseFootgear = function (_Curse) {
	    _inherits(CurseLoseFootgear, _Curse);

	    function CurseLoseFootgear() {
	        _classCallCheck(this, CurseLoseFootgear);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CurseLoseFootgear).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'curse';
	        _this.castable = true;
	        return _this;
	    }

	    _createClass(CurseLoseFootgear, [{
	        key: 'onCast',
	        value: function onCast(source, dest, table) {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = dest.wielded[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var i = _step.value;

	                    if (_Card.Card.byId(i).type == 'footgear') {
	                        dest.unwield(i, table);
	                        table.discard(i);
	                    }
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }
	    }]);

	    return CurseLoseFootgear;
	}(_Curse2.Curse);

	_Card.Card.cards[id] = new CurseLoseFootgear();

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Curse2 = __webpack_require__(24);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var id = 'curse_lose_headgear';

	var CurseLoseHeadgear = function (_Curse) {
	    _inherits(CurseLoseHeadgear, _Curse);

	    function CurseLoseHeadgear() {
	        _classCallCheck(this, CurseLoseHeadgear);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CurseLoseHeadgear).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'curse';
	        _this.castable = true;
	        return _this;
	    }

	    _createClass(CurseLoseHeadgear, [{
	        key: 'onCast',
	        value: function onCast(source, dest, table) {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = dest.wielded[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var i = _step.value;

	                    if (_Card.Card.byId(i).type == 'headgear') {
	                        dest.unwield(i, table);
	                        table.discard(i);
	                    }
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }
	    }]);

	    return CurseLoseHeadgear;
	}(_Curse2.Curse);

	_Card.Card.cards[id] = new CurseLoseHeadgear();

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Curse2 = __webpack_require__(24);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var id = 'curse_lose_level';

	var curse_lose_level = function (_Curse) {
	    _inherits(curse_lose_level, _Curse);

	    function curse_lose_level() {
	        _classCallCheck(this, curse_lose_level);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(curse_lose_level).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'curse';
	        _this.castable = true;
	        return _this;
	    }

	    _createClass(curse_lose_level, [{
	        key: 'onCast',
	        value: function onCast(source, dest, table) {
	            dest.level--;
	        }
	    }]);

	    return curse_lose_level;
	}(_Curse2.Curse);

	_Card.Card.cards[id + '_1'] = new curse_lose_level();
	_Card.Card.cards[id + '_2'] = new curse_lose_level();

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Curse2 = __webpack_require__(24);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/14/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'curse_lose_small_item';

	var CurseLoseSmallItem = function (_Curse) {
	    _inherits(CurseLoseSmallItem, _Curse);

	    function CurseLoseSmallItem() {
	        _classCallCheck(this, CurseLoseSmallItem);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CurseLoseSmallItem).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'curse';
	        _this.castable = true;
	        return _this;
	    }

	    _createClass(CurseLoseSmallItem, [{
	        key: 'onCast',
	        value: function onCast(source, dest) {
	            // dest.dropSmallItem();
	        }
	    }]);

	    return CurseLoseSmallItem;
	}(_Curse2.Curse);

	_Card.Card.cards[id + '_1'] = new CurseLoseSmallItem();
	_Card.Card.cards[id + '_2'] = new CurseLoseSmallItem();

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card2 = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/23/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'divine_intervention';

	var _ = function (_Card) {
	    _inherits(_, _Card);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'divine_intervention';
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'onReceived',
	        value: function onReceived(player, source, table) {
	            table.players.map(function (x) {
	                if (x.hasClassAdvantages('cleric')) {
	                    x.level++;
	                }
	            });
	            player.hand = player.hand.filter(function (x) {
	                return x == 'divine_intervention';
	            });
	        }
	    }]);

	    return _;
	}(_Card2.Card);

	_Card2.Card.cards[id] = new _();

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Monster2 = __webpack_require__(9);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var id = 'drooling_slime';

	var drooling_slime = function (_Monster) {
	    _inherits(drooling_slime, _Monster);

	    function drooling_slime() {
	        _classCallCheck(this, drooling_slime);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(drooling_slime).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'monster';
	        _this.treasure = 1;
	        return _this;
	    }

	    _createClass(drooling_slime, [{
	        key: 'badThing',
	        value: function badThing(player, table) {
	            var hadFootgear = false;
	            player.wielded.map(function (x) {
	                if (_Card.Card.byId(x).type == 'footgear') {
	                    player.unwield(x, table);
	                    hadFootgear = true;
	                }
	            });
	            if (!hadFootgear) player.decreaseLevel(1);
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(players) {
	            var isElf = false;
	            players.map(function (x) {
	                if (x.hasRaceDisadvantages('elf')) isElf = true;
	            });
	            if (isElf) return 5;
	            return 1;
	        }
	    }]);

	    return drooling_slime;
	}(_Monster2.Monster);

	_Card.Card.cards[id] = new drooling_slime();

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _MonsterModifier2 = __webpack_require__(13);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/23/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'enraged';

	var _ = function (_MonsterModifier) {
	    _inherits(_, _MonsterModifier);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'monster_modifier';
	        _this.castable = true;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'getModFor',
	        value: function getModFor(x) {
	            return 5;
	        }
	    }, {
	        key: 'getTreasureFor',
	        value: function getTreasureFor(x) {
	            return 1;
	        }
	    }]);

	    return _;
	}(_MonsterModifier2.MonsterModifier);

	_Card.Card.cards[id] = new _();

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Monster2 = __webpack_require__(9);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var id = 'face_sucker';

	var flying_frogs = function (_Monster) {
	    _inherits(flying_frogs, _Monster);

	    function flying_frogs() {
	        _classCallCheck(this, flying_frogs);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(flying_frogs).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'monster';
	        _this.treasure = 2;
	        return _this;
	    }

	    _createClass(flying_frogs, [{
	        key: 'badThing',
	        value: function badThing(player, table) {
	            player.level--;
	            player.wielded.map(function (x) {
	                if (_Card.Card.byId(x).type == 'headgear') player.unwield(x, table);
	            });
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(players) {
	            var isElf = false;
	            players.map(function (x) {
	                if (x.hasRaceDisadvantages('elf')) isElf = true;
	            });
	            if (isElf) return 14;
	            return 8;
	        }
	    }]);

	    return flying_frogs;
	}(_Monster2.Monster);

	_Card.Card.cards[id] = new flying_frogs();

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Card = __webpack_require__(2);

	var _Monster2 = __webpack_require__(9);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var id = 'flying_frogs';

	var flying_frogs = function (_Monster) {
	    _inherits(flying_frogs, _Monster);

	    function flying_frogs() {
	        _classCallCheck(this, flying_frogs);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(flying_frogs).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'monster';
	        _this.treasure = 1;
	        return _this;
	    }

	    _createClass(flying_frogs, [{
	        key: 'onEscape',
	        value: function onEscape(player, dice, table) {
	            return _get(Object.getPrototypeOf(flying_frogs.prototype), 'onEscape', this).call(this, player, dice - 1, table);
	        }
	    }, {
	        key: 'badThing',
	        value: function badThing(player, table) {
	            player.decreaseLevel(2);
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(players) {
	            return 2;
	        }
	    }]);

	    return flying_frogs;
	}(_Monster2.Monster);

	_Card.Card.cards[id] = new flying_frogs();

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Card = __webpack_require__(2);

	var _Fight = __webpack_require__(10);

	var _Monster2 = __webpack_require__(9);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/13/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'gelatinous_octahedron';

	var GelatinousOctahedron = function (_Monster) {
	    _inherits(GelatinousOctahedron, _Monster);

	    function GelatinousOctahedron() {
	        _classCallCheck(this, GelatinousOctahedron);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GelatinousOctahedron).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'monster';
	        _this.treasure = 1;
	        return _this;
	    }

	    _createClass(GelatinousOctahedron, [{
	        key: 'onEscape',
	        value: function onEscape(player, dice, table) {
	            return _get(Object.getPrototypeOf(GelatinousOctahedron.prototype), 'onEscape', this).call(this, player, dice + 1, table);
	        }
	    }, {
	        key: 'badThing',
	        value: function badThing(player, table) {
	            player.wielded.map(function (x) {
	                if (_Card.Card.byId(x).big) {
	                    player.unwield(x, table);
	                    table.discard(x);
	                }
	            });
	            player.belt.map(function (x, i) {
	                if (_Card.Card.byId(x).big) {
	                    player.belt.splice(i, 1);
	                    table.discard(x);
	                }
	            });
	            player.hand.map(function (x, i) {
	                if (_Card.Card.byId(x).big) {
	                    player.hand.splice(i, 1);
	                    table.discard(x);
	                }
	            });
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(players) {
	            return 2;
	        }
	    }]);

	    return GelatinousOctahedron;
	}(_Monster2.Monster);

	_Card.Card.cards[id] = new GelatinousOctahedron();

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card2 = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * Created by ionagamed on 8/13/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

	var id = 'ghoulfiends';

	var ghoulfiends = function (_Card) {
	    _inherits(ghoulfiends, _Card);

	    function ghoulfiends() {
	        _classCallCheck(this, ghoulfiends);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ghoulfiends).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'monster';
	        _this.treasure = 2;
	        return _this;
	    }

	    /*
	     TODO: do not use item
	     */

	    _createClass(ghoulfiends, [{
	        key: 'badThing',
	        value: function badThing(player, table) {
	            var m = 50;
	            table.players.map(function (x) {
	                if (x.level < m) m = x.level;
	            });
	            if (m != 50) player.level = m;
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(players) {
	            return 8;
	        }
	    }]);

	    return ghoulfiends;
	}(_Card2.Card);

	_Card2.Card.cards[id] = new ghoulfiends();

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card2 = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/23/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'half-breed';

	var _ = function (_Card) {
	    _inherits(_, _Card);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'half-breed';
	        _this.wieldable = true;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'canBeWielded',
	        value: function canBeWielded(player, table) {
	            return true;
	        }
	    }, {
	        key: 'canBeHeld',
	        value: function canBeHeld(player, table) {
	            return true;
	        }
	    }, {
	        key: 'onUnwielded',
	        value: function onUnwielded(player, table) {
	            player.wielded.map(function (x) {
	                if (_Card2.Card.byId(x).type == 'race') {
	                    player.unwield(x, table);
	                    table.discard(x);
	                }
	            });
	        }
	    }]);

	    return _;
	}(_Card2.Card);

	_Card2.Card.cards[id + '_1'] = new _();
	_Card2.Card.cards[id + '_2'] = new _();

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Monster2 = __webpack_require__(9);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var id = 'harpies';

	var harpies = function (_Monster) {
	    _inherits(harpies, _Monster);

	    function harpies() {
	        _classCallCheck(this, harpies);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(harpies).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'monster';
	        _this.treasure = 2;
	        return _this;
	    }

	    _createClass(harpies, [{
	        key: 'badThing',
	        value: function badThing(player, table) {
	            player.decreaseLevel(2);
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(players) {
	            var isWizard = false;
	            players.map(function (x) {
	                if (x.hasClassDisadvantages('wizard')) isWizard = true;
	            });
	            if (isWizard) return 9;
	            return 4;
	        }
	    }]);

	    return harpies;
	}(_Monster2.Monster);

	_Card.Card.cards[id] = new harpies();

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Monster2 = __webpack_require__(9);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var id = 'horror';

	var horror = function (_Monster) {
	    _inherits(horror, _Monster);

	    function horror() {
	        _classCallCheck(this, horror);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(horror).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'monster';
	        _this.treasure = 4;
	        return _this;
	    }

	    _createClass(horror, [{
	        key: 'badThing',
	        value: function badThing(player, table) {
	            if (player.hasClassAdvantages('wizard')) {
	                player.wielded.map(function (x) {
	                    if (_Card.Card.byId(x).id == 'wizard') {
	                        player.unwield(x, table);
	                    }
	                });
	            } else {
	                player.die(table);
	            }
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(players) {
	            var isWarrior = false;
	            players.map(function (x) {
	                if (x.hasRaceDisadvantages('warrior')) isWarrior = true;
	            });
	            if (isWarrior) return 18;
	            return 14;
	        }
	    }]);

	    return horror;
	}(_Monster2.Monster);

	_Card.Card.cards[id] = new horror();

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _MonsterModifier2 = __webpack_require__(13);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/23/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'humongous';

	var _ = function (_MonsterModifier) {
	    _inherits(_, _MonsterModifier);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'monster_modifier';
	        _this.castable = true;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'getModFor',
	        value: function getModFor(x) {
	            return 10;
	        }
	    }, {
	        key: 'getTreasureFor',
	        value: function getTreasureFor(x) {
	            return 2;
	        }
	    }]);

	    return _;
	}(_MonsterModifier2.MonsterModifier);

	_Card.Card.cards[id] = new _();

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _MonsterModifier2 = __webpack_require__(13);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/23/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'intelligent';

	var _ = function (_MonsterModifier) {
	    _inherits(_, _MonsterModifier);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'monster_modifier';
	        _this.castable = true;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'getModFor',
	        value: function getModFor(x) {
	            return 5;
	        }
	    }, {
	        key: 'getTreasureFor',
	        value: function getTreasureFor(x) {
	            return 1;
	        }
	    }]);

	    return _;
	}(_MonsterModifier2.MonsterModifier);

	_Card.Card.cards[id] = new _();

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Card = __webpack_require__(2);

	var _Monster2 = __webpack_require__(9);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var id = 'king_tut';

	var king_tut = function (_Monster) {
	    _inherits(king_tut, _Monster);

	    function king_tut() {
	        _classCallCheck(this, king_tut);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(king_tut).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'monster';
	        _this.undead = true;
	        _this.levels = 2;
	        _this.treasure = 4;
	        return _this;
	    }

	    _createClass(king_tut, [{
	        key: 'onEscape',
	        value: function onEscape(player, dice, table) {
	            if (player.level <= 3) return true;
	            player.decreaseLevel(2);
	            return _get(Object.getPrototypeOf(king_tut.prototype), 'onEscape', this).call(this, player, dice, table);
	        }
	    }, {
	        key: 'badThing',
	        value: function badThing(player, table) {
	            player.hand.map(table.discard);
	            player.hand = [];
	            player.wielded.map(function (x) {
	                if (_Card.Card.byId(x).price >= 0) {
	                    player.unwield(x);
	                    table.discard(x);
	                }
	            });
	            player.belt.map(function (x, i) {
	                if (_Card.Card.byId(x).price >= 0) {
	                    player.belt.splice(i, 1);
	                    table.discard(x);
	                }
	            });
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(players) {
	            return 16;
	        }
	    }]);

	    return king_tut;
	}(_Monster2.Monster);

	_Card.Card.cards[id] = new king_tut();

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Card = __webpack_require__(2);

	var _Monster2 = __webpack_require__(9);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var id = 'lame_goblin';

	var lame_goblin = function (_Monster) {
	    _inherits(lame_goblin, _Monster);

	    function lame_goblin() {
	        _classCallCheck(this, lame_goblin);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(lame_goblin).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'monster';
	        _this.treasure = 1;
	        return _this;
	    }

	    _createClass(lame_goblin, [{
	        key: 'onEscape',
	        value: function onEscape(player, dice, table) {
	            return _get(Object.getPrototypeOf(lame_goblin.prototype), 'onEscape', this).call(this, player, dice + 1, table);
	        }
	    }, {
	        key: 'badThing',
	        value: function badThing(player, table) {
	            player.decreaseLevel(1);
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(players) {
	            return 1;
	        }
	    }]);

	    return lame_goblin;
	}(_Monster2.Monster);

	_Card.Card.cards[id] = new lame_goblin();

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card2 = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var id = 'large_angry_chicken';

	var _ = function (_Card) {
	    _inherits(_, _Card);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'monster';
	        _this.treasure = 1;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'badThing',
	        value: function badThing(player, table) {
	            player.decreaseLevel(1);
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(players) {
	            return 2;
	        }
	    }, {
	        key: 'onFightEnded',
	        value: function onFightEnded(fight, table) {
	            fight.players.map(function (x) {
	                if (x.state == 'success') {
	                    if (x.player.name == fight.mainPlayer || x.player.hasRaceAdvantages('elf')) {
	                        if (x.player.hasCardWielded('staff_of_napalm') || x.player.hasCardWielded('flaming_armor') || x.modifiers.indexOf('flaming_poison_potion') >= 0) {
	                            x.player.level++;
	                        }
	                    }
	                }
	            });
	        }
	    }]);

	    return _;
	}(_Card2.Card);

	_Card2.Card.cards[id] = new _();

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Monster2 = __webpack_require__(9);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var id = 'maul_rat';

	var maul_rat = function (_Monster) {
	    _inherits(maul_rat, _Monster);

	    function maul_rat() {
	        _classCallCheck(this, maul_rat);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(maul_rat).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'monster';
	        _this.treasure = 1;
	        return _this;
	    }

	    _createClass(maul_rat, [{
	        key: 'badThing',
	        value: function badThing(player, table) {
	            player.decreaseLevel(1);
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(players) {
	            var isCleric = false;
	            players.map(function (x) {
	                if (x.hasClassDisadvantages('cleric')) isCleric = true;
	            });
	            if (isCleric) return 4;
	            return 1;
	        }
	    }]);

	    return maul_rat;
	}(_Monster2.Monster);

	_Card.Card.cards[id] = new maul_rat();

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Card = __webpack_require__(2);

	var _Monster2 = __webpack_require__(9);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var id = 'mr_bones';

	var mr_bones = function (_Monster) {
	    _inherits(mr_bones, _Monster);

	    function mr_bones() {
	        _classCallCheck(this, mr_bones);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(mr_bones).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'monster';
	        _this.undead = true;
	        _this.treasure = 1;
	        return _this;
	    }

	    _createClass(mr_bones, [{
	        key: 'onEscape',
	        value: function onEscape(player, dice, table) {
	            player.decreaseLevel(1);
	            return _get(Object.getPrototypeOf(mr_bones.prototype), 'onEscape', this).call(this, player, dice, table);
	        }
	    }, {
	        key: 'badThing',
	        value: function badThing(player, table) {
	            player.decreaseLevel(2);
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(players) {
	            return 2;
	        }
	    }]);

	    return mr_bones;
	}(_Monster2.Monster);

	_Card.Card.cards[id] = new mr_bones();

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Card = __webpack_require__(2);

	var _Monster2 = __webpack_require__(9);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var id = 'plutonium_dragon';

	var plutonium_dragon = function (_Monster) {
	    _inherits(plutonium_dragon, _Monster);

	    function plutonium_dragon() {
	        _classCallCheck(this, plutonium_dragon);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(plutonium_dragon).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'monster';
	        _this.levels = 2;
	        _this.treasure = 5;
	        return _this;
	    }

	    _createClass(plutonium_dragon, [{
	        key: 'onEscape',
	        value: function onEscape(player, dice, table) {
	            if (player.level <= 5) {
	                return true;
	            }
	            return _get(Object.getPrototypeOf(plutonium_dragon.prototype), 'onEscape', this).call(this, player, dice, table);
	        }
	    }, {
	        key: 'badThing',
	        value: function badThing(player, table) {
	            player.die(table);
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(players) {
	            return 20;
	        }
	    }]);

	    return plutonium_dragon;
	}(_Monster2.Monster);

	_Card.Card.cards[id] = new plutonium_dragon();

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card2 = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var id = 'potted_plant';

	var potted_plant = function (_Card) {
	    _inherits(potted_plant, _Card);

	    function potted_plant() {
	        _classCallCheck(this, potted_plant);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(potted_plant).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'monster';
	        return _this;
	    }

	    _createClass(potted_plant, [{
	        key: 'onEscape',
	        value: function onEscape(player, dice, table) {
	            return true;
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(players) {
	            return 1;
	        }
	    }, {
	        key: 'getTreasure',
	        value: function getTreasure(fight, table) {
	            var isElf = false;
	            fight.players.map(function (x) {
	                if (x.player.hasRaceAdvantages('elf')) isElf = true;
	            });
	            if (isElf) return 2;
	            return 1;
	        }
	    }]);

	    return potted_plant;
	}(_Card2.Card);

	_Card2.Card.cards[id] = new potted_plant();

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Monster2 = __webpack_require__(9);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var id = 'pukachu';

	var pukachu = function (_Monster) {
	    _inherits(pukachu, _Monster);

	    function pukachu() {
	        _classCallCheck(this, pukachu);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(pukachu).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'monster';
	        _this.treasure = 2;
	        return _this;
	    }

	    _createClass(pukachu, [{
	        key: 'badThing',
	        value: function badThing(player, table) {
	            player.hand.map(table.discard);
	            player.hand = [];
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(players) {
	            return 6;
	        }
	    }, {
	        key: 'onFightEnded',
	        value: function onFightEnded(fight, table) {
	            if (fight.players.length == 1 && fight.players[0].modifiers.length == 0) {
	                var player = fight.players[0].player;
	                if (player.hasClassAdvantages('warrior')) {
	                    if (player.level >= 6) {
	                        player.level++;
	                    }
	                } else {
	                    if (player.level > 6) {
	                        player.level++;
	                    }
	                }
	            }
	        }
	    }]);

	    return pukachu;
	}(_Monster2.Monster);

	_Card.Card.cards[id] = new pukachu();

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Monster2 = __webpack_require__(9);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var id = 'shrieking_geek';

	var shrieking_geek = function (_Monster) {
	    _inherits(shrieking_geek, _Monster);

	    function shrieking_geek() {
	        _classCallCheck(this, shrieking_geek);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(shrieking_geek).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'monster';
	        return _this;
	    }

	    _createClass(shrieking_geek, [{
	        key: 'badThing',
	        value: function badThing(player, table) {
	            player.wielded.map(function (x) {
	                if (_Card.Card.byId(x).type == 'class' || _Card.Card.byId(x).type == 'race') player.unwield(x, table);
	            });
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(players) {
	            var isWarrior = false;
	            players.map(function (x) {
	                if (x.hasClassDisadvantages('warrior')) isWarrior = true;
	            });
	            if (isWarrior) return 12;
	            return 6;
	        }
	    }, {
	        key: 'treasureCount',
	        get: function get() {
	            return 2;
	        }
	    }]);

	    return shrieking_geek;
	}(_Monster2.Monster);

	_Card.Card.cards[id] = new shrieking_geek();

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Card = __webpack_require__(2);

	var _Monster2 = __webpack_require__(9);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var id = 'squidzilla';

	var squidzilla = function (_Monster) {
	    _inherits(squidzilla, _Monster);

	    function squidzilla() {
	        _classCallCheck(this, squidzilla);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(squidzilla).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'monster';
	        _this.level = 2;
	        _this.treasure = 4;
	        return _this;
	    }

	    _createClass(squidzilla, [{
	        key: 'onEscape',
	        value: function onEscape(player, dice, table) {
	            if (!player.hasRaceDisadvantages('elf') && player.level <= 4) return true;
	            return _get(Object.getPrototypeOf(squidzilla.prototype), 'onEscape', this).call(this, player, dice, table);
	        }
	    }, {
	        key: 'badThing',
	        value: function badThing(player, table) {
	            player.die(table);
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(players) {
	            var isElf = false;
	            players.map(function (x) {
	                if (x.hasRaceDisadvantages('elf')) isElf = true;
	            });
	            if (isElf) return 22;
	            return 18;
	        }
	    }]);

	    return squidzilla;
	}(_Monster2.Monster);

	_Card.Card.cards[id] = new squidzilla();

/***/ },
/* 52 */,
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card2 = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/18/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'super_munchkin';

	var Supermunchkin = function (_Card) {
	    _inherits(Supermunchkin, _Card);

	    function Supermunchkin() {
	        _classCallCheck(this, Supermunchkin);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Supermunchkin).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'super_munchkin';
	        _this.wieldable = true;
	        return _this;
	    }

	    _createClass(Supermunchkin, [{
	        key: 'canBeWielded',
	        value: function canBeWielded(player, table) {
	            return true;
	        }
	    }, {
	        key: 'canBeHeld',
	        value: function canBeHeld(player, table) {
	            return true;
	        }
	    }, {
	        key: 'onUnwielded',
	        value: function onUnwielded(player, table) {
	            player.wielded.map(function (x) {
	                if (_Card2.Card.byId(x).type == 'class') {
	                    player.unwield(x, table);
	                    table.discard(x);
	                }
	            });
	        }
	    }]);

	    return Supermunchkin;
	}(_Card2.Card);

	_Card2.Card.cards[id + '_1'] = new Supermunchkin();
	_Card2.Card.cards[id + '_2'] = new Supermunchkin();

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Monster2 = __webpack_require__(9);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var id = 'undead_horse';

	var undead_horse = function (_Monster) {
	    _inherits(undead_horse, _Monster);

	    function undead_horse() {
	        _classCallCheck(this, undead_horse);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(undead_horse).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'monster';
	        _this.undead = true;
	        _this.treasure = 4;
	        return _this;
	    }

	    _createClass(undead_horse, [{
	        key: 'badThing',
	        value: function badThing(player, table) {
	            player.decreaseLevel(2);
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(players) {
	            var isDwarf = false;
	            players.map(function (x) {
	                if (x.hasRaceDisadvantages('dwarf')) isDwarf = true;
	            });
	            if (isDwarf) {
	                return 9;
	            } else {
	                return 4;
	            }
	        }
	    }]);

	    return undead_horse;
	}(_Monster2.Monster);

	_Card.Card.cards[id] = new undead_horse();

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Class2 = __webpack_require__(56);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/18/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'warrior';

	var Warrior = function (_Class) {
	    _inherits(Warrior, _Class);

	    function Warrior() {
	        _classCallCheck(this, Warrior);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Warrior).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'class';
	        _this.wieldable = true;
	        return _this;
	    }

	    _createClass(Warrior, [{
	        key: 'canBeWielded',
	        value: function canBeWielded(player, table) {
	            if (player.hasCardWielded('super_munchkin')) {
	                return player.cardsOfTypeWielded('class') < 2;
	            } else {
	                return player.cardsOfTypeWielded('class') < 1;
	            }
	        }
	    }, {
	        key: 'canBeHeld',
	        value: function canBeHeld(player, table) {
	            if (player.hasCardWielded('super_munchkin')) {
	                return player.cardsOfTypeWielded('class') <= 2;
	            } else {
	                return player.cardsOfTypeWielded('class') <= 1;
	            }
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(player) {
	            return 1;
	        }
	    }]);

	    return Warrior;
	}(_Class2.Class);

	_Card.Card.cards[id + '_1'] = new Warrior();
	_Card.Card.cards[id + '_2'] = new Warrior();
	_Card.Card.cards[id + '_3'] = new Warrior();

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Class = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card2 = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/23/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var Class = exports.Class = function (_Card) {
	    _inherits(Class, _Card);

	    function Class() {
	        _classCallCheck(this, Class);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Class).apply(this, arguments));
	    }

	    _createClass(Class, [{
	        key: 'canBeWielded',
	        value: function canBeWielded(player, table) {
	            if (player.hasCardWielded('super_munchkin')) {
	                return player.cardsOfTypeWielded('class') < 2;
	            } else {
	                return player.cardsOfTypeWielded('class') < 1;
	            }
	        }
	    }, {
	        key: 'canBeHeld',
	        value: function canBeHeld(player, table) {
	            if (player.hasCardWielded('super_munchkin')) {
	                return player.cardsOfTypeWielded('class') <= 2;
	            } else {
	                return player.cardsOfTypeWielded('class') <= 1;
	            }
	        }
	    }]);

	    return Class;
	}(_Card2.Card);

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Card = __webpack_require__(2);

	var _Monster2 = __webpack_require__(9);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var id = 'wight_brothers';

	var flying_frogs = function (_Monster) {
	    _inherits(flying_frogs, _Monster);

	    function flying_frogs() {
	        _classCallCheck(this, flying_frogs);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(flying_frogs).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'monster';
	        _this.undead = true;
	        _this.levels = 2;
	        _this.treasure = 4;
	        return _this;
	    }

	    _createClass(flying_frogs, [{
	        key: 'onEscape',
	        value: function onEscape(player, dice, table) {
	            if (player.level <= 3) return true;
	            player.decreaseLevel(2);
	            return _get(Object.getPrototypeOf(flying_frogs.prototype), 'onEscape', this).call(this, player, dice, table);
	        }
	    }, {
	        key: 'badThing',
	        value: function badThing(player, table) {
	            player.level = 1;
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(players) {
	            return 16;
	        }
	    }]);

	    return flying_frogs;
	}(_Monster2.Monster);

	_Card.Card.cards[id] = new flying_frogs();

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Class2 = __webpack_require__(56);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/15/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'wizard';

	var Wizard = function (_Class) {
	    _inherits(Wizard, _Class);

	    function Wizard() {
	        _classCallCheck(this, Wizard);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Wizard).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'class';
	        _this.wieldable = true;
	        return _this;
	    }

	    _createClass(Wizard, [{
	        key: 'canBeWielded',
	        value: function canBeWielded(player, table) {
	            if (player.hasCardWielded('super_munchkin')) {
	                return player.cardsOfTypeWielded('class') < 2;
	            } else {
	                return player.cardsOfTypeWielded('class') < 1;
	            }
	        }
	    }, {
	        key: 'canBeHeld',
	        value: function canBeHeld(player, table) {
	            if (player.hasCardWielded('super_munchkin')) {
	                return player.cardsOfTypeWielded('class') <= 2;
	            } else {
	                return player.cardsOfTypeWielded('class') <= 1;
	            }
	        }
	    }]);

	    return Wizard;
	}(_Class2.Class);

	_Card.Card.cards[id + '_1'] = new Wizard();
	_Card.Card.cards[id + '_2'] = new Wizard();
	_Card.Card.cards[id + '_3'] = new Wizard();

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./1000_gold": 60,
		"./1000_gold.js": 60,
		"./acid_potion": 61,
		"./acid_potion.js": 61,
		"./bad-ass_bandanna": 63,
		"./bad-ass_bandanna.js": 63,
		"./boots_of_butt-kicking": 65,
		"./boots_of_butt-kicking.js": 65,
		"./boots_of_running_really_fast": 66,
		"./boots_of_running_really_fast.js": 66,
		"./bow_with_ribbons": 67,
		"./bow_with_ribbons.js": 67,
		"./broad_sword": 68,
		"./broad_sword.js": 68,
		"./buckler_of_swashing": 69,
		"./buckler_of_swashing.js": 69,
		"./chainsaw": 70,
		"./chainsaw.js": 70,
		"./cheese_grater_of_piece": 71,
		"./cheese_grater_of_piece.js": 71,
		"./cloak_of_obscurity": 72,
		"./cloak_of_obscurity.js": 72,
		"./cotion_of_ponfusion": 73,
		"./cotion_of_ponfusion.js": 73,
		"./dagger_of_treachery": 74,
		"./dagger_of_treachery.js": 74,
		"./doppleganger": 75,
		"./doppleganger.js": 75,
		"./eleven-foot_pole": 76,
		"./eleven-foot_pole.js": 76,
		"./flaming_armor": 77,
		"./flaming_armor.js": 77,
		"./flaming_poison_potion": 78,
		"./flaming_poison_potion.js": 78,
		"./freezing_explosive_potion": 79,
		"./freezing_explosive_potion.js": 79,
		"./gentlemans_club": 80,
		"./gentlemans_club.js": 80,
		"./hammer_of_kneecapping": 81,
		"./hammer_of_kneecapping.js": 81,
		"./helm_of_courage": 82,
		"./helm_of_courage.js": 82,
		"./hireling": 83,
		"./hireling.js": 83,
		"./horny_helmet": 84,
		"./horny_helmet.js": 84,
		"./huge_rock": 85,
		"./huge_rock.js": 85,
		"./leather_armor": 86,
		"./leather_armor.js": 86,
		"./mace_of_sharpness": 87,
		"./mace_of_sharpness.js": 87,
		"./magic_lamp": 88,
		"./magic_lamp.js": 88,
		"./magic_missile": 89,
		"./magic_missile.js": 89,
		"./mithril_armor": 90,
		"./mithril_armor.js": 90,
		"./nasty-tasting_sports_drink": 91,
		"./nasty-tasting_sports_drink.js": 91,
		"./pantyhose_of_giant_strength": 92,
		"./pantyhose_of_giant_strength.js": 92,
		"./pointy_hat_of_power": 93,
		"./pointy_hat_of_power.js": 93,
		"./potion_of_halitosis": 94,
		"./potion_of_halitosis.js": 94,
		"./potion_of_idiotic_bravery": 95,
		"./potion_of_idiotic_bravery.js": 95,
		"./pretty_balloons": 96,
		"./pretty_balloons.js": 96,
		"./q-dice": 97,
		"./q-dice.js": 97,
		"./rapier_of_unfairness": 98,
		"./rapier_of_unfairness.js": 98,
		"./rat_on_a_stick": 99,
		"./rat_on_a_stick.js": 99,
		"./really_impressive_title": 100,
		"./really_impressive_title.js": 100,
		"./sandals_of_protection": 101,
		"./sandals_of_protection.js": 101,
		"./sandwich": 102,
		"./sandwich.js": 102,
		"./shield_of_ubiquity": 103,
		"./shield_of_ubiquity.js": 103,
		"./short_wide_armor": 104,
		"./short_wide_armor.js": 104,
		"./singing_and_dancing_sword": 105,
		"./singing_and_dancing_sword.js": 105,
		"./sleep_potion": 106,
		"./sleep_potion.js": 106,
		"./slimy_armor": 107,
		"./slimy_armor.js": 107,
		"./sneaky_bastard_sword": 108,
		"./sneaky_bastard_sword.js": 108,
		"./spiky_knees": 109,
		"./spiky_knees.js": 109,
		"./staff_of_napalm": 110,
		"./staff_of_napalm.js": 110,
		"./steal_a_level": 111,
		"./steal_a_level.js": 111,
		"./stepladder": 112,
		"./stepladder.js": 112,
		"./swiss_army_polearm": 113,
		"./swiss_army_polearm.js": 113,
		"./tuba_of_charm": 114,
		"./tuba_of_charm.js": 114,
		"./whine_at_the_gm": 115,
		"./whine_at_the_gm.js": 115,
		"./yuppie_water": 116,
		"./yuppie_water.js": 116
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 59;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card2 = __webpack_require__(2);

	var _Player = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = '1000_gold';

	var _ = function (_Card) {
	    _inherits(_, _Card);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = 'level';
	        _this.castable = true;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'canBeCast',
	        value: function canBeCast(source, dest, table) {
	            return dest instanceof _Player.Player && dest.level < 9;
	        }
	    }, {
	        key: 'onCast',
	        value: function onCast(source, dest, table) {
	            dest.level++;
	        }
	    }]);

	    return _;
	}(_Card2.Card);
	/*
	 Note: all simple levelups are here
	 */


	_Card2.Card.cards[id] = new _();
	_Card2.Card.cards['boil_an_anthill'] = new _();
	_Card2.Card.cards['bribe_gm_with_food'] = new _();
	_Card2.Card.cards['convenient_addition_error'] = new _();
	_Card2.Card.cards['invoke_obscure_rules'] = new _();
	_Card2.Card.cards['potion_of_general_studliness'] = new _();
	_Card2.Card.cards['go_up_a_level'] = new _();

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Modifier2 = __webpack_require__(62);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/18/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'acid_potion';

	var _ = function (_Modifier) {
	    _inherits(_, _Modifier);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = 'modifier';
	        _this.castable = true;
	        _this.price = 200;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'getModFor',
	        value: function getModFor(x) {
	            return 5;
	        }
	    }]);

	    return _;
	}(_Modifier2.Modifier);

	_Card.Card.cards[id] = new _();

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Modifier = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Player = __webpack_require__(3);

	var _Card2 = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var Modifier = exports.Modifier = function (_Card) {
	    _inherits(Modifier, _Card);

	    function Modifier() {
	        _classCallCheck(this, Modifier);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Modifier).apply(this, arguments));
	    }

	    _createClass(Modifier, [{
	        key: 'canBeCast',
	        value: function canBeCast(source, dest, table) {
	            return table.fight != null;
	        }
	    }, {
	        key: 'onCast',
	        value: function onCast(source, dest, table) {
	            var _this2 = this;

	            if (dest instanceof _Player.Player) {
	                table.fight.players.map(function (x) {
	                    if (x.player.name == dest.name) {
	                        x.modifiers.push(_this2.id);
	                    }
	                });
	            } else {
	                table.fight.monsters.map(function (x) {
	                    if (x.monster == dest) {
	                        x.modifiers.push(_this2.id);
	                    }
	                });
	            }
	        }
	    }]);

	    return Modifier;
	}(_Card2.Card);

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Card = __webpack_require__(2);

	var _Item2 = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'bad-ass_bandanna';

	var _ = function (_Item) {
	    _inherits(_, _Item);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = 'armor';
	        _this.wieldable = true;
	        _this.price = 400;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'canBeHeld',
	        value: function canBeHeld(player, table) {
	            return player.hasRaceAdvantages('human') && _get(Object.getPrototypeOf(_.prototype), 'canBeHeld', this).call(this, player, table);
	        }
	    }, {
	        key: 'canBeWielded',
	        value: function canBeWielded(player, table) {
	            return player.hasRaceAdvantages('human') && _get(Object.getPrototypeOf(_.prototype), 'canBeWielded', this).call(this, player, table);
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(player) {
	            return 3;
	        }
	    }]);

	    return _;
	}(_Item2.Item);

	_Card.Card.cards[id] = new _();

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Item = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Card2 = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var Item = exports.Item = function (_Card) {
	    _inherits(Item, _Card);

	    function Item() {
	        _classCallCheck(this, Item);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Item).call(this));
	    }

	    _createClass(Item, [{
	        key: '__big_canBeWielded',
	        value: function __big_canBeWielded(player, table) {
	            return player.wielded.filter(function (x) {
	                return _Card2.Card.byId(x).big;
	            }).length == 0 || player.hasRaceAdvantages('dwarf');
	        }
	    }, {
	        key: '__hands_canBeWielded',
	        value: function __hands_canBeWielded(player, table, hands) {
	            return player.getBusyHandCount() <= 2 - hands;
	        }
	    }, {
	        key: '__armor_canBeWielded',
	        value: function __armor_canBeWielded(player, table) {
	            return player.cardsOfTypeWielded('armor') == 0;
	        }
	    }, {
	        key: '__headgear_canBeWielded',
	        value: function __headgear_canBeWielded(player, table) {
	            return player.cardsOfTypeWielded('headgear') == 0;
	        }
	    }, {
	        key: '__footgear_canBeWielded',
	        value: function __footgear_canBeWielded(player, table) {
	            return player.cardsOfTypeWielded('footgear') == 0;
	        }
	    }, {
	        key: 'canBeWielded',
	        value: function canBeWielded(player, table) {
	            return _get(Object.getPrototypeOf(Item.prototype), 'canBeWielded', this).call(this, player, table) && table.fight == null && (this.big ? this.__big_canBeWielded(player, table) : true) && (this.hands ? this.__hands_canBeWielded(player, table, this.hands) : true) && (this.type == 'armor' ? this.__armor_canBeWielded(player, table) : true) && (this.type == 'headgear' ? this.__headgear_canBeWielded(player, table) : true) && (this.type == 'footgear' ? this.__footgear_canBeWielded(player, table) : true);
	        }
	    }, {
	        key: '__big_canBeHeld',
	        value: function __big_canBeHeld(player, table) {
	            return player.wielded.filter(function (x) {
	                return _Card2.Card.byId(x).big;
	            }).length == 1 || player.hasRaceAdvantages('dwarf');
	        }
	    }, {
	        key: '__hands_canBeHeld',
	        value: function __hands_canBeHeld(player, table, hands) {
	            return player.getBusyHandCount() <= 2;
	        }
	    }, {
	        key: '__armor_canBeHeld',
	        value: function __armor_canBeHeld(player, table) {
	            return player.cardsOfTypeWielded('armor') <= 1;
	        }
	    }, {
	        key: '__headgear_canBeHeld',
	        value: function __headgear_canBeHeld(player, table) {
	            return player.cardsOfTypeWielded('headgear') <= 1;
	        }
	    }, {
	        key: '__footgear_canBeHeld',
	        value: function __footgear_canBeHeld(player, table) {
	            return player.cardsOfTypeWielded('footgear') <= 1;
	        }
	    }, {
	        key: 'canBeHeld',
	        value: function canBeHeld(player, table) {
	            return (this.big ? this.__big_canBeHeld(player, table) : true) && (this.hands ? this.__hands_canBeHeld(player, table, this.hands) : true) && (this.type == 'armor' ? this.__armor_canBeHeld(player, table) : true) && (this.type == 'headgear' ? this.__headgear_canBeHeld(player, table) : true) && (this.type == 'footgear' ? this.__footgear_canBeHeld(player, table) : true);
	        }
	    }]);

	    return Item;
	}(_Card2.Card);

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Item2 = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'boots_of_butt-kicking';

	var _ = function (_Item) {
	    _inherits(_, _Item);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = 'footgear';
	        _this.wieldable = true;
	        _this.price = 400;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'getAttackFor',
	        value: function getAttackFor(player) {
	            return 2;
	        }
	    }]);

	    return _;
	}(_Item2.Item);

	_Card.Card.cards[id] = new _();

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Item2 = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'boots_of_running_really_fast';

	var _ = function (_Item) {
	    _inherits(_, _Item);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = 'footgear';
	        _this.wieldable = true;
	        _this.price = 400;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'onEscape',
	        value: function onEscape(player, dice, table) {
	            return dice + 2;
	        }
	    }]);

	    return _;
	}(_Item2.Item);

	_Card.Card.cards[id] = new _();

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Card = __webpack_require__(2);

	var _Item2 = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'bow_with_ribbons';

	var _ = function (_Item) {
	    _inherits(_, _Item);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = '2-handed';
	        _this.hands = 2;
	        _this.wieldable = true;
	        _this.price = 800;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'canBeHeld',
	        value: function canBeHeld(player, table) {
	            return player.hasRaceAdvantages('elf') && _get(Object.getPrototypeOf(_.prototype), 'canBeHeld', this).call(this, player, table);
	        }
	    }, {
	        key: 'canBeWielded',
	        value: function canBeWielded(player, table) {
	            return player.hasRaceAdvantages('elf') && _get(Object.getPrototypeOf(_.prototype), 'canBeWielded', this).call(this, player, table);
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(player) {
	            return 4;
	        }
	    }]);

	    return _;
	}(_Item2.Item);

	_Card.Card.cards[id] = new _();

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Card = __webpack_require__(2);

	var _Item2 = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'broad_sword';

	var _ = function (_Item) {
	    _inherits(_, _Item);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = '1-handed';
	        _this.hands = 1;
	        _this.wieldable = true;
	        _this.price = 400;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'canBeHeld',
	        value: function canBeHeld(player, table) {
	            return player.sex == 'female' && _get(Object.getPrototypeOf(_.prototype), 'canBeHeld', this).call(this, player, table);
	        }
	    }, {
	        key: 'canBeWielded',
	        value: function canBeWielded(player, table) {
	            return player.sex == 'female' && _get(Object.getPrototypeOf(_.prototype), 'canBeWielded', this).call(this, player, table);
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(player) {
	            return 3;
	        }
	    }]);

	    return _;
	}(_Item2.Item);

	_Card.Card.cards[id] = new _();

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Item2 = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'buckler_of_swashing';

	var _ = function (_Item) {
	    _inherits(_, _Item);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = '1-handed';
	        _this.hands = 1;
	        _this.wieldable = true;
	        _this.price = 400;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'getAttackFor',
	        value: function getAttackFor(player) {
	            return 2;
	        }
	    }]);

	    return _;
	}(_Item2.Item);

	_Card.Card.cards[id] = new _();

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Item2 = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'chainsaw';

	var _ = function (_Item) {
	    _inherits(_, _Item);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = '2-handed';
	        _this.hands = 2;
	        _this.big = true;
	        _this.wieldable = true;
	        _this.price = 600;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'getAttackFor',
	        value: function getAttackFor(player) {
	            return 3;
	        }
	    }]);

	    return _;
	}(_Item2.Item);

	_Card.Card.cards[id] = new _();

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Card = __webpack_require__(2);

	var _Item2 = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'cheese_grater_of_piece';

	var _ = function (_Item) {
	    _inherits(_, _Item);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = '1-handed';
	        _this.hands = 1;
	        _this.wieldable = true;
	        _this.price = 600;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'canBeHeld',
	        value: function canBeHeld(player, table) {
	            return player.hasClassAdvantages('cleric') && _get(Object.getPrototypeOf(_.prototype), 'canBeHeld', this).call(this, player, table);
	        }
	    }, {
	        key: 'canBeWielded',
	        value: function canBeWielded(player, table) {
	            return player.hasClassAdvantages('cleric') && _get(Object.getPrototypeOf(_.prototype), 'canBeWielded', this).call(this, player, table);
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(player) {
	            return 3;
	        }
	    }]);

	    return _;
	}(_Item2.Item);

	_Card.Card.cards[id] = new _();

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Card = __webpack_require__(2);

	var _Item2 = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'cloak_of_obscurity';

	var _ = function (_Item) {
	    _inherits(_, _Item);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.wieldable = true;
	        _this.price = 600;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'canBeHeld',
	        value: function canBeHeld(player, table) {
	            return player.hasClassAdvantages('thief') && _get(Object.getPrototypeOf(_.prototype), 'canBeHeld', this).call(this, player, table);
	        }
	    }, {
	        key: 'canBeWielded',
	        value: function canBeWielded(player, table) {
	            return player.hasClassAdvantages('thief') && _get(Object.getPrototypeOf(_.prototype), 'canBeWielded', this).call(this, player, table);
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(player) {
	            return 4;
	        }
	    }]);

	    return _;
	}(_Item2.Item);

	_Card.Card.cards[id] = new _();

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Modifier2 = __webpack_require__(62);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/18/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'cotion_of_ponfusion';

	var _ = function (_Modifier) {
	    _inherits(_, _Modifier);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = 'modifier';
	        _this.castable = true;
	        _this.price = 100;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'getModFor',
	        value: function getModFor(x) {
	            return 3;
	        }
	    }]);

	    return _;
	}(_Modifier2.Modifier);

	_Card.Card.cards[id] = new _();

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Card = __webpack_require__(2);

	var _Item2 = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'dagger_of_treachery';

	var _ = function (_Item) {
	    _inherits(_, _Item);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = '1-handed';
	        _this.hands = 1;
	        _this.wieldable = true;
	        _this.price = 400;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'canBeHeld',
	        value: function canBeHeld(player, table) {
	            return player.hasClassAdvantages('thief') && _get(Object.getPrototypeOf(_.prototype), 'canBeHeld', this).call(this, player, table);
	        }
	    }, {
	        key: 'canBeWielded',
	        value: function canBeWielded(player, table) {
	            return player.hasClassAdvantages('thief') && _get(Object.getPrototypeOf(_.prototype), 'canBeWielded', this).call(this, player, table);
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(player) {
	            return 3;
	        }
	    }]);

	    return _;
	}(_Item2.Item);

	_Card.Card.cards[id] = new _();

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Player = __webpack_require__(3);

	var _Modifier2 = __webpack_require__(62);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/18/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'doppleganger';

	var _ = function (_Modifier) {
	    _inherits(_, _Modifier);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = 'modifier';
	        _this.castable = true;
	        _this.price = 300;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'getModFor',
	        value: function getModFor(arg) {
	            if (arg instanceof _Player.Player) {
	                /**
	                 * HACK: warrior
	                 */
	                return arg.wielded.filter(function (x) {
	                    return x.type != 'class';
	                }).filter(function (x) {
	                    return _Card.Card.byId(x).getAttackFor;
	                }).map(function (x) {
	                    return _Card.Card.byId(x).getAttackFor(arg);
	                }).reduce(function (acc, v) {
	                    return acc + v;
	                });
	            } else {
	                return _Card.Card.byId(arg).getAttack();
	            }
	        }
	    }]);

	    return _;
	}(_Modifier2.Modifier);

	_Card.Card.cards[id] = new _();

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Item2 = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'cheese_grater_of_piece';

	var _ = function (_Item) {
	    _inherits(_, _Item);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = '2-handed';
	        _this.hands = 2;
	        _this.wieldable = true;
	        _this.price = 200;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'getAttackFor',
	        value: function getAttackFor(player) {
	            return 1;
	        }
	    }]);

	    return _;
	}(_Item2.Item);

	_Card.Card.cards[id] = new _();

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Item2 = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'flaming_armor';

	var _ = function (_Item) {
	    _inherits(_, _Item);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = 'armor';
	        _this.wieldable = true;
	        _this.price = 600;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'getAttackFor',
	        value: function getAttackFor(player) {
	            return 3;
	        }
	    }]);

	    return _;
	}(_Item2.Item);

	_Card.Card.cards[id] = new _();

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Modifier2 = __webpack_require__(62);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'flaming_poison_potion';

	var _ = function (_Modifier) {
	    _inherits(_, _Modifier);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = 'modifier';
	        _this.castable = true;
	        _this.price = 100;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'getModFor',
	        value: function getModFor(x) {
	            return 3;
	        }
	    }]);

	    return _;
	}(_Modifier2.Modifier);

	_Card.Card.cards[id] = new _();

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Modifier2 = __webpack_require__(62);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'flaming_poison_potion';

	var _ = function (_Modifier) {
	    _inherits(_, _Modifier);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = 'modifier';
	        _this.castable = true;
	        _this.price = 100;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'getModFor',
	        value: function getModFor(x) {
	            return 3;
	        }
	    }]);

	    return _;
	}(_Modifier2.Modifier);

	_Card.Card.cards[id] = new _();

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Card = __webpack_require__(2);

	var _Item2 = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'gentlemans_club';

	var _ = function (_Item) {
	    _inherits(_, _Item);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = '1-handed';
	        _this.hands = 1;
	        _this.wieldable = true;
	        _this.price = 400;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'canBeHeld',
	        value: function canBeHeld(player, table) {
	            return player.sex == 'male' && _get(Object.getPrototypeOf(_.prototype), 'canBeHeld', this).call(this, player, table);
	        }
	    }, {
	        key: 'canBeWielded',
	        value: function canBeWielded(player, table) {
	            return player.sex == 'male' && _get(Object.getPrototypeOf(_.prototype), 'canBeWielded', this).call(this, player, table);
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(player) {
	            return 3;
	        }
	    }]);

	    return _;
	}(_Item2.Item);

	_Card.Card.cards[id] = new _();

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Card = __webpack_require__(2);

	var _Item2 = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'hammer_of_kneecapping';

	var _ = function (_Item) {
	    _inherits(_, _Item);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = '1-handed';
	        _this.hands = 1;
	        _this.wieldable = true;
	        _this.price = 600;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'canBeHeld',
	        value: function canBeHeld(player, table) {
	            return player.hasRaceAdvantages('dwarf') && _get(Object.getPrototypeOf(_.prototype), 'canBeHeld', this).call(this, player, table);
	        }
	    }, {
	        key: 'canBeWielded',
	        value: function canBeWielded(player, table) {
	            return player.hasRaceAdvantages('dwarf') && _get(Object.getPrototypeOf(_.prototype), 'canBeWielded', this).call(this, player, table);
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(player) {
	            return 4;
	        }
	    }]);

	    return _;
	}(_Item2.Item);

	_Card.Card.cards[id] = new _();

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Item2 = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'helm_of_courage';

	var _ = function (_Item) {
	    _inherits(_, _Item);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = 'headgear';
	        _this.wieldable = true;
	        _this.price = 200;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'getAttackFor',
	        value: function getAttackFor(player) {
	            return 1;
	        }
	    }]);

	    return _;
	}(_Item2.Item);

	_Card.Card.cards[id] = new _();

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Item2 = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'hireling';

	var _ = function (_Item) {
	    _inherits(_, _Item);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = 'hireling';
	        _this.wieldable = true;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'getAttackFor',
	        value: function getAttackFor(player) {
	            return 1;
	        }
	    }]);

	    return _;
	}(_Item2.Item);

	_Card.Card.cards[id] = new _();

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Card = __webpack_require__(2);

	var _Item2 = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'horny_helmet';

	var _ = function (_Item) {
	    _inherits(_, _Item);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = 'headgear';
	        _this.wieldable = true;
	        _this.price = 600;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'canBeHeld',
	        value: function canBeHeld(player, table) {
	            return !player.hasClassDisadvantages('wizard') && _get(Object.getPrototypeOf(_.prototype), 'canBeHeld', this).call(this, player, table);
	        }
	    }, {
	        key: 'canBeWielded',
	        value: function canBeWielded(player, table) {
	            return !player.hasClassDisadvantages('wizard') && _get(Object.getPrototypeOf(_.prototype), 'canBeWielded', this).call(this, player, table);
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(player) {
	            return player.hasClassAdvantages('elf') ? 3 : 1;
	        }
	    }]);

	    return _;
	}(_Item2.Item);

	_Card.Card.cards[id] = new _();

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Item2 = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/18/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'huge_rock';

	var _ = function (_Item) {
	    _inherits(_, _Item);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = '2-handed';
	        _this.hands = 2;
	        _this.big = true;
	        _this.wieldable = true;
	        _this.price = 0;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'getAttackFor',
	        value: function getAttackFor(player) {
	            return 3;
	        }
	    }]);

	    return _;
	}(_Item2.Item);

	_Card.Card.cards[id] = new _();

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Item2 = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'leather_armor';

	var _ = function (_Item) {
	    _inherits(_, _Item);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = 'armor';
	        _this.wieldable = true;
	        _this.price = 200;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'getAttackFor',
	        value: function getAttackFor(player) {
	            return 1;
	        }
	    }]);

	    return _;
	}(_Item2.Item);

	_Card.Card.cards[id] = new _();

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Card = __webpack_require__(2);

	var _Item2 = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'mace_of_sharpness';

	var _ = function (_Item) {
	    _inherits(_, _Item);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = '1-handed';
	        _this.hands = 1;
	        _this.wieldable = true;
	        _this.price = 600;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'canBeHeld',
	        value: function canBeHeld(player, table) {
	            return player.hasClassAdvantages('cleric') && _get(Object.getPrototypeOf(_.prototype), 'canBeHeld', this).call(this, player, table);
	        }
	    }, {
	        key: 'canBeWielded',
	        value: function canBeWielded(player, table) {
	            return player.hasClassAdvantages('cleric') && _get(Object.getPrototypeOf(_.prototype), 'canBeWielded', this).call(this, player, table);
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(player) {
	            return 4;
	        }
	    }]);

	    return _;
	}(_Item2.Item);

	_Card.Card.cards[id] = new _();

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card2 = __webpack_require__(2);

	var _Player = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'magic_lamp';

	var _ = function (_Card) {
	    _inherits(_, _Card);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = 'magic_lamp';
	        _this.castable = true;
	        _this.price = 400;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'canBeCast',
	        value: function canBeCast(source, dest, table) {
	            return table.fight != null && !(dest instanceof _Player.Player);
	        }
	    }, {
	        key: 'onCast',
	        value: function onCast(source, dest, table) {
	            for (var i in table.fight.monsters) {
	                if (table.fight.monsters.hasOwnProperty(i)) {
	                    if (table.fight.monsters[i].monster == dest) {
	                        table.fight.monsters.splice(i, 1);
	                        break;
	                    }
	                }
	            }
	            return true;
	        }
	    }]);

	    return _;
	}(_Card2.Card);

	_Card2.Card.cards[id] = new _();

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Modifier2 = __webpack_require__(62);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'magic_missile';

	var _ = function (_Modifier) {
	    _inherits(_, _Modifier);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = 'modifier';
	        _this.castable = true;
	        _this.price = 300;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'getModFor',
	        value: function getModFor(x) {
	            return 5;
	        }
	    }]);

	    return _;
	}(_Modifier2.Modifier);

	_Card.Card.cards[id] = new _();

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Card = __webpack_require__(2);

	var _Item2 = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/14/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'mithril_armor';

	var _ = function (_Item) {
	    _inherits(_, _Item);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = 'armor';
	        _this.big = true;
	        _this.wieldable = true;
	        _this.price = 600;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'canBeHeld',
	        value: function canBeHeld(player, table) {
	            return !player.hasClassDisadvantages('wizard') && _get(Object.getPrototypeOf(_.prototype), 'canBeHeld', this).call(this, player, table);
	        }
	    }, {
	        key: 'canBeWielded',
	        value: function canBeWielded(player, table) {
	            return !player.hasClassDisadvantages('wizard') && _get(Object.getPrototypeOf(_.prototype), 'canBeWielded', this).call(this, player, table);
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(player) {
	            return 3;
	        }
	    }]);

	    return _;
	}(_Item2.Item);

	_Card.Card.cards[id] = new _();

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Modifier2 = __webpack_require__(62);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'nasty-tasting_sports_drink';

	var _ = function (_Modifier) {
	    _inherits(_, _Modifier);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = 'modifier';
	        _this.castable = true;
	        _this.price = 200;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'getModFor',
	        value: function getModFor(x) {
	            return 2;
	        }
	    }]);

	    return _;
	}(_Modifier2.Modifier);

	_Card.Card.cards[id] = new _();

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Card = __webpack_require__(2);

	var _Item2 = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'pantyhose_of_giant_strength';

	var _ = function (_Item) {
	    _inherits(_, _Item);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = 'item';
	        _this.wieldable = true;
	        _this.price = 600;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'canBeHeld',
	        value: function canBeHeld(player, table) {
	            return !player.hasClassDisadvantages('warrior') && _get(Object.getPrototypeOf(_.prototype), 'canBeHeld', this).call(this, player, table);
	        }
	    }, {
	        key: 'canBeWielded',
	        value: function canBeWielded(player, table) {
	            return !player.hasClassDisadvantages('warrior') && _get(Object.getPrototypeOf(_.prototype), 'canBeWielded', this).call(this, player, table);
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(player) {
	            return 3;
	        }
	    }]);

	    return _;
	}(_Item2.Item);

	_Card.Card.cards[id] = new _();

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Card = __webpack_require__(2);

	var _Item2 = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'pointy_hat_of_power';

	var _ = function (_Item) {
	    _inherits(_, _Item);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = 'headgear';
	        _this.wieldable = true;
	        _this.price = 400;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'canBeHeld',
	        value: function canBeHeld(player, table) {
	            return player.hasClassAdvantages('wizard') && _get(Object.getPrototypeOf(_.prototype), 'canBeHeld', this).call(this, player, table);
	        }
	    }, {
	        key: 'canBeWielded',
	        value: function canBeWielded(player, table) {
	            return player.hasClassAdvantages('wizard') && _get(Object.getPrototypeOf(_.prototype), 'canBeWielded', this).call(this, player, table);
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(player) {
	            return 3;
	        }
	    }]);

	    return _;
	}(_Item2.Item);

	_Card.Card.cards[id] = new _();

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Card = __webpack_require__(2);

	var _Modifier2 = __webpack_require__(62);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'potion_of_halitosis';

	var _ = function (_Modifier) {
	    _inherits(_, _Modifier);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = 'modifier';
	        _this.castable = true;
	        _this.price = 100;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'onCast',
	        value: function onCast(source, dest, table) {
	            if (dest == 'floating_nose') {
	                for (var i in table.fight.monsters) {
	                    if (table.fight.monsters.hasOwnProperty(i)) {
	                        if (table.fight.monsters[i].monster == 'floating_nose') {
	                            table.fight.monsters.splice(i, 1);
	                            break;
	                        }
	                    }
	                }
	            } else {
	                _get(Object.getPrototypeOf(_.prototype), 'onCast', this).call(this, source, dest, table);
	            }
	        }
	    }, {
	        key: 'getModFor',
	        value: function getModFor(x) {
	            return 2;
	        }
	    }]);

	    return _;
	}(_Modifier2.Modifier);

	_Card.Card.cards[id] = new _();

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Modifier2 = __webpack_require__(62);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'potion_of_idiotic_bravery';

	var _ = function (_Modifier) {
	    _inherits(_, _Modifier);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = 'modifier';
	        _this.castable = true;
	        _this.price = 100;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'getModFor',
	        value: function getModFor(x) {
	            return 2;
	        }
	    }]);

	    return _;
	}(_Modifier2.Modifier);

	_Card.Card.cards[id] = new _();

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Modifier2 = __webpack_require__(62);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'pretty_balloons';

	var _ = function (_Modifier) {
	    _inherits(_, _Modifier);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = 'modifier';
	        _this.castable = true;
	        _this.price = 0;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'getModFor',
	        value: function getModFor(x) {
	            return 5;
	        }
	    }]);

	    return _;
	}(_Modifier2.Modifier);

	_Card.Card.cards[id] = new _();

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Card = __webpack_require__(2);

	var _Item2 = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/20/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'q-dice';

	var _ = function (_Item) {
	    _inherits(_, _Item);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = 'item';
	        _this.price = 1000;
	        return _this;
	    }

	    return _;
	}(_Item2.Item);

	_Card.Card.cards[id] = new _();

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Card = __webpack_require__(2);

	var _Item2 = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'rapier_of_unfairness';

	var _ = function (_Item) {
	    _inherits(_, _Item);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = '1-handed';
	        _this.hands = 1;
	        _this.wieldable = true;
	        _this.price = 400;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'canBeHeld',
	        value: function canBeHeld(player, table) {
	            return player.hasClassAdvantages('elf') && _get(Object.getPrototypeOf(_.prototype), 'canBeHeld', this).call(this, player, table);
	        }
	    }, {
	        key: 'canBeWielded',
	        value: function canBeWielded(player, table) {
	            return player.hasClassAdvantages('elf') && _get(Object.getPrototypeOf(_.prototype), 'canBeWielded', this).call(this, player, table);
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(player) {
	            return 3;
	        }
	    }]);

	    return _;
	}(_Item2.Item);

	_Card.Card.cards[id] = new _();

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Item2 = __webpack_require__(64);

	var _Player = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'rat_on_a_stick';

	var _ = function (_Item) {
	    _inherits(_, _Item);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = '1-handed';
	        _this.hands = 1;
	        _this.wieldable = true;
	        _this.castable = true;
	        _this.price = 0;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'canBeCast',
	        value: function canBeCast(source, dest, table) {
	            return !(dest instanceof _Player.Player) && _Card.Card.byId(dest).getAttackFor(new _Player.Player()) <= 8;
	        }
	    }, {
	        key: 'onCast',
	        value: function onCast(source, dest, table) {
	            for (var i in table.fight.monsters) {
	                if (table.fight.monsters.hasOwnProperty(i)) {
	                    if (table.fight.monsters[i] == dest) {
	                        table.fight.monsters.splice(i, 1);
	                        break;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(player) {
	            return 1;
	        }
	    }]);

	    return _;
	}(_Item2.Item);

	_Card.Card.cards[id] = new _();

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Item2 = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'really_impressive_title';

	var _ = function (_Item) {
	    _inherits(_, _Item);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = 'title';
	        _this.wieldable = true;
	        _this.price = -1;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'getAttackFor',
	        value: function getAttackFor(player) {
	            return 3;
	        }
	    }]);

	    return _;
	}(_Item2.Item);

	_Card.Card.cards[id] = new _();

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Card = __webpack_require__(2);

	var _Item2 = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/20/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'sandals_of_protection';

	var _ = function (_Item) {
	    _inherits(_, _Item);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = 'footgear';
	        _this.wieldable = true;
	        _this.price = 700;
	        return _this;
	    }

	    return _;
	}(_Item2.Item);

	_Card.Card.cards[id] = new _();

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Card = __webpack_require__(2);

	var _Item2 = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'sandwich';

	var _ = function (_Item) {
	    _inherits(_, _Item);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.wieldable = true;
	        _this.price = 400;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'canBeHeld',
	        value: function canBeHeld(player, table) {
	            return player.hasClassAdvantages('halfling') && _get(Object.getPrototypeOf(_.prototype), 'canBeHeld', this).call(this, player, table);
	        }
	    }, {
	        key: 'canBeWielded',
	        value: function canBeWielded(player, table) {
	            return player.hasClassAdvantages('halfling') && _get(Object.getPrototypeOf(_.prototype), 'canBeWielded', this).call(this, player, table);
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(player) {
	            return 3;
	        }
	    }]);

	    return _;
	}(_Item2.Item);

	_Card.Card.cards[id] = new _();

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Card = __webpack_require__(2);

	var _Item2 = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'shield_of_ubiquity';

	var _ = function (_Item) {
	    _inherits(_, _Item);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = '1-handed';
	        _this.hands = 1;
	        _this.big = true;
	        _this.wieldable = true;
	        _this.price = 600;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'canBeHeld',
	        value: function canBeHeld(player, table) {
	            return player.hasClassAdvantages('warrior') && _get(Object.getPrototypeOf(_.prototype), 'canBeHeld', this).call(this, player, table);
	        }
	    }, {
	        key: 'canBeWielded',
	        value: function canBeWielded(player, table) {
	            return player.hasClassAdvantages('warrior') && _get(Object.getPrototypeOf(_.prototype), 'canBeWielded', this).call(this, player, table);
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(player) {
	            return 4;
	        }
	    }]);

	    return _;
	}(_Item2.Item);

	_Card.Card.cards[id] = new _();

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Card = __webpack_require__(2);

	var _Item2 = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'short_wide_armor';

	var _ = function (_Item) {
	    _inherits(_, _Item);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = 'armor';
	        _this.wieldable = true;
	        _this.price = 400;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'canBeHeld',
	        value: function canBeHeld(player, table) {
	            return player.hasClassAdvantages('dwarf') && _get(Object.getPrototypeOf(_.prototype), 'canBeHeld', this).call(this, player, table);
	        }
	    }, {
	        key: 'canBeWielded',
	        value: function canBeWielded(player, table) {
	            return player.hasClassAdvantages('dwarf') && _get(Object.getPrototypeOf(_.prototype), 'canBeWielded', this).call(this, player, table);
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(player) {
	            return 3;
	        }
	    }]);

	    return _;
	}(_Item2.Item);

	_Card.Card.cards[id] = new _();

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Card = __webpack_require__(2);

	var _Item2 = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'singing_and_dancing_sword';

	var _ = function (_Item) {
	    _inherits(_, _Item);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = 'item';
	        _this.wieldable = true;
	        _this.price = 600;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'canBeHeld',
	        value: function canBeHeld(player, table) {
	            return !player.hasClassDisadvantages('thief') && _get(Object.getPrototypeOf(_.prototype), 'canBeHeld', this).call(this, player, table);
	        }
	    }, {
	        key: 'canBeWielded',
	        value: function canBeWielded(player, table) {
	            return !player.hasClassDisadvantages('thief') && _get(Object.getPrototypeOf(_.prototype), 'canBeWielded', this).call(this, player, table);
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(player) {
	            return 3;
	        }
	    }]);

	    return _;
	}(_Item2.Item);

	_Card.Card.cards[id] = new _();

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Modifier2 = __webpack_require__(62);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'sleep_potion';

	var _ = function (_Modifier) {
	    _inherits(_, _Modifier);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = 'modifier';
	        _this.castable = true;
	        _this.price = 100;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'getModFor',
	        value: function getModFor(x) {
	            return 2;
	        }
	    }]);

	    return _;
	}(_Modifier2.Modifier);

	_Card.Card.cards[id] = new _();

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Item2 = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'slimy_armor';

	var _ = function (_Item) {
	    _inherits(_, _Item);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = 'armor';
	        _this.wieldable = true;
	        _this.price = 200;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'getAttackFor',
	        value: function getAttackFor(player) {
	            return 1;
	        }
	    }]);

	    return _;
	}(_Item2.Item);

	_Card.Card.cards[id] = new _();

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Item2 = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'sneaky_bastard_sword';

	var _ = function (_Item) {
	    _inherits(_, _Item);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = '1-handed';
	        _this.hands = 1;
	        _this.wieldable = true;
	        _this.price = 400;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'getAttackFor',
	        value: function getAttackFor(player) {
	            return 2;
	        }
	    }]);

	    return _;
	}(_Item2.Item);

	_Card.Card.cards[id] = new _();

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Item2 = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'spiky_knees';

	var _ = function (_Item) {
	    _inherits(_, _Item);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = 'knees';
	        _this.wieldable = true;
	        _this.price = 200;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'getAttackFor',
	        value: function getAttackFor(player) {
	            return 1;
	        }
	    }]);

	    return _;
	}(_Item2.Item);

	_Card.Card.cards[id] = new _();

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Card = __webpack_require__(2);

	var _Item2 = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/15/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'staff_of_napalm';

	var _ = function (_Item) {
	    _inherits(_, _Item);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = '1-handed';
	        _this.hands = 1;
	        _this.wieldable = true;
	        _this.price = 800;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'canBeHeld',
	        value: function canBeHeld(player, table) {
	            return player.hasRaceAdvantages('wizard') && _get(Object.getPrototypeOf(_.prototype), 'canBeHeld', this).call(this, player, table);
	        }
	    }, {
	        key: 'canBeWielded',
	        value: function canBeWielded(player, table) {
	            return player.hasRaceAdvantages('wizard') && _get(Object.getPrototypeOf(_.prototype), 'canBeWielded', this).call(this, player, table);
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(player) {
	            return 5;
	        }
	    }]);

	    return _;
	}(_Item2.Item);

	_Card.Card.cards[id] = new _();

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card2 = __webpack_require__(2);

	var _Player = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/20/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'steal_a_level';

	var _ = function (_Card) {
	    _inherits(_, _Card);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = 'level';
	        _this.castable = true;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'canBeCast',
	        value: function canBeCast(source, dest, table) {
	            return dest instanceof _Player.Player && source instanceof _Player.Player && source.level < 9 && dest.level > 1;
	        }
	    }, {
	        key: 'onCast',
	        value: function onCast(source, dest, table) {
	            source.level++;
	            dest.level--;
	        }
	    }]);

	    return _;
	}(_Card2.Card);

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Card = __webpack_require__(2);

	var _Item2 = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'stepladder';

	var _ = function (_Item) {
	    _inherits(_, _Item);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = 'item';
	        _this.big = true;
	        _this.wieldable = true;
	        _this.price = 400;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'canBeHeld',
	        value: function canBeHeld(player, table) {
	            return player.hasRaceAdvantages('halfling') && _get(Object.getPrototypeOf(_.prototype), 'canBeHeld', this).call(this, player, table);
	        }
	    }, {
	        key: 'canBeWielded',
	        value: function canBeWielded(player, table) {
	            return player.hasRaceAdvantages('halfling') && _get(Object.getPrototypeOf(_.prototype), 'canBeWielded', this).call(this, player, table);
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(player) {
	            return 3;
	        }
	    }]);

	    return _;
	}(_Item2.Item);

	_Card.Card.cards[id] = new _();

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Card = __webpack_require__(2);

	var _Item2 = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/19/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'swiss_army_polearm';

	var _ = function (_Item) {
	    _inherits(_, _Item);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = '2-handed';
	        _this.hands = 2;
	        _this.big = true;
	        _this.wieldable = true;
	        _this.price = 600;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'canBeHeld',
	        value: function canBeHeld(player, table) {
	            return player.hasRaceAdvantages('human') && _get(Object.getPrototypeOf(_.prototype), 'canBeHeld', this).call(this, player, table);
	        }
	    }, {
	        key: 'canBeWielded',
	        value: function canBeWielded(player, table) {
	            return player.hasRaceAdvantages('human') && _get(Object.getPrototypeOf(_.prototype), 'canBeWielded', this).call(this, player, table);
	        }
	    }, {
	        key: 'getAttackFor',
	        value: function getAttackFor(player) {
	            return 4;
	        }
	    }]);

	    return _;
	}(_Item2.Item);

	_Card.Card.cards[id] = new _();

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Item2 = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/20/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'tuba_of_charm';

	var _ = function (_Item) {
	    _inherits(_, _Item);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = '1-handed';
	        _this.hands = 1;
	        _this.big = true;
	        _this.wieldable = true;
	        _this.price = 300;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'onEscape',
	        value: function onEscape(player, dice, table) {
	            return dice + 3;
	        }
	    }, {
	        key: 'onFightEnded',
	        value: function onFightEnded(fight, table) {
	            fight.players.map(function (x) {
	                if (x.player.hasCardWielded('tuba_of_charm') && x.state == 'escape') {
	                    //TODO: get one closed treasure
	                }
	            });
	        }
	    }]);

	    return _;
	}(_Item2.Item);

	_Card.Card.cards[id] = new _();

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card2 = __webpack_require__(2);

	var _Player = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/20/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'whine_at_the_gm';

	var _ = function (_Card) {
	    _inherits(_, _Card);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = 'level';
	        _this.castable = true;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'canBeCast',
	        value: function canBeCast(source, dest, table) {
	            return dest instanceof _Player.Player && dest.level < 9 && dest.level < table.players.reduce(function (acc, v) {
	                return acc < v ? acc : v;
	            });
	        }
	    }, {
	        key: 'onCast',
	        value: function onCast(source, dest, table) {
	            dest.level++;
	        }
	    }]);

	    return _;
	}(_Card2.Card);

	_Card2.Card.cards[id] = new _();

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card = __webpack_require__(2);

	var _Modifier3 = __webpack_require__(62);

	var _Player = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/20/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'yuppie_water';

	var _ = function (_Modifier) {
	    _inherits(_, _Modifier);

	    function _() {
	        _classCallCheck(this, _);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = 'modifier';
	        _this.castable = true;
	        _this.price = 100;
	        return _this;
	    }

	    _createClass(_, [{
	        key: 'canBeCast',
	        value: function canBeCast(source, dest, table) {
	            return table.fight != null && dest instanceof _Player.Player && dest.hasRaceAdvantages('elf');
	        }
	    }, {
	        key: 'onCast',
	        value: function onCast(source, dest, table) {
	            table.fight.players.map(function (x) {
	                if (x.player.hasRaceAdvantages('elf')) x.modifiers.push('yuppie_water_helper');
	            });
	        }
	    }]);

	    return _;
	}(_Modifier3.Modifier);

	var __ = function (_Modifier2) {
	    _inherits(__, _Modifier2);

	    function __() {
	        _classCallCheck(this, __);

	        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(__).call(this));

	        _this2.id = 'yuppie_water_helper';
	        _this2.pack = 'pack1';
	        _this2.kind = 'treasure';
	        _this2.type = 'modifier';
	        return _this2;
	    }

	    _createClass(__, [{
	        key: 'getModFor',
	        value: function getModFor(x) {
	            return 2;
	        }
	    }]);

	    return __;
	}(_Modifier3.Modifier);

	_Card.Card.cards[id] = new _();
	_Card.Card.cards['yuppie_water_helper'] = new __();

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Player = __webpack_require__(3);

	var _Table = __webpack_require__(4);

	var _Card = __webpack_require__(2);

	var _Fight = __webpack_require__(10);

	var _packs = __webpack_require__(5);

	var _packs2 = _interopRequireDefault(_packs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function idToInt(id) {
	    if (_Card.Card.byId(id).kind == 'door') {
	        return _packs2.default.pack1.doors.indexOf(id);
	    } else {
	        return _packs2.default.pack1.treasure.indexOf(id);
	    }
	} /**
	   * Created by ionagamed on 8/14/16.
	   */

	function _l(c, x) {
	    if (c.kind == 'door') {
	        return '<a href="/packs/pack1/img/doors-' + idToInt(x) + '.png">' + x + '</a>';
	    } else {
	        return '<a href="/packs/pack1/img/treasure-' + idToInt(x) + '.png">' + x + '</a>';
	    }
	}

	function __l(x) {
	    var c = _Card.Card.byId(x);
	    if (c.kind == 'door') {
	        return '/packs/pack1/img/doors-' + idToInt(x) + '.png';
	    } else {
	        return '/packs/pack1/img/treasure-' + idToInt(x) + '.png';
	    }
	}

	$(function () {
	    var player = new _Player.Player();
	    var table = new _Table.Table();
	    table.players.push(player);
	    table.phase = 'open';

	    var updateView = function updateView() {
	        $('.player .player-info').html('player: <b>+' + player.getAttack() + '</b>');
	        var wielded = $('.player .wielded');
	        wielded.html('');
	        player.wielded.map(function (x) {
	            var c = _Card.Card.byId(x);
	            var t = [];
	            t.push(_l(c, x));
	            if (c.getAttackFor) {
	                t.push('<b>+' + c.getAttackFor(player) + '</b>');
	            }
	            if (c.big) {
	                t.push('big');
	            }
	            t.push(c.type);
	            if (c.wieldable) {
	                t.push('<a class="unwield" href="#">unwield</a>');
	            }
	            t.push('<a class="to-belt" href="#">to belt</a>');
	            t.push('<a class="discard" href="#">discard</a>');
	            wielded.append('<li>' + t.join(' | ') + '</li>');
	        });
	        var hand = $('.player .hand');
	        hand.html('');
	        player.hand.map(function (x) {
	            var c = _Card.Card.byId(x);
	            var t = [];
	            t.push(_l(c, x));
	            if (c.getAttackFor) {
	                t.push('<b>+' + c.getAttackFor(player) + '</b>');
	            }
	            if (c.big) {
	                t.push('big');
	            }
	            t.push(c.type);
	            if (c.wieldable) {
	                t.push('<a class="wield" href="#">wield</a>');
	            }
	            if (c.usable) {
	                t.push('<a class="use" href="#">use</a>');
	            }
	            if (c.castable) {
	                t.push('<a class="cast" href="#">cast</a>');
	            }
	            t.push('<a class="to-belt" href="#">to belt</a>');
	            t.push('<a class="discard" href="#">discard</a>');
	            hand.append('<li>' + t.join(' | ') + '</li>');
	        });
	        var belt = $('.player .belt');
	        belt.html('');
	        player.belt.map(function (x) {
	            var c = _Card.Card.byId(x);
	            var t = [];
	            t.push(_l(c, x));
	            if (c.getAttackFor) {
	                t.push('<b>+' + c.getAttackFor(player) + '</b>');
	            }
	            if (c.big) {
	                t.push('big');
	            }
	            t.push(c.type);
	            if (c.wieldable) {
	                t.push('<a class="wield" href="#">wield</a>');
	            }
	            if (c.usable) {
	                t.push('<a class="use" href="#">use</a>');
	            }
	            if (c.castable) {
	                t.push('<a class="cast" href="#">cast</a>');
	            }
	            t.push('<a class="discard" href="#">discard</a>');
	            belt.append('<li>' + t.join(' | ') + '</li>');
	        });
	        var dDoors = $('.table .discardedDoors');
	        dDoors.html('');
	        [].concat(table.discardedDoors).reverse().map(function (x) {
	            dDoors.append('<li>' + x + '</li>');
	        });
	        var dTreasure = $('.table .discardedTreasure');
	        dTreasure.html('');
	        [].concat(table.discardedTreasure).reverse().map(function (x) {
	            dTreasure.append('<li>' + x + '</li>');
	        });
	        if (table.fight) {
	            (function () {
	                $('.fight .result').html(table.fight.getWinningSide());
	                $('.p-attack').html(table.fight.getPlayersAttack());
	                $('.m-attack').html(table.fight.getMonstersAttack());
	                var mList = $('.monsters-list');
	                mList.html('');
	                table.fight.monsters.map(function (x) {
	                    mList.append('<li>' + x.monster + '</li>');
	                });
	            })();
	        }
	        // const pList = $('.players-list');
	        // table.fight.players.map(x => {
	        //     pList.append('<li><ul><li>modifiers</li></ul></li>')
	        // });
	        rebindHooks();
	    };
	    var add = function add() {
	        var item = $('.player .add');
	        if (!_Card.Card.byId(item.val())) {
	            alert('no such card');
	            return false;
	        }
	        player.hand.push(item.val());
	        item.val('');
	        updateView();
	    };
	    var rebindHooks = function rebindHooks() {
	        $('.player .addButton').click(function (e) {
	            add();
	            return false;
	        });
	        $('.player .hand .wield').click(function (e) {
	            var id = /<a.*?>(.*?)<\/a>/.exec($(e.target).closest('li').html())[1];
	            console.log(id);
	            if (player.wield(id, table)) {
	                player.hand.splice(player.hand.indexOf(id), 1);
	            }
	            updateView();
	            return false;
	        });
	        $('.player .belt .wield').click(function (e) {
	            var id = /<a.*?>(.*?)<\/a>/.exec($(e.target).closest('li').html())[1];
	            console.log(id);
	            if (player.wield(id, table)) {
	                player.belt.splice(player.belt.indexOf(id), 1);
	            }
	            updateView();
	            return false;
	        });
	        $('.player .hand .use').click(function (e) {
	            var id = /<a.*?>(.*?)<\/a>/.exec($(e.target).closest('li').html())[1];
	            if (_Card.Card.byId(id).canBeUsed(player, table)) {
	                player.hand.splice(player.hand.indexOf(id), 1);
	                if (_Card.Card.byId(id).onUsed(player, table)) {
	                    table.discard(id);
	                }
	            }
	            updateView();
	            return false;
	        });
	        $('.player .hand .cast').click(function (e) {
	            var id = /<a.*?>(.*?)<\/a>/.exec($(e.target).closest('li').html())[1];
	            if (_Card.Card.byId(id).canBeCast(player, 'gelatinous_octahedron', table)) {
	                player.hand.splice(player.hand.indexOf(id), 1);
	                // TODO: add variety :)
	                var dest = '';
	                if (id == 'cotion_of_ponfusion') {
	                    dest = 'gelatinous_octahedron';
	                } else {
	                    dest = player;
	                }
	                if (_Card.Card.byId(id).onCast(player, dest, table)) {
	                    table.discard(id);
	                }
	            }
	            updateView();
	            return false;
	        });

	        $('.player .wielded .to-belt').click(function (e) {
	            var id = /<a.*?>(.*?)<\/a>/.exec($(e.target).closest('li').html())[1];
	            player.unwield(id, table);
	            player.belt.push(id);
	            updateView();
	            return false;
	        });

	        $('.player .hand .discard').click(function (e) {
	            var id = /<a.*?>(.*?)<\/a>/.exec($(e.target).closest('li').html())[1];
	            player.hand.splice(player.hand.indexOf(id), 1);
	            table.discard(id);
	            updateView();
	            return false;
	        });
	        $('.player .wielded .discard').click(function (e) {
	            var id = /<a.*?>(.*?)<\/a>/.exec($(e.target).closest('li').html())[1];
	            player.unwield(id, table);
	            table.discard(id);
	            updateView();
	            return false;
	        });
	        $('.player .belt .discard').click(function (e) {
	            var id = /<a.*?>(.*?)<\/a>/.exec($(e.target).closest('li').html())[1];
	            player.belt.splice(player.belt.indexOf(id), 1);
	            table.discard(id);
	            updateView();
	            return false;
	        });
	    };

	    $('.player .add').keypress(function (e) {
	        if (e.which == 13) {
	            add();
	            return false;
	        }
	    });
	    $('#id').keypress(function (e) {
	        if (e.which == 13) {
	            $('#img').html('<img width="330" height="524" src="' + __l($('#id').val()) + '">');
	        }
	    });

	    updateView();
	});

/***/ },
/* 118 */
/***/ function(module, exports) {

	"use strict";

	function actionAttack() {}

	function actionSmivka() {}

/***/ },
/* 119 */
/***/ function(module, exports) {

	"use strict";

	function over(obj) {
	    obj.width *= 2;
	    obj.height *= 2;
	    obj.y = game.height - obj.height / 2;
	    for (var i = obj.iter + 1; i < ccount; i++) {
	        cards[i].sendToBack();
	    }
	    down_lower.sendToBack();
	    for (var i = 0; i <= obj.iter; i++) {
	        cards[i].bringToTop();
	    }
	}
	function out(obj) {
	    obj.width /= 2;
	    obj.height /= 2;
	    obj.y = game.height - obj.height / 2;
	}
	function down(obj) {}

	function ChatOpen() {
	    if (paper.x == 0) paper.x = paper.width;else {
	        sendMsg();
	    }
	}
	function ChatClose() {
	    paper.x = 0;
	}
	function sendMsg() {}

/***/ },
/* 120 */
/***/ function(module, exports) {

	'use strict';

	function load() {
	    game.load.image('down_lower', 'img/back_lower.jpg');
	    game.load.image('up_lower', 'img/up_lower.jpg');
	    for (var i = 0; i < ccount; i++) {
	        game.load.image('doors' + i, 'packs/pack1/img/doors-' + i + '.png');
	    }game.load.image('monster', 'img/monster.png');
	    game.load.image('warrior', 'img/warrior.png');
	    game.load.image('grass', 'img/grass.png');
	    game.load.image('cobble', 'img/cobble.png');
	    game.load.image('paper', 'img/paper.png');
	    openChat = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
	    openChat.onDown.add(ChatOpen, this);
	    closeChat = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
	    closeChat.onDown.add(ChatClose, this);
	    keyboard = Phaser.Keyboard(game);
	    //keyboard.processKeyPress();
	    game.load.image('knife', 'img/knife.png');
	    game.load.image('nosok', 'img/nosok.png');
	}

	function create_lower() {
	    down_lower = game.add.image(0, 0, 'down_lower');
	    down_lower.width = game.width;
	    upper_lower = game.add.image(0, 0, 'up_lower');
	    scale = 0.75;
	    upper_lower.height = game.height * scale;
	    upper_lower.width = game.width * scale;
	    scale = 0.875;
	}

	function create_info() {
	    level = game.add.text(game.width * scale, 30, "", { font: "Pixeled", fontSize: game.height * 0.04 + "px", fill: "#6B534B" });
	    level.anchor.setTo(0.5, 0.5);
	    level.level = 0;
	    level.text = "Your Level = " + level.level;
	    grass = game.add.image(game.width * scale, 400, 'grass');
	    grass.width = game.width * 0.2;
	    grass.height = grass.width * 3 / 5;
	    grass.anchor.setTo(0.5, 0.5);
	    grass.y = 60 + grass.height / 2;
	    knight = game.add.image(game.width * scale, 400, 'warrior');
	    knight.anchor.setTo(0.5, 0.5);
	    knight.height = grass.height - 10;
	    knight.width = knight.height;
	    knight.y = 65 + knight.height / 2;
	    knight.x = knight.x - knight.width / 5;
	    power = game.add.text(game.width * scale, 400, '', { font: "Pixeled", fontSize: game.height * 0.11 + "px", fill: "#FF6836" });
	    power.power = 99;
	    power.text = power.power;
	    power.y = grass.y;
	    power.anchor.setTo(0.5, 0.5);
	    power.x = power.x + knight.width / 5 + 30;
	    cobble = game.add.image(game.width * scale, 400, 'cobble');
	    cobble.anchor.setTo(0.5, 0.5);
	    cobble.width = grass.width;
	    cobble.height = grass.height;
	    cobble.y = grass.y + grass.height * 1.1;
	    monster = game.add.image(game.width * scale, 400, 'monster');
	    monster.height = cobble.height - 30;
	    monster.width = monster.height * 1.1;
	    monster.y = cobble.y;
	    monster.anchor.setTo(0.5, 0.5);
	    monster.x = monster.x - monster.width / 2.7;
	    antipower = game.add.text(game.width * scale, 400, '', { font: "Pixeled", fontSize: game.height * 0.11 + "px", fill: "#FFBAA3" });
	    antipower.antipower = 99;
	    antipower.anchor.setTo(0.5, 0.5);
	    antipower.text = antipower.antipower;
	    antipower.y = monster.y;
	    antipower.x = power.x;
	}

	function create_cards() {
	    for (var i = 0; i < ccount; i++) {
	        cards[i] = game.add.image(0, 0, 'doors' + i);
	        cards[i].anchor.setTo(0.5, 0.5);
	        cards[i].height = game.height * 0.25;
	        cards[i].width = cards[i].height / 1028 * 661;
	        cards[i].y = game.height - cards[i].height / 2;
	        cards[i].iter = i;
	        cards[i].inputEnabled = true;
	        cards[i].events.onInputOver.add(over);
	        cards[i].events.onInputDown.add(down);
	        cards[i].events.onInputOut.add(out);
	        console.log(ccount * cards[i].width);
	        if (ccount * cards[i].width < game.width) cards[i].x = cards[i].width / 2 + i * cards[i].width;
	        if (ccount * cards[i].width > game.width) cards[i].x = cards[i].width / 2 + i * cards[i].width * game.width / (ccount * cards[i].width);
	    }
	}

	function create_chat() {
	    paper = game.add.image(100, 100, 'paper');
	    paper.anchor.setTo(1, 0.5);
	    paper.y = game.height / 2;
	    paper.x = 0;
	}

	function create_buttons() {
	    buttonAttack = game.add.button(0, 0, 'knife', actionAttack);
	    buttonAttack.visible = false;
	    buttonAttack.anchor.setTo(0.5, 0.5);

	    buttonSmivka = game.add.button(0, 0, 'nosok', actionSmivka);
	    buttonSmivka.visible = false;
	    buttonSmivka.anchor.setTo(0.5, 0.5);
	}

/***/ }
/******/ ]);