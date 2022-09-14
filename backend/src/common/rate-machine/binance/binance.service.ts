import { Inject, Injectable } from '@nestjs/common';
import { BinanceClient } from './binance.client';
import { GetCryptoRateResponse } from './dto/response.dto';

@Injectable()
export class BinanceService {
	@Inject()
	private binanceClient: BinanceClient

	async getCryptoRate(crypto: Crypto): Promise<number> {
		let result: any = await this.binanceClient.get('/avgPrice', {
			symbol: (crypto + 'USDT').toUpperCase()
		})
		result = result as GetCryptoRateResponse
		return result.price
	}
}
