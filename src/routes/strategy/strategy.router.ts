import { InternalModel, StrategyModel } from '../../../../db'
import { Channel } from '../../../../smq/dist'
import { smq } from '../../services/smq.service'

import { BaseRouter } from '../base.router'
import { WalletRouter } from './wallet'

export class StrategyRouter extends BaseRouter {
  public static path = '/strategy'
  private static instance: StrategyRouter = null

  public static get router() {
    if (!StrategyRouter.instance) StrategyRouter.instance = new StrategyRouter()

    return StrategyRouter.instance.router
  }

  private constructor() {
    super()

    this.router.get('/', async ({ query: { exchange } }, res) => {
      const result = await StrategyModel.loadAllForExchange(exchange)
      res.send(result)
    })

    this.router.get('/list', async (req, res) => {
      const result = await InternalModel.getAllStrategies()
      res.send(result)
    })

    this.router.post('/', async ({ body }, res) => {
      const result = await StrategyModel.save(body)
      res.send(result)
    })

    this.router.put('/', async ({ body }, res) => {
      const result = await StrategyModel.save(body)
      res.send(result)
    })

    this.router.delete('/', async ({ body: { exchange, symbol, strategy } }, res) => {
      const result = await StrategyModel.delete(exchange, symbol, strategy)
      res.send(result)
    })

    this.router.post('/start', async ({ body }, res) => {
      smq.sendMessage(Channel.Strategy, { action: 'start', ...body })
      res.status(201)
    })

    this.router.post('/stop', async ({ body }, res) => {
      smq.sendMessage(Channel.Strategy, { action: 'stop', ...body })
      res.status(201)
    })

    this.router.use(WalletRouter.path, WalletRouter.router)
  }
}
