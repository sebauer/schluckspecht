var callbackHelper = require('../helper/callback-helper');
var bottleService = require('../service/bottle-service');

var _routes = [];
var _parameters = [];
var _callParams = [];
var _cbHelper = [];
var _server = {};
var _log = {};

var bottleServiceRouter = function(server, db, log){
  _server = server;
  _db = db;
  _log = log;
  bottleService.setConnection(_db);
}

bottleServiceRouter.prototype.addRoute = function(route, httpMethod, serviceMethod, parameters) {
  _log.info('Registered route %s', route);
  if(!(serviceMethod in bottleService)){
    _log.error('Method %s not known in bottle service!', serviceMethod);
    return;
  }
  if(!(httpMethod in _server)){
    _log.error('HTTP method %s unkown!', httpMethod);
    return;
  }
  if(parameters){
    _parameters[route] = parameters;
  }

  _routes[route] = _server[httpMethod](route, function(req, res){
    _log.info('Received call to %s', route);

    try {
      // Generate our callback handler
      _cbHelper[route] = new callbackHelper(req, res, _log).handleCallback;

      // Create array holding our parameters for this route
      _callParams[route] = [];

      // Check and validate for parameters
      if(route in _parameters){
        for(var i in _parameters[route]) {
          if(!(_parameters[route][i] in req.params)){
            throw new Error('Parameter '+_parameters[route][i]+' is missing');
          }
          // Now add the parameter to our parameter list
          _callParams[route].push(req.params[_parameters[route][i]]);
        }
      }
      // Add callback to list of parameters
      _callParams[route].push(_cbHelper[route]);

      // Execute service call
      _log.info('Processing call in bottle service');
      bottleService[serviceMethod].apply(this, _callParams[route]);
    } catch(e) {
      _log.error(e);
      res.send(500, e);
    }
  });
}

module.exports = bottleServiceRouter;
