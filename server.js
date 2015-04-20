var express = require('express');
var app = express();
// app.use('/', express.static(__dirname + '/public'));
app.use('/',express.static(__dirname + '/bower_components'));
app.use('/',express.static(__dirname + '/src/lib'));
app.use('/',express.static(__dirname + '/src/sample'));
app.listen(3000, function() { console.log('listening 3000')});