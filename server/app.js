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

server.post('/bottle-service/bottles/add', function(req, res){
  log.info('Received call to bottles/add');
  try {
    bottleService.addBottles(req.params.id, req.params.amount, function(err, result){
      if(err) {
        log.error(err);
        res.send(500, err);
      } else {
        log.info('Call succeeded');
        res.send(200, result);
      }
    });
  } catch(e){
    log.error(e);
    res.send(500, e);
  }
});

server.post('/bottle-service/bottle-types/add', function(req, res){
  log.info('Received call to bottle-types/add');
  try {
    bottleService.addBottleType(req.params.make, req.params.name, function(err, result){
      if(err) {
        log.error(err);
        res.send(500, err);
      } else {
        log.info('Call succeeded');
        res.send(200, result);
      }
    });
  } catch(e){
    log.error(e);
    res.send(500, e);
  }
});

server.listen(config.restApiPort, function(){
  log.info('Server started and listening on %s', server.url);
});
