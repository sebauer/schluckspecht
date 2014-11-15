var _req = {};
var _res = {};
var _log = {};

var callbackHelper = function(req, res, log){
  _req = req;
  _res = res;
  _log = log;
}

callbackHelper.prototype.handleCallback = function(err, result) {
  if(err) {
    _log.error(err);
    _res.send(500, err);
  } else {
    _log.info('Call succeeded');
    _res.json(200, result);
  }
}

module.exports = callbackHelper;
