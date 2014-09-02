var callbackHelper = require('./callback-helper');
var bottleService = require('../service/bottle-service');

var _routes = [];
var _server = {};
var _log = {};

var bottleServiceRouter = function(server, db, log){
  _server = server;
  _db = db;
  _log = log;
  bottleService.setConnection(_db);
}

bottleServiceRouter.prototype.addRoute = function(route, httpMethod, serviceMethod) {
  _log.info('Registered route %s', route);
  if(!(serviceMethod in bottleService)){
    _log.error('Method %s not known in bottle service!', serviceMethod);
    return;
  }
  if(!(httpMethod in _server)){
    _log.error('HTTP method %s unkown!', httpMethod);
    return;
  }
  
  _routes[route] = _server[httpMethod](route, function(req, res){
    _log.info('Received call to %s', route);

    try {
      var cbHelper = new callbackHelper(req, res, _log);
      bottleService[serviceMethod](cbHelper.handleCallback);
    } catch(e) {
      _log.error(e);
      res.send(500, e);
    }
  });
}

module.exports = bottleServiceRouter;
