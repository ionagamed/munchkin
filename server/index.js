import express from 'express';
import wss     from './websocket';
import bodyParser from 'body-parser';
import session from 'express-session';
var app = express();

app.use('/lib', express.static('bower_components'));
app.use(bodyParser.urlencoded());
app.use(session({
    secret: process.env.SECRET || 'kappa kappa'
}));
app.post('/login', function (req, res) {
    req.session.username = req.body.username;
    return res.redirect('/game.html');
});
app.use('/', function (req, res, next) {
    // TODO: remove temp username
    req.session.username = 'abacaba';
    if (req.path == '/game.html') {
        if (!req.session.username) {
            return res.redirect('/login.html');
        }
    }
    next();
});
app.use(express.static('client'));

var port = process.env.PORT || 3001;
app.listen(port, function () {
    console.log('Application started on port ' + port);
});
