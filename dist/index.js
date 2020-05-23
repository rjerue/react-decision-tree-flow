
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-decision-tree-flow.cjs.production.min.js')
} else {
  module.exports = require('./react-decision-tree-flow.cjs.development.js')
}
