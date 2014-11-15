var serverConfig = require('../server/config.js');

module.exports = {
  testWebServerPort: '3000',
  restApiPort: serverConfig.restApiPort,
  restAPIEndpoint: '/service',
  startRestServerCmd: {
    cmd: 'node',
    params: ['../server/app.js']
  }
};
