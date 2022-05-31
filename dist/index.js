
'use strict'
if (process.env.NODE_ENV === 'production') {
  console.log("Production")
  module.exports = require('./console-menu.js.cjs.production.min.js')
} else {
  console.log("development")
  module.exports = require('./console-menu.js.cjs.development.js')
}