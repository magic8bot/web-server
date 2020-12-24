import { WalletModel, AdjustmentModel } from '../../../../../db'
import { BaseRouter } from '../../base.router'

export class WalletRouter extends BaseRouter {
  public static path = '/wallet'
  private static instance: WalletRouter = null

  public static get router() {
    if (!WalletRouter.instance) WalletRouter.instance = new WalletRouter()

    return WalletRouter.instance.router
  }

  private constructor() {
    super()

    this.router.get('/', async ({ query: { exchange, symbol, strategy } }, res) => {
      const result = await WalletModel.loadWallet({ exchange, symbol, strategy })

      res.send(result ? result : { asset: 0, currency: 0 })
    })

    this.router.put('/', async ({ body: { exchange, symbol, strategy, wallet } }, res) => {
      const { result: resultAdjustment } = await AdjustmentModel.adjustWallet({ exchange, symbol, strategy }, wallet)

      if (!resultAdjustment.ok) return res.status(500)
      const { result: resultWallet } = await WalletModel.saveWallet({ exchange, symbol, strategy }, wallet)

      if (!resultWallet.ok) return res.status(500)

      res.status(201)
    })
  }
}
