/**
 * Created by ionagamed on 8/28/16.
 */

export default function (type, text) {
    $('.alert-wrapper').html(`<div class='alert alert-${type}'>${text}<button type='button' class='close'>&times;</button></div>`);
    $('.alert .close').unbind('click').click(function (e) {
        $(this).closest('.alert').remove();
    });
}