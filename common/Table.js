/**
 * Created by tsmish on 13/08/16.
 */
import { Card } from 'Card'
import { Player } from 'Player'
export class Table {
	constructor() {
		/** 
		 * An array of players sitting on the table
		 * 
		 * @type [player] 
		 */
		var players = [];

		/**
		 * An array of currently active cards (in the middle of table)
		 *
		 * @type [string]
		 */
		var active_cards = [];

		/**
		 * An array of discarded cards
		 *
		 * @type [string]
		 */
		var discarded_cards = [];

		/**
		 * Determines if there is an active game playing
		 *
		 * @type {bool}
		 */

		var playing = false;

		/**
		 * Determines which player have a turn
		 *
		 * @type {string}
		 */
		 var turn = 0;
	}

	/**
	 * Get attack of currently active cards
	 */
	getAttack() {
		var ret = 0;
		this.active_cards.map(x => {
			ret += Card.byId(x).getBaseAttack();
		});
	}

	nextTurn() {
		turn = (turn + 1)%player.length;
	}

}

