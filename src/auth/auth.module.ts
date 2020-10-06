import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt-strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RolesGuard } from './guards/roles.guard';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './model/role.model';
import { UserRole } from './model/user.role.model';
import { EmailVerificationToken } from './model/email.verification.token.model';
import { ForgotPasswordToken } from './model/forgot.password.token.model';
import { GoogleStrategy } from './strategies/google.strategy';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { FacebookAuthGuard } from './guards/facebook.auth.guard';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { User } from 'src/users/user.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Role, UserRole, User, EmailVerificationToken, ForgotPasswordToken]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        // signOptions: { expiresIn: '3600s' },
      }),
      inject: [ConfigService],
    })],
  providers: [AuthService, LocalStrategy, LocalAuthGuard, JwtAuthGuard, JwtStrategy,
    RolesGuard, GoogleStrategy, GoogleAuthGuard, FacebookAuthGuard, FacebookStrategy],
  controllers: [AuthController],
  exports: [RolesGuard, JwtAuthGuard, LocalAuthGuard, AuthService],
})
export class AuthModule {
}
