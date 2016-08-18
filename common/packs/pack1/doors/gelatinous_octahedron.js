/**
 * Created by ionagamed on 8/13/16.
 */

import { Card } from '../../../Card';
import { Fight } from '../../../Fight';

const id = 'gelatinous_octahedron';

class GelatinousOctahedron extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'monster';
        this.usable = true;
    }
    
    canBeUsed(player, table) {
        return table.currentPlayer().name == player.name && table.phase == 'open' && table.fight == null;
    }

    onUsed(player, table) {
        table.fight = new Fight();
        table.fight.players.push({
            player: player,
            modifiers: []
        });
        table.fight.monsters.push({
            monster: this.id,
            modifiers: []
        });
    }
    
    onEscape(player, dice, table) {
        dice += 1;
        if (dice >= 5) {
            return true;
        } else {
            /*
             drop all big items
             */
            player.wielded.map(x => {
                if (Card.byId(x).big) {
                    player.unwield(x);
                    Card.byId(x).onDisposed(table);
                    table.dispose(x);
                }
            });
            player.belt.map((x, i) => {
                if (Card.byId(x).big) {
                    player.belt.splice(i, 1);
                    Card.byId(x).onDisposed(table);
                    table.dispose(x);
                }
            });
            player.hand.map((x, i) => {
                if (Card.byId(x).big) {
                    player.hand.splice(i, 1);
                    Card.byId(x).onDisposed(table);
                    table.dispose(x);
                }
            })
        }
    }
    
    getAttackFor(players) {
        return 2;
    }
    
    get treasureCount() {
        return 1;
    }
}
Card.cards[id] = new GelatinousOctahedron();