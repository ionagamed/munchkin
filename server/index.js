var express = require('express');
var app = express();

app.use(express.static('client'));
app.use('/lib', express.static('bower_components'));

var port = process.env.PORT || 3001;
app.listen(port, function () {
    console.log('Application started on port ' + port);
});
