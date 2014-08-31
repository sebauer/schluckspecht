var mongoose = require('mongoose');
var bunyan = require('bunyan');
var restify = require('restify');
var server = restify.createServer();

var config = require('./config');
var pjson = require('./package.json');
var bottleServiceRouter = require('./helper/bottle-service-router');

var log = bunyan.createLogger(
  {
    name: 'schluckspecht'
  }
);

log.info('Starting schluckspecht-server v%s', pjson.version);

server.use(restify.bodyParser());

log.info('Connecting with MongoDB..');
db = mongoose.connect(config.mongooseConnectionString);

bottleServiceRouter = new bottleServiceRouter(server, db, log);
bottleServiceRouter.addRoute('/bottle-service/bottle-types/get', 'get');
bottleServiceRouter.addRoute('/bottle-service/bottles/add', 'post');
bottleServiceRouter.addRoute('/bottle-service/bottle-types/add', 'post');

server.listen(config.restApiPort, function(){
  log.info('Server started and listening on %s', server.url);
});
