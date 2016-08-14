/**
 * Created by ionagamed on 8/14/16.
 */

import { Card } from '../../../Card';

const id = 'curse_lose_armor';

class CurseLoseArmor extends Card {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'curse';
        this.castable = true;
    }
    onCast(source, dest, table) {
        for (let i of dest.wielded) {
            if (Card.byId(i).type === 'armor') {
                dest.unwield(i);
                Card.byId(i).onUnwielded(dest, table);
                Card.byId(i).onDisposed(table);
                table.dispose(i);
            }
        }
    }
}
Card.cards[id] = new CurseLoseArmor();
