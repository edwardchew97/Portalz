import { Test, TestingModule } from '@nestjs/testing';
import { SolanaConnectionController } from './solana-connection.controller';
import { SolanaConnectionService } from './solana-connection.service';

describe('SolanaConnectionController', () => {
  let controller: SolanaConnectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolanaConnectionController],
      providers: [SolanaConnectionService],
    }).compile();

    controller = module.get<SolanaConnectionController>(SolanaConnectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
