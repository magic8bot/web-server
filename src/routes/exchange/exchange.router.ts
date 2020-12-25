import { InternalModel } from '@magic8bot/db'
import { ExchangeService } from '../../services/exchange.service'

import { BaseRouter } from '../base.router'
import { SyncRouter } from './sync'

export class ExchangeRouter extends BaseRouter {
  public static path = '/exchange'
  private static instance: ExchangeRouter = null

  public static get router() {
    if (!ExchangeRouter.instance) ExchangeRouter.instance = new ExchangeRouter()

    return ExchangeRouter.instance.router
  }

  private constructor() {
    super()

    this.router.get('/', async (req, res) => {
      const result = await ExchangeService.loadAll()
      res.send(result)
    })

    this.router.get('/list', async (req, res) => {
      const exchanges = await InternalModel.getAllExchanges()
      res.send(exchanges)
    })

    this.router.post('/:exchange', async ({ body, params: { exchange } }, res) => {
      const result = await ExchangeService.save({ ...body, exchange })
      result ? res.status(201) : res.status(500)
    })

    this.router.put('/:exchange', async ({ body, params: { exchange } }, res) => {
      const result = await ExchangeService.save({ ...body, exchange })
      result ? res.status(201) : res.status(500)
    })

    this.router.delete('/:exchange', async ({ params: { exchange } }, res) => {
      const result = await ExchangeService.delete(exchange)
      result ? res.status(201) : res.status(500)
    })

    this.router.get('/:exchange/symbols', async ({ params: { exchange } }, res) => {
      const result = await ExchangeService.getSymbols(exchange)
      res.send(result)
    })

    this.router.get('/:exchange/balance', async ({ params: { exchange } }, res) => {
      const result = await ExchangeService.getBalance(exchange)
      res.send(result)
    })

    this.router.use(SyncRouter.path, SyncRouter.router)
  }
}
