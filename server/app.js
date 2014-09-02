var mongoose = require('mongoose');
var bunyan = require('bunyan');
var restify = require('restify');
var server = restify.createServer();
server.use(restify.bodyParser());

var config = require('./config');
var pjson = require('./package.json');
var bottleServiceRouter = require('./helper/bottle-service-router');

var log = bunyan.createLogger(
  {
    name: 'schluckspecht'
  }
);

log.info('Starting schluckspecht-server v%s', pjson.version);

log.info('Connecting with MongoDB..');
db = mongoose.connect(config.mongooseConnectionString);

// Set up routes
bottleServiceRouter = new bottleServiceRouter(server, db, log);
bottleServiceRouter.addRoute('/bottle-service/bottle-types/add', 'post', 'addBottleType', ['make', 'name']);
bottleServiceRouter.addRoute('/bottle-service/bottle-types/get', 'get', 'getBottleTypes');
bottleServiceRouter.addRoute('/bottle-service/bottles/add', 'post', 'addBottles', ['bottleTypeId', 'amount']);
bottleServiceRouter.addRoute('/bottle-service/bottles/take', 'post', 'takeBottles', ['bottleTypeId', 'amount']);

// Start server
server.listen(config.restApiPort, function(){
  log.info('Server started and listening on %s', server.url);
});
