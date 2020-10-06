import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  HttpCode,
  Req,
  Res, Response, Redirect, Put
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { VerifyUserDto } from './dto/verify.user.dto';
import { ResendVerifyUserDto } from './dto/resend.verify.user.dto';
import { ChangePasswordDto } from './dto/change.password.dto';
import { ForgotPassDto } from './dto/forgot.pass.dto.';
import { ForgotChangePassDto } from './dto/forgot.change.pass.dto';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { FacebookAuthGuard } from './guards/facebook.auth.guard';
import { ConfigService } from '@nestjs/config';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { ApiBody } from '@nestjs/swagger/dist/decorators/api-body.decorator';
import { ApiBearerAuth } from '@nestjs/swagger/dist/decorators/api-bearer.decorator';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService, private configService: ConfigService) {

  }

  @ApiOperation({ summary: 'Sign in with google' })
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {
    // initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  @Redirect('', 301)
  googleLoginCallback(@Req() req) {
    // handles the Google OAuth2 callback
    if (req.user) {
      return { url: `${this.configService.get('CLIENT_LOGIN_REDIRECT')}?auth=success&token=${req.user.jwt}` };
    } else {
      return { url: `${this.configService.get('CLIENT_LOGIN_REDIRECT')}?auth=false` };
    }
  }

  @ApiOperation({ summary: 'Sign in with facebook' })
  @Get('facebook')
  @UseGuards(FacebookAuthGuard)
  facebookLogin() {
    // initiates the Facebook login flow
  }

  @Get('facebook/callback')
  @UseGuards(FacebookAuthGuard)
  @Redirect('', 301)
  facebookLoginCallback(@Req() req) {
    if (req.user) {
      return { url: `${this.configService.get('CLIENT_LOGIN_REDIRECT')}?auth=success&token=${req.user.jwt}` };
    } else {
      return { url: `${this.configService.get('CLIENT_LOGIN_REDIRECT')}?auth=false` };
    }
  }

  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({ status: 200, description: 'Registration was successful' })
  @ApiResponse({ status: 400, description: 'Bad request. Please ensure all fields have valid data.' })
  @ApiBody({ type: RegisterUserDto })
  @Post('register')
  register(@Body() userDto: RegisterUserDto) {
    return this.authService.registerUser(userDto);
  }

  @ApiOperation({ summary: 'Verify Email' })
  @ApiResponse({ status: 200, description: 'Verification successful' })
  @ApiResponse({ status: 400, description: 'Invalid data | Account already verified | Invalid Token | Link Expired' })
  @ApiBody({ type: VerifyUserDto })
  @HttpCode(200)
  @Post('verify')
  verifyEmail(@Body() verifyUserDto: VerifyUserDto) {
    return this.authService.verifyUserEmailToken(verifyUserDto);
  }

  @ApiOperation({ summary: 'Verify Email' })
  @ApiResponse({ status: 200, description: 'Verification email resent successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiBody({ type: ResendVerifyUserDto })
  @HttpCode(200)
  @Post('verify/resend')
  resendVerificationEmail(@Body() resendVerifyUserDto: ResendVerifyUserDto) {
    return this.authService.resendEmailVerificationToken(resendVerifyUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change Password' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'Password changed successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: ChangePasswordDto })
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('change-password')
  changePassword(@Body() changePasswordDto: ChangePasswordDto, @Req() req: Request) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    changePasswordDto.user = req.user;
    return this.authService.changePassword(changePasswordDto);
  }

  @ApiOperation({ summary: 'Send reset password email' })
  @ApiResponse({ status: 200, description: 'Password reset email sent successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data | Unverified Account | Account does not exist' })
  @ApiBody({ type: ForgotPassDto })
  @HttpCode(200)
  @Post('forgot-password')
  forgotPassword(@Body() forgotPassDto: ForgotPassDto) {
    return this.authService.forgotPassword(forgotPassDto);
  }

  @ApiOperation({ summary: 'Reset  Forgotten Password' })
  @ApiResponse({ status: 200, description: 'Password reset was successful' })
  @ApiResponse({ status: 400, description: 'Invalid data | Unverified Account | Account does not exist' })
  @ApiBody({ type: ForgotChangePassDto })
  @HttpCode(200)
  @Post('forgot-password/change')
  changeForgottenPassword(@Body() forgotChangePassDto: ForgotChangePassDto) {
    return this.authService.changeForgottenPassword(forgotChangePassDto);
  }

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 400, description: 'Invalid data | Unverified Account | Account does not exist' })
  @ApiResponse({ status: 401, description: 'Invalid data' })
  @ApiBody({ type: LoginDto })
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get logged in user profile' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update logged in user details' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: UpdateUserDto })
  @UseGuards(JwtAuthGuard)
  @Put('update')
  updateUser(@Request() req, @Body() userDto: UpdateUserDto) {
    return this.authService.updateUser(req.user, userDto);
  }
}
