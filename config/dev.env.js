'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ENDPOINT: '"https://5d58ec6e6bf39a0014c6d4ca.mockapi.io/api/v2"'
})
