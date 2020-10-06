import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { User } from './user.model';
import { UserMiddleware } from './middleware/user.middleware';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    AuthModule
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [SequelizeModule],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes(
      { path: 'users/:userId', method: RequestMethod.GET }
    )
  }
}
