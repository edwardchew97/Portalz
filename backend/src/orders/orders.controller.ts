import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { Verify } from 'crypto';
import CommonResponse from 'src/common/CommonResponse';
import { BaseController } from 'src/common/BaseController';
import { VerifyOrderDto } from './dto/verify-order.dto';
import * as SolWeb3 from '@solana/web3.js';
import { sendFund, sleep, toDisplayAmount } from 'src/common/helpers';
import { Crypto, STATUS } from 'src/common/constants';
import { Inject } from '@nestjs/common';
import { RateMachineService } from 'src/common/rate-machine/rate-machine.service';
import { GetRateDto } from './dto/get-rate.dto';
import { CreateOrderOutputDto } from './dto/create-order-output.dto';
import { CreateOrderInputDto } from './dto/create-order-input.dto';
import { Account, InMemorySigner, keyStores, utils } from 'near-api-js';

@Controller('orders')
export class OrdersController extends BaseController {
  @Inject()
  private rateMachine: RateMachineService;

  constructor(private readonly ordersService: OrdersService) {
    super();
  }

  @Post('/create')
  async create(
    @Body() createOrderDto: CreateOrderInputDto,
  ): Promise<CommonResponse<Order>> {
    console.log('Received input');
    console.log(createOrderDto);
    const order = await this.ordersService.create(createOrderDto);
    return this.response(200, 'Order created successfully', order);
  }

  @Get('/rate/:crypto')
  async getRate(
    @Param() params: GetRateDto,
  ): Promise<CommonResponse<CreateOrderOutputDto>> {
    const crypto_rate = await this.rateMachine.getRate(params.crypto);
    const near_rate = await this.rateMachine.getRate(Crypto.NEAR);
    return this.response(200, 'Retrieved rate successfully.', {
      crypto_rate,
      near_rate,
      swap_rate: crypto_rate / near_rate,
    });
  }

  @Get('/_health')
  async getHealth(): Promise<CommonResponse<any>> {
    return this.response(200, 'Healthy', {});
  }

  // This is when users completed a payment, they send that from the frontend and we are supposed to check if they that's a legit transaction

  // Step 5: Mark as complete
  @Post('/verify')
  async verifyPayments(
    @Body() verifyOrderDto: VerifyOrderDto,
  ): Promise<CommonResponse<Order>> {
    // Step 1: Verify whether it's a valid order ✓
    let trx;
    let tries = 0;
    const connection = new SolWeb3.Connection(
      'https://flashy-falling-reel.solana-mainnet.discover.quiknode.pro/d7b692d03ce370fd96f56ab891d2b11a1881595c',
      'finalized',
    );

    do {
      trx = await connection.getParsedTransaction(
        verifyOrderDto.transaction_hash,
        'confirmed',
      );
      tries++;
      sleep(1000);
    } while (trx === null && tries < 120);

    const receiver = trx.transaction.message.accountKeys[1].pubkey.toString();
    const order = await this.ordersService.findOneWithReceiverAddress(receiver);

    // Step 2: Get the amount we received ✓
    if (order) {
      if (order.status !== STATUS.PENDING) {
        return this.response(200, 'Failed. Order is already completed', null);
      }

      let amountReceived: any =
        trx.meta.postBalances[1] - trx.meta.preBalances[1];
      amountReceived = toDisplayAmount(amountReceived);

      // Step 4: Get the rate and compute amount to send✓
      const cryptoRate = await this.rateMachine.getRate(Crypto.SOL);
      const nearRate = await this.rateMachine.getRate(Crypto.NEAR);
      const amountToSend = (cryptoRate / nearRate) * amountReceived * 0.9955;

      // Step 5: Send the near amount
      const result = await sendFund(order.to_address, amountToSend.toString());
      let resultOrder = await this.ordersService.repository.save({
        id: order.id,
        from_amount: amountReceived,
        to_amount: amountToSend.toString(),
        status: STATUS.RECEIVED,
        transaction_hash: result.transaction.hash,
      });

      return this.response(
        200,
        'Order verified successfully and near is sent',
        resultOrder,
      );
      // } else {
      // 	return this.response(200, 'Invalid Order (Incorrect amount received)', null)
      // }
    } else {
      return this.response(200, 'Invalid Order (Recipient not found)', null);
    }
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
