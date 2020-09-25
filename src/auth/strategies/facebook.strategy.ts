import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthService, Provider } from '../auth.service';
import { Strategy } from 'passport-facebook';


@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {

  constructor(private configService: ConfigService, private authService: AuthService) {
    super({
      clientID: configService.get('FACEBOOK_AUTH_APP_ID'),     // <- Replace this with your client id
      clientSecret: configService.get('FACEBOOK_AUTH_APP_SECRET'), // <- Replace this with your client secret
      callbackURL: configService.get('FACEBOOK_AUTH_CALLBACK'),
      passReqToCallback: true,
      scope: 'public_profile,email,user_photos',
    });
  }


  async validate(request: any, accessToken: string, refreshToken: string, profile, done: Function) {
    try {
      const user = await this.authService.validateProviderLogin(profile, Provider.FACEBOOK);
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }

}
