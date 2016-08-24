function over(obj)
{
    obj.width *= 2;
    obj.height *= 2;
    obj.y = game.height - obj.height / 2;
    for (var i = obj.iter + 1; i < ccount; i++) {
        cards[i].sendToBack();
    }
    down_lower.sendToBack();
    for (var i = 0; i <= obj.iter; i++) {
        cards[i].bringToTop();
    }
}
function out(obj)
{
    obj.width /= 2;
    obj.height /= 2;
    obj.y = game.height - obj.height / 2;
}
function down(obj)
{
    
}

function ChatOpen() {
    if (paper.x == 0)paper.x = paper.width;
    else {
        sendMsg();
    }
}
function ChatClose() {
    paper.x = 0;
}
function sendMsg(){}