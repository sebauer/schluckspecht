var connect = require('connect');
var http = require('http');
var serveStatic = require('serve-static');
var proxy = require('proxy-middleware');
var url = require('url');
var exec = require('child_process').exec;
var config = require('./acceptance-test.config');

// console.log(process.cwd());

var restServer;
var cucumber;

var app = connect()
  //.use(connect.logger('dev'))
  .use(config.restAPIEndpoint, proxy(url.parse('https://localhost:' + config.restApiPort + '/')))
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

  restServer = exec(config.startRestServerCmd);

  console.log("REST Server pid is " + restServer.pid);

  restServer.stdout.on('data', function(data) {
    console.log("Line " + data);
    if (data.indexOf("Server started") != -1) {
      runCucumber();
    }
  });

  restServer.stderr.on('data', defaultErrorCallback);

  restServer.on('close', function(code) {
    console.log("close received for rest server");
    restServer = null;
    defaultCloseCallback(code);
  });
};

/*
  TODO: make unix compatible
*/
var runCucumber = function() {
  console.log("Trying to run cucumber tests");

  cucumber = exec(config.runCucumberTestsCmd);

  cucumber.stdout.on('data', function(data) {
    console.log("Line " + data);
    if (data.indexOf("Server started") != -1) {
      console.log("Running cucumber");
    }
  });

  cucumber.stderr.on('data', defaultErrorCallback);

  cucumber.on('close', function(code) {
    console.log("close received for cucumber: " + code);
    cucumber = null;
    defaultCloseCallback(code);
  });
};

/*
  This does not check yet, if process really has been killed
*/
var exit = function(code) {
  if (restServer) {
    kill("REST Server", restServer);
  }

  if (cucumber) {
    kill("cucumber.js", cucumber);
  }

  process.exit(code);
};

var kill = function(name, process) {
  console.log("killing " + name + " process with pid " + process.pid);
  try {
    process.kill('SIGINT');
  } catch (e) {
    console.log("error shutting down: " + process.pid);
    //console.log(e);
  }
};

var defaultErrorCallback = function(data) {
  console.log('stdout error: ' + data);
  exit(1);
};

var defaultCloseCallback = function(code) {
  console.log('closing code: ' + code);
  exit(code);
};
