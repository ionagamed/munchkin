/**
 * Created by ionagamed on 8/24/16.
 */
import { Player } from './Player';
import { create_cards } from '../munchkin/load.js'
import { player } from '../munchkin/munchkin.js'

class Server {
    constructor() {
        /**
         * The connection to the server
         *
         * @type {WebSocket}
         */
        this.websocket = null;
        
        /**
         * Player reference
         *
         * @type {Player}
         */
        this.player = null;
        /**
         * Table reference
         *
         * @type {Table}
         */
        this.table = null;
    }

    /**
     * Connect to the server
     * 
     * @param {string} name username
     * @param {string} addr server address
     * @param {string} room room name
     * @param {function} [callback] called when the server is ready to receive
     */
     connect(name, addr, room, callback) {
        this.websocket = new WebSocket(`ws://${addr}/?userName=${name}&room=${room}`);
        this.websocket.onopen = callback;
        var self = this;
        this.websocket.onmessage = (d) => {
            self._onMessage(d);
        };
    }

    /**
     * Should never be called by client himself
     * Called when server receives a message from server
     * 
     * @param data
     */
     _onMessage(data) {
        const msg = JSON.parse(data.data);
        if (msg.event != 'room') {
            console.log(msg);
        }
        // TODO: add handling
        switch (msg.event) {
            case 'gotCards':
                this.table.players.map(x => {
                    if (x.name == msg.data.who) {
                        x.hand = x.hand.concat(msg.data.cards);
                    }
                });
                break;
            case 'gotSomeCards':
                this.table.players.map(x => {
                    if (x.name == msg.data.who && x.name != this.player.name) {
                        for (let i = 0; i < msg.data.amount; i++) {
                            x.hand.push('blank');
                        }
                    }
                });
                break;
            case 'wieldedCard':
                this.table.players.map(x => {
                    if (x.name == msg.data.who) {
                        x.wield(msg.data.card, this.table);
                        x.hand = x.hand.filter(x => x != msg.data.card);
                        x.belt = x.belt.filter(x => x != msg.data.card);
                    }
                });
                break;
            case 'unwieldedCard':
                this.table.players.map(x => {
                    if (x.name == msg.data.who) {
                        x.unwield(msg.data.card, this.table);
                    }
                });
                break;
            case 'room':
                Object.assign(this.table, msg.data.table);
                this.table.players.map(x => {
                    if (x.name == this.player.name) {
                        Object.assign(this.player, x);
                    }
                });
                break;
            case 'gameStarted':
                if (this.onGameStarted) {
                    this.onGameStarted();
                }
                break;
        }
    }
    
    _send(obj) {
        this.websocket.send(JSON.stringify(obj));
    }

    /**
     * Start the game, when already in room
     */
    start() {
        this._send({
            cmd: 'start'
        });
    }

    /**
     * Request the room
     */
    roomRequest() {
        this._send({
            cmd: 'roomRequest'
        });
    }

    /**
     * When in room, sit down and play
     */
    play() {
        this._send({
            cmd: 'play'
        });
    }

    /**
     * When playing, spectate
     */
    spectate() {
        this._send({
            cmd: 'spectate'
        });
    }

    /**
     * When dead, get new cards and become not dead
     */
    resurrect() {
        this._send({
            cmd: 'resurrect'
        });
    }

    /**
     * Try escaping from a monster with specified id in fight
     * 
     * @param from
     */
    escape(from) {
        this._send({
            cmd: 'escape',
            data: {
                from: from
            }
        });
    }

    /**
     * Kick the door
     */
    kickDoor() {
        this._send({
            cmd: 'kickDoor'
        });
    }

    /**
     * After kicking the door and not fighting the monster
     */
    lootTheRoom() {
        this._send({
            cmd: 'lootTheRoom'
        });
    }

    /**
     * Wield the card
     * 
     * @param {string} card
     */
    wieldCard(card) {
        this._send({
            cmd: 'wieldCard',
            data: {
                card: card,
            }
        });
    }

    /**
     * Unwield the card
     * 
     * @param {string} card
     */
    unwieldCard(card) {
        this._send({
            cmd: 'unwieldCard',
            data: {
                card: card
            }
        });
    }

    /**
     * Use the card
     * 
     * @param {string} card
     */
    useCard(card) {
        this._send({
            cmd: 'useCard',
            data: {
                card: card
            }
        });
    }

    /**
     * Cast the card
     * 
     * @param {string} card
     * @param {Player|string} dest
     */
    castCard(card, dest) {
        if (dest instanceof Player) {
            this._send({
                cmd: 'castCard',
                data: {
                    card: card,
                    on: {
                        type: 'player',
                        name: dest.name
                    }
                }
            })
        } else {
            this._send({
                cmd: 'castCard',
                data: {
                    card: card,
                    on: {
                        type: 'monster',
                        name: dest
                    }
                }
            })
        }
    }

    /**
     * Move to the belt
     *
     * @param {string} card
     */
    moveToBelt(card) {
        this._send({
            cmd: 'moveToBelt',
            data: {
                card: card
            }
        });
    }

    /**
     * Send chat message
     * 
     * @param {string|'broadcast'} to
     * @param {string} text
     */
    sendChatMessage(to, text) {
        this._send({
            cmd: 'sendChatMessage',
            data: {
                to: to,
                text: text
            }
        });
    }

    /**
     * Get a card from a specific player
     * 
     * @param {string} player name
     * @param {number} pos
     * @param {'open'|'close'} method
     */
    getCardFromPlayer(player, pos, method){
        this._send({
            cmd: 'getCardFromPlayer',
            data: {
                from: player,
                cardPos: pos,
                method: method
            }
        });
    }

    /**
     * Discard. Nuff said
     * 
     * @param {string} card
     */
    discard(card) { 
        this._send({
            cmd: 'discard',
            data: {
                card: card
            }
        });
    }
}
if (!document.____SeRvEr____) {
    document.____SeRvEr____ = new Server();
}
export default document.____SeRvEr____;

