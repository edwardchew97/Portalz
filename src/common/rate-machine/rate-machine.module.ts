import { Module } from '@nestjs/common';
import { HuobiModule } from './huobi/huobi.module';
import { RateMachineService } from './rate-machine.service';

@Module({
	imports: [HuobiModule],
	providers: [RateMachineService],
	exports: [RateMachineService]
})
export class RateMachineModule { }
