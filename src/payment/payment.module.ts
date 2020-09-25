import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { Payment } from './model/payment.model';
import { RavePayment } from './model/rave.payment.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Payment, RavePayment]),
    AuthModule,
    SharedModule
  ],
  providers: [PaymentService],
  controllers: [PaymentController]
})
export class PaymentModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
  }

}
