import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Crypto } from 'src/common/constants';

@Injectable()
export class HuobiService {

	async getCryptoRate(crypto: Crypto): Promise<number> {
		const result:any= await this.get('/market/detail/merged', {
			symbol: crypto + 'usdt'
		})
		return result.tick.close
	}

	async get(url, params = null) {
		const queryString = Object.keys(params).map((key) => {
			return '?' + `${encodeURIComponent(key)}=${params[key]}`;
		}).join('&')
		const finalUrl = 'https://api.huobi.pro' + url + queryString
		return await axios.get(finalUrl).then(result => result.data).catch(function (err) {
			console.log(err)
		})
	}
}
