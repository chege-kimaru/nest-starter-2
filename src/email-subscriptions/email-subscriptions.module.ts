import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EmailSubscriptionsService } from './email-subscriptions.service';
import { EmailSubscriptionsController } from './email-subscriptions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { EmailSubscription } from './email-subscription.model';

@Module({
  imports: [
    SequelizeModule.forFeature([EmailSubscription]),
    AuthModule,
    SharedModule,
  ],
  providers: [EmailSubscriptionsService],
  controllers: [EmailSubscriptionsController],
})
export class EmailSubscriptionsModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
  }

}
