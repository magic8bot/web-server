import ccxt from 'ccxt'

import { ExchangeModel, ExchangeConfig } from '../../../db'

export class ExchangeService {
  static load(exchange: string) {
    return ExchangeModel.load(exchange)
  }

  static loadAll() {
    return ExchangeModel.loadAll()
  }

  static async save(exchangeConfig: ExchangeConfig) {
    const { result } = await ExchangeModel.save(exchangeConfig)

    return Boolean(result.ok)
  }

  static async delete(exchange: string) {
    const { result } = await ExchangeModel.delete(exchange)

    return Boolean(result.ok)
  }

  static async getSymbols(exchange: string) {
    const exchangeConfig = await ExchangeService.load(exchange)

    if (!exchangeConfig) return []

    const connection = new ccxt[exchange]({ ...exchangeConfig.auth }) as ccxt.Exchange
    if (connection.symbols) return connection.symbols

    await connection.loadMarkets()

    return connection.symbols
  }

  static async getBalance(exchange: string) {
    const exchangeConfig = await ExchangeService.load(exchange)

    if (!exchangeConfig) return {}

    const connection = new ccxt[exchange]({ ...exchangeConfig.auth }) as ccxt.Exchange

    return connection.fetchBalance()
  }
}
