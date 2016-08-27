import express from 'express';
import wss     from './websocket';
import bodyParser from 'body-parser';
import session from 'express-session';
var app = express();

app.use('/lib', express.static('bower_components'));
app.get('/', function (req, res) {
    return res.redirect('/test/test.html');
});
app.use(express.static('client'));

var port = process.env.PORT || 3001;
app.listen(port, function () {
    console.log('Application started on port ' + port);
});
