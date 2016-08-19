/**
 * Created by ionagamed on 8/19/16.
 */

export class Item {
    static canBeWielded(player, table) {
        return table.fight == null;
    }
}