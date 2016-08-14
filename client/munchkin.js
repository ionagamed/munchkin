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

	var _packs = __webpack_require__(4);

	var _packs2 = _interopRequireDefault(_packs);

	var _dice = __webpack_require__(11);

	var _dice2 = _interopRequireDefault(_dice);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by ionagamed on 8/11/16.
	 */

	$(function () {
	    document.ws = new WebSocket("ws://localhost:8081");
	    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
	        preload: preload,
	        create: create,
	        update: update
	    });

	    function preload() {
	        for (var i in _packs2.default.pack1.doors) {
	            if (_packs2.default.pack1.doors.hasOwnProperty(i)) game.load.image('pack1_door_' + _packs2.default.pack1.doors[i], 'packs/pack1/img/doors-' + i + '.png');
	        }
	        for (var _i in _packs2.default.pack1.treasure) {
	            if (_packs2.default.pack1.treasure.hasOwnProperty(_i)) game.load.image('pack1_treasure_' + _packs2.default.pack1.treasure[_i], 'packs/pack1/img/treasure-' + _i + '.png');
	        }
	    }

	    function create() {
	        var player = new _Player.Player();
	        player.wielded.push('mithril_armor');
	        console.log(player.wielded);
	        _Card.Card.byId('curse_lose_armor').onCast('deck', player);
	        console.log(player.wielded);
	        $('#escape').click(function (e) {
	            _Card.Card.byId('gelatinous_octahedron').onEscape(player, (0, _dice2.default)());
	        });
	    }

	    function update() {}
	});

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
	     * @param player Player who dealt the card
	     */
	    value: function onDealtOpen(player) {}

	    /**
	     * Called on dealing card in closed way (such that only himself can see the content)
	     *
	     * @param player Player who dealt the card
	     */

	  }, {
	    key: 'onDealtClose',
	    value: function onDealtClose(player) {}

	    /**
	     * Called when a card is received from some source
	     * Source could be another player, the deck, looting
	     *
	     * @param player Player
	     * @param source Player|'deck'|'looting'
	     */

	  }, {
	    key: 'onReceived',
	    value: function onReceived(player, source) {}

	    /**
	     * Called when a card is cast on a player
	     * 
	     * @param source Player|'deck'
	     * @param destination Player
	     */

	  }, {
	    key: 'onCast',
	    value: function onCast(source, destination) {}

	    /**
	     * Determines if a card could be used by a player
	     * 
	     * @param player
	     * @returns {boolean}
	     */

	  }, {
	    key: 'canBeUsed',
	    value: function canBeUsed(player) {
	      if (!this.usable) {
	        return false;
	      }
	    }

	    /**
	     * Called when a card is used by player
	     * 
	     * @param player
	     */

	  }, {
	    key: 'onUsed',
	    value: function onUsed(player) {}

	    /**
	     * Determines if a card could be wielded by a player
	     * 
	     * @param player
	     * @returns {boolean}
	     */

	  }, {
	    key: 'canBeWielded',
	    value: function canBeWielded(player) {
	      if (!this.wieldable) {
	        return false;
	      }
	    }

	    /**
	     * Called when a card is wielded by player
	     * 
	     * @param player
	     */

	  }, {
	    key: 'onWielded',
	    value: function onWielded(player) {}

	    /**
	     * Called whan a card is unwielded by player
	     * 
	     * @param player
	     */

	  }, {
	    key: 'onUnwielded',
	    value: function onUnwielded(player) {}

	    /**
	     * Called when a card is being disposed (removed from everywhere and placed into discarded deck)
	     */

	  }, {
	    key: 'onDisposed',
	    value: function onDisposed() {}
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
	  function Player() {
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
	    this.name = '';

	    /**
	     * Player level
	     *
	     * @type {number}
	     */
	    this.level = 1;
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
	     * 
	     * @param card string
	     */

	  }, {
	    key: 'wield',
	    value: function wield(card) {
	      this.wielded.push(card);
	    }

	    /**
	     * Unwield a card
	     * 
	     * @param card string
	     */

	  }, {
	    key: 'unwield',
	    value: function unwield(card) {
	      this.wielded = this.wielded.filter(function (x) {
	        return x != card;
	      });
	    }

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

/***/ },
/* 4 */
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
	        doors: ['gelatinous_octahedron', 'ghoulfiends', 'harpies', 'hippogriff', 'insurance_salesman', '3872_orcs', 'amazon', 'bigfoot', 'bullrog', 'crabs', 'curse_lose_small_item_1', 'curse_lose_small_item_2', 'curse_lose_armor', 'curse_lose_footgear', 'curse_lose_headgear', 'wizard_1', 'curse_change_class', 'curse_change_race', 'curse_change_sex', 'curse_chicken', 'halfling_1', 'halfling_2', 'thief_1', 'thief_2', 'thief_3', 'half-breed_2', 'help_me_out_here', 'illusion', 'mate', 'out_to_lunch', 'squidzilla', 'stoned_golem', 'tongue_demon', 'undead_horse', 'horror', 'ancient', 'baby', 'enraged', 'humongous', 'intelligent', 'maul_rat', 'mr_bones', 'net_troll', 'pit_bull', 'platycore', 'cleric_1', 'cleric_2', 'cleric_3', 'dwarf_1', 'dwarf_2', 'plutonium_dragon', 'potted_plant', 'pukachu', 'shrieking_geek', 'snails_on_speed', 'dwarf_3', 'elf_1', 'elf_2', 'elf_3', 'halfling_3', 'king_tut', 'lame_goblin', 'large_angry_chicken', 'lawyers', 'leperchaun', 'drooling_slime', 'face_sucker', 'floating_nose', 'flying_frogs', 'gazebo', 'curse_lose_two_cards', 'curse_lose_class', 'curse_lose_race', 'curse_malign_mirror', 'truly_obnoxious_curse', 'curse_duck_of_doom', 'curse_income_tax', 'curse_lose_big_item', 'curse_lose_level_1', 'curse_lose_level_2', 'warrior_1', 'warrior_2', 'warrior_3', 'wizard_2', 'wizard_3', 'super_munchkin_1', 'super_munchkin_2', 'wandering_monster_1', 'wandering_monster_2', 'wandering_monster_3', 'wannabe_vampire', 'wight_brothers', 'cheat', 'divine_intervention', 'half-breed_2'],
	        treasure: ['magic_lamp', 'pollymorph_potion', 'transferral_potion', 'wand_of_dowsing', 'wishing_ring', 'spiky_knees', 'staff_of_napalm', 'stepladder', 'swiss_army_polearm', 'doppelganger', 'flaming_armor', 'gentlemans_club', 'hammer_of_kneecapping', 'helm of courage', 'horny_helmet', 'bad-ass_bandanna', 'boots_of_butt-kicking', 'bow_with_ribbons', 'broad_sword', 'buckler_of_swashing', 'cotion_of_ponfusion', 'acid_potion', 'flaming_poison_potion', 'freezing_explosive_potion', 'magic_missile', 'pantyhose_of_giant_strength', 'pointy_hat_of_power', 'rapier_of_unfairness', 'rat_on_a_stick', 'really_impressive_title', '1000_gold', 'boil_an_anthill', 'bribe_gm_with_food', 'convenient_addition_error', 'invoke_obscure_rules', 'wishing_ring', 'boots_of_running_really_fast', 'hireling', 'hoard', 'kneepads_of_allure', 'flask_of_glue', 'friendship_potion', 'instant_wall', 'invisibility_potion', 'loaded_die_1', 'huge_rock', 'leather_armor', 'sandwich', 'mace_of_sharpiness', 'mithril_armor', 'chainsaw', 'cheese_grater_of_piece', 'cloak_of_obscurity', 'dagger_of_treachery', 'eleven-foot_pole', 'nasty-tasting_sports_drink', 'potion_of_halitosis', 'potion_of_idiotic_bravery', 'pretty_balloons', 'sleep_potion', 'shield_of_ubiquity', 'short_wide_armor', 'singing_and_dancing_sword', 'slimy_armor', 'sneaky_bastard_sword', 'kill_the_hireling', 'mutilate_the_bodies', 'potion_of_general_studliness', 'whine_at_the_gm', 'yuppie_water', 'go_up_a_level', 'steal_a_level', 'tuba_of_charm', 'sandals_of_protection', 'q-dice']
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
	            __webpack_require__(5)("./" + i);
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
	            __webpack_require__(9)("./" + _i);
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./curse_lose_armor": 6,
		"./curse_lose_armor.js": 6,
		"./curse_lose_small_item": 7,
		"./curse_lose_small_item.js": 7,
		"./gelatinous_octahedron": 8,
		"./gelatinous_octahedron.js": 8
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
	webpackContext.id = 5;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card2 = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/14/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'curse_lose_armor';

	var CurseLoseArmor = function (_Card) {
	    _inherits(CurseLoseArmor, _Card);

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
	        value: function onCast(source, dest) {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = dest.wielded[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var i = _step.value;

	                    if (_Card2.Card.byId(i).type === 'armor') {
	                        dest.unwield(i);
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

	    return CurseLoseArmor;
	}(_Card2.Card);

	_Card2.Card.cards[id] = new CurseLoseArmor();

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card2 = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/14/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'curse_lose_small_item';

	var CurseLoseSmallItem = function (_Card) {
	    _inherits(CurseLoseSmallItem, _Card);

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
	            dest.dropSmallItem();
	        }
	    }]);

	    return CurseLoseSmallItem;
	}(_Card2.Card);

	_Card2.Card.cards[id + '_1'] = new CurseLoseSmallItem();
	_Card2.Card.cards[id + '_2'] = new CurseLoseSmallItem();

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Card2 = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/13/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'gelatinous_octahedron';

	var GelatinousOctahedron = function (_Card) {
	    _inherits(GelatinousOctahedron, _Card);

	    function GelatinousOctahedron() {
	        _classCallCheck(this, GelatinousOctahedron);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GelatinousOctahedron).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'door';
	        _this.type = 'monster';
	        return _this;
	    }

	    _createClass(GelatinousOctahedron, [{
	        key: 'onEscape',
	        value: function onEscape(player, dice) {
	            dice += 1;
	            if (dice >= 5) {
	                console.log('successful escape');
	                return true;
	            } else {
	                console.log('nop');
	                // TODO: do a bad thing
	            }
	        }
	    }]);

	    return GelatinousOctahedron;
	}(_Card2.Card);

	_Card2.Card.cards[id] = new GelatinousOctahedron();

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./mithril_armor": 10,
		"./mithril_armor.js": 10
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
	webpackContext.id = 9;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Card2 = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ionagamed on 8/14/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var id = 'mithril_armor';

	var MithrilArmor = function (_Card) {
	    _inherits(MithrilArmor, _Card);

	    function MithrilArmor() {
	        _classCallCheck(this, MithrilArmor);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MithrilArmor).call(this));

	        _this.id = id;
	        _this.pack = 'pack1';
	        _this.kind = 'treasure';
	        _this.type = 'armor';
	        _this.big = true;
	        _this.wieldable = true;
	        return _this;
	    }

	    return MithrilArmor;
	}(_Card2.Card);

	_Card2.Card.cards[id] = new MithrilArmor();

/***/ },
/* 11 */
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

/***/ }
/******/ ]);