import { Module } from '@nestjs/common';
import { HuobiService } from './huobi.service';

@Module({
	imports: [],
	providers: [HuobiService],
	exports: [HuobiService]
})
export class HuobiModule { }
