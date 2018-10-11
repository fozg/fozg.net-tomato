process.env.NODE_ENV = 'production'
process.env.PUBLIC_URL = '/tomato'
var reactScriptsConfig = require('react-scripts/config/webpack.config.prod')
module.exports = Object.assign({}, reactScriptsConfig, {
  output: Object.assign({}, reactScriptsConfig.output, {
     path: __dirname +'/build/tomato'
  })
})