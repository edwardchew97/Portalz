import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { BaseController } from 'src/common/BaseController';
import { Wallet } from './entities/wallet.entity';
import CommonResponse from 'src/common/CommonResponse';

@Controller('wallets')
export class WalletsController extends BaseController {
	constructor(private readonly walletsService: WalletsService) {
		super()
	}

	@Post('/create')
	async create(@Body() createWalletDto: CreateWalletDto): Promise<CommonResponse<Wallet>> {
		const body = await this.walletsService.create(createWalletDto);
		return this.response(200, 'Wallet created successfully', body)
	}

	@Get()
	findAll() {
		return this.walletsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.walletsService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
		return this.walletsService.update(+id, updateWalletDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.walletsService.remove(+id);
	}
}
