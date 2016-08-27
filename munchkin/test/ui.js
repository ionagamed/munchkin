/**
 * Created by ionagamed on 8/25/16.
 */

import { Card } from '../../logic/Card';
import packs from '../../logic/packs';
import Server from '../../logic/Server';

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
    $('.itemId')
        .unbind('mouseenter')
        .unbind('mouseleave')
        .mouseenter(function (e) {
            const p = $('.popup');
            p.removeClass('hidden');
            p.css('bottom', 0);           
	    p.css('right', 0); 
	    $('.popup-image').attr('src', `${__l($(this).data('id'))}`);
        })
        .mouseleave(function (e) {
            $('.popup').addClass('hidden');
        });

    $('.winFight').unbind('click').click(e => {
        Server.winFight();
    });
    $('.escape').unbind('click').click(e => {
        Server.beginEscaping();
    });
    $('.m_escape').unbind('click').click(function (e) {
        const p = $(this).data('pos');
        Server.escape(p);
    });
    
    $('.help').unbind('click').click(e => {
        Server.tryHelping();
    });
    $('.acceptHelp').unbind('click').click(function (e) {
        const from = $(this).data('from');
        Server.acceptHelp(from);
    });
    
    let sendChatMessage = () => {
        const el = $('.chat-message');
        if (el.val() != '') {
            Server.sendChatMessage(el.val());
            el.val('');
        }
    };
    $('.chat-message').keypress(e => {
        if (e.which == 13) {
            sendChatMessage();
            return false;
        }
    });
    $('.send-chat-message').unbind('click').click(e => {
        sendChatMessage();
    });
}
