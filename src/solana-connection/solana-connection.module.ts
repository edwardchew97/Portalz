import { Module } from '@nestjs/common';
import { SolanaConnectionService } from './solana-connection.service';
import { SolanaConnectionController } from './solana-connection.controller';

@Module({
  controllers: [SolanaConnectionController],
  providers: [SolanaConnectionService]
})
export class SolanaConnectionModule {}
