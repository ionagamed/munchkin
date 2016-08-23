function over(obj)
{
    obj.width *= 2;
    obj.height *= 2;
    obj.y = game.height - obj.height / 2;
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