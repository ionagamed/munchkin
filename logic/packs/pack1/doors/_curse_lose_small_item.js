/**
 * Created by ionagamed on 8/14/16.
 */

import { Card } from '../../../Card';
import { Curse } from '../helpers/Curse';

const id = 'curse_lose_small_item';

class CurseLoseSmallItem extends Curse {
    constructor() {
        super();
        this.id = id;
        this.pack = 'pack1';
        this.kind = 'door';
        this.type = 'curse';
        this.castable = true;
    }
    onCast(source, dest) {
        // dest.dropSmallItem();
        return true;
    }
}
Card.cards[id + '_1'] = new CurseLoseSmallItem();
Card.cards[id + '_2'] = new CurseLoseSmallItem();
