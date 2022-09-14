import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { Keypair } from "@solana/web3.js";
import * as Bip39 from 'bip39'
import * as ed25519 from 'ed25519-hd-key'
import { CreateOrderInputDto } from './dto/create-order-input.dto';


@Injectable()
export class OrdersService {

	static SEED = 'foil zero peace session enable when feed emotion because gown name order'

	constructor(
		@InjectRepository(Order)
		public repository: Repository<Order>,
	) { }

	async create(createOrderDto: CreateOrderInputDto): Promise<Order> {
		createOrderDto.to_network = 'near'
		let order = await this.repository.save(createOrderDto)
		const address = this.generateAddress(order.id)
		order.deposit_address = address
		order = await this.repository.save({ id: order.id, deposit_address: address })
		return order;
	}

	findAll() {
		return `This action returns all orders`;
	}

	findOne(id: number) {
		return `This action returns a #${id} order`;
	}

	async findOneWithReceiverAddress(address:string): Promise<Order>{
		console.log(address)
		const order = await this.repository.findOneBy({ deposit_address: address })
		return order
	}

	update(id: number, updateOrderDto: UpdateOrderDto) {
		return `This action updates a #${id} order`;
	}

	remove(id: number) {
		return `This action removes a #${id} order`;
	}

	// 
	// Private functions
	// 
	private generateAddress(index): string {
		const seed = Bip39.mnemonicToSeedSync(OrdersService.SEED)
		const derivedSeed = ed25519.derivePath(`m/44'/501'/${index}'/0'`, seed.toString('hex')).key;
		const keyPair = Keypair.fromSeed(derivedSeed)
		return keyPair.publicKey.toString()
	}


}
