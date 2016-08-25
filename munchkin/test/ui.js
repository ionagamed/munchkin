/**
 * Created by ionagamed on 8/25/16.
 */

import { Card } from '../../logic/Card';
import packs from '../../logic/packs';

function idToInt(id) {
    if (Card.byId(id).kind == 'door') {
        return packs.pack1.doors.indexOf(id);
    } else {
        return packs.pack1.treasure.indexOf(id);
    }
}
function __l(x) {
    const c = Card.byId(x);
    if (c.kind == 'door') {
        return '/packs/pack1/img/doors-' + idToInt(x) + '.png';
    } else {
        return '/packs/pack1/img/treasure-' + idToInt(x) + '.png';
    }
}

export function registerUIHooks() {
    $('.itemId').unbind('hover').hover(
        e => {
            $('.popup').removeClass('hidden');
            $('.popup-image').attr('src', `${__l($(e.target).data('id'))}`);
        },
        e => {
            $('.popup').addClass('hidden');
        }
    );
}