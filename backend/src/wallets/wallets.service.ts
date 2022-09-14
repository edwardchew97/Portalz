import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallet } from './entities/wallet.entity';

@Injectable()
export class WalletsService {	
	constructor(
		@InjectRepository(Wallet)
		private walletRepository: Repository<Wallet>,
	) { }

	static SEED_PHRASE = 'engage soccer pass clerk annual brass soda cotton grace risk butter inform'

	async create(createWalletDto: CreateWalletDto): Promise<Wallet> {
		console.log(createWalletDto)
		const wallet = await this.walletRepository.save(createWalletDto)
		return wallet;
	}

	findAll() {
		return `This action returns all wallets`;
	}

	findOne(id: number) {
		return `This action returns a #${id} wallet`;
	}

	update(id: number, updateWalletDto: UpdateWalletDto) {
		return `This action updates a #${id} wallet`;
	}

	remove(id: number) {
		return `This action removes a #${id} wallet`;
	}
}
