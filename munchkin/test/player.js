/**
 * Created by ionagamed on 8/25/16.
 */

import Server from '../../logic/Server';

export function registerPlayerHooks() {
    $('.wield').unbind('click').click(e => {
        const id = $(e.target).closest('li').data('id');
        Server.wieldCard(id);
    });
    $('.unwield').unbind('click').click(e => {
        const id = $(e.target).closest('li').data('id');
        Server.unwieldCard(id);
    });
    $('.use').unbind('click').click(e => {
        const id = $(e.target).closest('li').data('id');
        Server.useCard(id);
    });
    $('.discard').unbind('click').click(e => {
        const id = $(e.target).closest('li').data('id');
        Server.discard(id);
    });
}