var mongoose = require('mongoose');
var bunyan = require('bunyan');
var restify = require('restify');
var server = restify.createServer();

var config = require('./config');
var pjson = require('./package.json');
var bottleService = require('./service/bottle-service');

var log = bunyan.createLogger(
  {
    name: 'schluckspecht'
  }
);

log.info('Starting schluckspecht-server v%s', pjson.version);

server.use(restify.bodyParser());

log.info('Connecting with MongoDB..');
db = mongoose.connect(config.mongooseConnectionString);
bottleService.setConnection(db);

server.post('/bottle-service/bottles/add/:id/:amount', function(req, res){
  bottleService.addBottles(req.id, req.amount);
});

server.listen(config.restApiPort, function(){
  log.info('Server started and listening on %s', server.url);
});
