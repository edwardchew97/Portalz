import { Module, OnModuleInit } from '@nestjs/common';
import { BinanceClient } from './binance.client';
import { BinanceService } from './binance.service';

@Module({
	providers: [BinanceService, BinanceClient],
	exports: [BinanceService]
})
export class BinanceModule {
}
