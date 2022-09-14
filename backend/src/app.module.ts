import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WalletsModule } from './wallets/wallets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders/orders.module';
import { SolanaConnectionModule } from './solana-connection/solana-connection.module';
import { RateMachineModule } from './common/rate-machine/rate-machine.module';

/*
* host: '47.254.236.251',
			port: 3306,
			username: 'portalz',
			password: '2jodjoc04fm!0942rnf'
* */

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '47.254.236.251',
      port: 3306,
      username: 'portalz',
      password: '2jodjoc04fm!0942rnf',
      database: 'portalz',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
    RateMachineModule,
    WalletsModule,
    OrdersModule,
    SolanaConnectionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
