/**
 * Created by ionagamed on 8/25/16.
 */

import Server from '../../logic/Server';

export function registerPlayerHooks() {
    $('.wield').click(e => {
        const id = $(e.target).closest('li').data('id');
        Server.wieldCard(id);
        return false;
    });

    $('.itemId').hover(
        e => {
            $('.popup').removeClass('hidden');
            $('.popup-image').attr('src', $(e.target).data('uri'));
        },
        e => {
            $('.popup').addClass('hidden');
        }
    );
}