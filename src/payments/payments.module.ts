import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
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
  providers: [PaymentsService],
  controllers: [PaymentsController]
})
export class PaymentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
  }

}
