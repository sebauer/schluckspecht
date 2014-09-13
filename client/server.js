var connect = require('connect');
var http = require('http');
var serveStatic = require('serve-static');
var proxy = require('proxy-middleware');
var url = require('url');
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
var config = require('./acceptance-test.config');

// console.log(process.cwd());

var restServer;

var app = connect()
  //.use(connect.logger('dev'))
  .use(config.restAPIEndpoint, proxy(url.parse('http://localhost:' + config.restApiPort + '/')))
  .use(serveStatic('build'))
  //.use(connect.directory('public'))
  .use(function(req, res){
    res.end('Hello from Connect!\n');
  });

http.createServer(app).listen(config.testWebServerPort, function() {
  console.log("Base Server started");
  startRestServer();
});

var startRestServer = function() {
  // start REST-Server here
  console.log("Trying to start REST Server");

  restServer = spawn(config.startRestServerCmd.cmd, config.startRestServerCmd.params);

  console.log("REST Server pid is " + restServer.pid);

  restServer.stdout.on('data', function(data) {
    var buff = new Buffer(data);
    var line = buff.toString("UTF-8");

    console.log(line);
  });

  restServer.stderr.on('data', function(data) {
    var buff = new Buffer(data);
    var line = buff.toString("UTF-8");

    console.log(line);
  });

  restServer.on('close', function(code) {
    console.log("close received for rest server");
    restServer = null;
  });
};
