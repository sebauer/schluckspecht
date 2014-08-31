var serverConfig = require('../server/config.js');

module.exports = {
  testWebServerPort: '3000', // server, which is setup by acceptance test
  restApiPort: serverConfig.restApiPort,
  restAPIEndpoint: '/service',
  startRestServerCmd: {
    cmd: 'node',
    params: ['../server/app.js', '--mock-db']
  },
  runCucumberTestsCmd: {
    cmd: 'node',
    params: ['node_modules/cucumber/bin/cucumber.js']
  }
};
