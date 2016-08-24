import * as global from './munchkin.js'
import { Card } from '../common/Card';

export function over(obj)
{
    obj.width *= 2;
    obj.height *= 2;
    obj.y = global.game.height - obj.height / 2;
    for (var i = obj.iter + 1; i < global.player.hand.length; i++) 
        global.cards[i].sendToBack();
    global.down_lower.sendToBack();
    for (var i = 0; i <= obj.iter; i++) 
        global.cards[i].bringToTop();
}
export function out(obj)
{
    obj.width /= 2;
    obj.height /= 2;
    obj.y = global.game.height - obj.height / 2;
}
export function down(obj)
{
    obj = Card.byId(obj);
    if (obj.wieldable) {
        console.log('1ol');
    }
}