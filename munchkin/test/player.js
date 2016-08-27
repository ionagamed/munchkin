/**
 * Created by ionagamed on 8/25/16.
 */

import Server from '../../logic/Server';

export function registerPlayerHooks(currentlySelling) {
    $('.wield').unbind('click').click(e => {
        const id = $(e.target).closest('li').data('id');
        Server.wieldCard(id);
    });
    $('.toBelt').unbind('click').click(e => {
        const id = $(e.target).closest('li').data('id');
        Server.moveToBelt(id);
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
    $('.kickDoor').unbind('click').click(e => {
        Server.kickDoor();
    });
    $('.closeDoor').unbind('click').click(e => {
        Server.lootTheRoom();
    });
    $('.endTurn').unbind('click').click(e => {
        Server.endTurn();
        $('body,html').animate({scrollTop:0},800);
    });
    $('.cast').unbind('click').click(e => {
        const wrapper = $('.cast-list-wrapper');
        wrapper.removeClass('hidden');
        wrapper.data('card', $(e.target).closest('li').data('id'));
    });
    $('.doCast').unbind('click').click(e => {
        const el = $(e.target);
        const type = el.data('type');
        const target = el.data('target');
        
        Server.castCard(el.closest('.cast-list-wrapper').data('card'), type, target);
        $('.cast-list-wrapper').addClass('hidden');
    });
    $('.sell').unbind('click').click(e => {
        currentlySelling.push($(e.target).closest('li').data('id'));
        $('.sell-list-wrapper').removeClass('hidden');
    });
    $('.sellAll').unbind('click').click(e => {
        Server.sellItems(currentlySelling);
        currentlySelling.splice(0, 10000);
        $('.sell-list-wrapper').addClass('hidden');
    });
}
