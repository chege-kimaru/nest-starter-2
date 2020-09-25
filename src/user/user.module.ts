import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { User } from './user.model';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    AuthModule
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [SequelizeModule],
})
export class UserModule {
}
