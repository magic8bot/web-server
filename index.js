const { NODE_ENV } = process.env

const isDev = NODE_ENV !== 'production'

if (isDev) {
  require('ts-node/register')
  require('./src')
} else {
  require('./dist')
}
