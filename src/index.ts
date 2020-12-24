import { dbDriver } from '../../db'
import { server } from './server'

const run = async () => {
  await dbDriver.connect('mongo')
  await server.init()
}

run()
