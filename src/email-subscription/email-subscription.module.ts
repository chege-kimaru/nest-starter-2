import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EmailSubscriptionService } from './email-subscription.service';
import { EmailSubscriptionController } from './email-subscription.controller';
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
  providers: [EmailSubscriptionService],
  controllers: [EmailSubscriptionController],
})
export class EmailSubscriptionModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
  }

}
