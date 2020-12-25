import { Channel } from '@magic8bot/smq'
import { smq } from '../../../services/smq.service'
import { BaseRouter } from '../../base.router'

export class SyncRouter extends BaseRouter {
  public static path = '/:exchange/sync/:symbol'
  private static instance: SyncRouter = null

  public static get router() {
    if (!SyncRouter.instance) SyncRouter.instance = new SyncRouter()

    return SyncRouter.instance.router
  }

  private constructor() {
    super()

    this.router.post('/start', async ({ params: { exchange, symbol } }, res) => {
      smq.sendMessage(Channel.SyncTrades, { exchange, symbol, action: 'start' })
      return res.status(201)
    })

    this.router.post('/stop', async ({ params: { exchange, symbol } }, res) => {
      smq.sendMessage(Channel.SyncTrades, { exchange, symbol, action: 'stop' })
      return res.status(201)
    })
  }
}
