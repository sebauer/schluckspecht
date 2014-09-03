var serverConfig = require('../server/config.js');

module.exports = {
  testWebServerPort: '3000', // server, which is setup by acceptance test
  restApiPort: serverConfig.restApiPort,
  restAPIEndpoint: '/service',
  startRestServerCmd: 'node ../server/app.js --mock-db',
  runCucumberTestsCmd: 'cucumber-js'
};
