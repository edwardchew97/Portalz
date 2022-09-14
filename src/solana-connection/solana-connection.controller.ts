import { Controller } from '@nestjs/common';
import { SolanaConnectionService } from './solana-connection.service';

@Controller('solana-connection')
export class SolanaConnectionController {
  constructor(private readonly solanaConnectionService: SolanaConnectionService) {}
}
