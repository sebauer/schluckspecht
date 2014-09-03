var express = require('express');
var http = require('http');
var app = express();

app.use(express.static(__dirname + '/build'));

if (!module.parent) {
  http.createServer(app).listen(process.env.PORT, function(){
    console.log("Server listening on port " + app.get('port'));
  });
}
module.exports = app;
