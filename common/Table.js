/**
 * Created by tsmish on 13/08/16.
 */
import { Card } from './Card'
import { Player } from './Player'

export class Table {
    constructor() {
        /**
         * An array of players sitting on the table
         *
         * @type [player]
         */
        this.players = [];

        /**
         * An array of currently active cards (in the middle of table)
         *
         * @type [string]
         */
        this.activeCards = [];

        /**
         * An array of discarded doors
         *
         * @type [string]
         */
        this.discardedDoors = [];

        /**
         * An array of discarded treasure cards
         *
         * @type [string]
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
     * @param card
     */
    discard(card) {
        if (Card.byId(card).kind == 'door') {
            this.discardedDoors.push(card);
        } else if (Card.byId(card).kind == 'treasure') {
            this.discardedTreasure.push(card);
        }
    }

    /**
     * Return the player whose turn it is right now
     * 
     * @returns {Player}
     */
    currentPlayer() {
        return this.players[this.turn];
    }

    /**
     * Modifies the turn member so it points to the next player
     */
    nextTurn() {
        this.turn = (this.turn + 1) % this.players.length;
    }
}

