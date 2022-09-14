import { Inject, Injectable } from "@nestjs/common";
import { Crypto } from "../constants";
import { HuobiService } from "./huobi/huobi.service";


/*
status:200
*/
@Injectable()
export class RateMachineService {

	@Inject()
	private huobiService: HuobiService

	async getRate(crypto: Crypto) {
		let value: number
		value = await this.huobiService.getCryptoRate(crypto)
		return value;
	}
}