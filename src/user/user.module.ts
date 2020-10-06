import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { User } from './user.model';
import { UserMiddleware } from './middleware/user.middleware';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    AuthModule
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [SequelizeModule],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes(
      { path: 'users/:userId', method: RequestMethod.GET }
    )
  }
}
