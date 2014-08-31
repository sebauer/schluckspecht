var mongoose = require('mongoose');
var bunyan = require('bunyan');
var restify = require('restify');
var server = restify.createServer();

var config = require('./config');
var pjson = require('./package.json');
var bottleService = require('./service/bottle-service');
var callbackHelper = require('./helper/callback-helper');

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

server.get('/bottle-service/bottle-types/get', function(req, res){
  log.info('Received call to bottle-types/get');

  try {
    var cbHelper = new callbackHelper(req, res, log);
    bottleService.getBottleTypes(cbHelper.handleCallback);
  } catch(e) {
    log.error(e);
    res.send(500, e);
  }
});

server.post('/bottle-service/bottles/add', function(req, res){
  log.info('Received call to bottles/add');

  try {
    var cbHelper = new callbackHelper(req, res, log);
    bottleService.addBottles(req.params.id, req.params.amount, cbHelper.handleCallback);
  } catch(e){
    log.error(e);
    res.send(500, e);
  }
});

server.post('/bottle-service/bottle-types/add', function(req, res){
  log.info('Received call to bottle-types/add');

  try {
    var cbHelper = new callbackHelper(req, res, log);
    bottleService.addBottleType(req.params.make, req.params.name, cbHelper.handleCallback);
  } catch(e){
    log.error(e);
    res.send(500, e);
  }
});

server.listen(config.restApiPort, function(){
  log.info('Server started and listening on %s', server.url);
});
