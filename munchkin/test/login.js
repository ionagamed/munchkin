/**
 * Created by ionagamed on 8/25/16.
 */

export function registerLoginHooks(callback) {
    $('.loginButton').click(e => {
        const username = $('#username').val();
        const room = $('#room').val();
        const addr = $('#server').val();
        callback(username, addr, room);
    });
}