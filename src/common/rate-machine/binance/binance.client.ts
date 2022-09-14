import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios'
import { env } from 'process';
const cryptoJs = require("crypto-js");

@Injectable()
export class BinanceClient {

	private readonly logger = new Logger(BinanceClient.name);

	async get(url, params = null) {
		// const finalUrl = env.BINANCE_SPOT_URL + url + '?' + this.sign(params)
		const queryString = Object.keys(params).map((key) => {
			return '?' + `${encodeURIComponent(key)}=${params[key]}`;
		}).join('&')

		const finalUrl = env.BINANCE_SPOT_URL + url + queryString
		const instance = this
		return await axios.get(finalUrl).then(result => result.data).catch(function (err) {
			instance.logger.error(err)
		})
	}

	async getWithoutSign(url, params = null) {
		return await axios.get(env.BINANCE_SPOT_URL + url + '?' + this.signParams(params), {
			headers: {
				"X-MBX-APIKEY": env.BINANCE_API_KEY
			}
		}).catch(function (err) {
			let exception = new Error(err.response.data.msg)
			exception.name = 'Binance Request exception'
			throw exception
		})
	}

	async post(url, params = null) {
		return await axios.post(env.BINANCE_SPOT_URL + url + '?' + this.sign(params), null, {
			headers: {
				"X-MBX-APIKEY": env.BINANCE_API_KEY
			}
		}).catch(function (err) {
			let exception = new Error(err.response.data.msg)
			exception.name = 'Binance Request exception'
			throw exception
		})
	}

	private sign(parameters = null) {
		const ts = Date.now();
		let paramsObject = {};
		let queryString = null

		const binance_api_secret = env.BINANCE_SECRET_KEY
		if (parameters) {
			Object.keys(parameters).map((key) => {
				if (key != 'signature' &&
					key != 'timestamp') {
					paramsObject[key] = parameters[key];
				}
			})
			queryString = Object.keys(parameters).map((key) => {
				return `${encodeURIComponent(key)}=${parameters[key]}`;
			}).join('&')
		}

		Object.assign(paramsObject, { 'timestamp': ts });
		if (binance_api_secret) {
			let oriQueryString = Object.keys(paramsObject).map((key) => {
				return `${encodeURIComponent(key)}=${paramsObject[key]}`;
			}).join('&');
			const signature = cryptoJs.HmacSHA256(oriQueryString, binance_api_secret);
			queryString = oriQueryString + '&signature=' + signature
		}

		return queryString
	}

	private signParams(parameters = null) {
		let paramsObject = {};
		let queryString = null

		if (parameters) {
			Object.keys(parameters).map((key) => {
				if (key != 'signature' &&
					key != 'timestamp') {
					paramsObject[key] = parameters[key];
				}
			})
			queryString = Object.keys(parameters).map((key) => {
				return `${encodeURIComponent(key)}=${parameters[key]}`;
			}).join('&')
		}
		return queryString
	}
}
