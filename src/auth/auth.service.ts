import { BadRequestException, ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import moment from 'moment';
import { InjectModel } from '@nestjs/sequelize';
import { MailerService } from '@nestjs-modules/mailer';
import { Sequelize } from 'sequelize-typescript';
import { Role } from './model/role.model';
import { EmailVerificationToken } from './model/email.verification.token.model';
import { ForgotPasswordToken } from './model/forgot.password.token.model';
import { User } from '../users/user.model';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { Op } from 'sequelize';
import { UpdateUserDto } from './dto/update-user.dto';

export enum Provider {
  GOOGLE = 'google',
  FACEBOOK = 'facebook'
}


@Injectable()
export class AuthService {

  constructor(@InjectModel(Role) private roleModel: typeof Role,
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(EmailVerificationToken) private emailVTokenModel: typeof EmailVerificationToken,
    @InjectModel(ForgotPasswordToken) private fPassTokenModel: typeof ForgotPasswordToken,
    private mailerService: MailerService,
    private configService: ConfigService,
    private sequelize: Sequelize,
    private jwtService: JwtService) {
  }

  findUserById(userId: string) {
    return this.userModel.findByPk(userId);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ where: { email } });
    if (user) {
      try {
        if (user.emailVerified && await bcrypt.compare(pass, user.password)) {
          return this.userModel.findByPk(user.id, { attributes: { exclude: ['password'] } });
        }
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  async validateProviderLogin(profile: any, provider: Provider) {
    try {
      const profileEmail = profile.emails && profile.emails[0]?.value;

      // check if this user exists, if they do log them in
      let user = await this.userModel.findOne({
        where: { providerId: profile.id, provider },
        attributes: { exclude: ['password'] },
      });
      if (user && user.id) {
        if (profileEmail) {
          if (user.email) {
            if (!user.emailVerified) {
              user = await user.update({ emailVerified: true });
            }
          } else {
            user = await user.update({
              email: profileEmail,
              emailVerified: true,
            });
          }
        }
      } else {
        if (profileEmail) {
          user = await this.userModel.findOne({
            attributes: { exclude: ['password'] },
            where: { email: profileEmail },
          });
        }
        if (user && user.id) {
          user = await user.update({
            emailVerified: true,
            providerId: profile.id,
            provider,
          });
        } else {
          user = await this.userModel.create({
            firstName: profile.name?.givenName || profile.displayName || '',
            lastName: profile.name?.familyName || '',
            providerId: profile.id,
            image: profile?.photos && profile.photos[0]?.value,
            provider,
            email: profile.emails && profile.emails[0]?.value,
            // emailVerified: profile.emails && profile.emails[0]?.value ? true : null,
            emailVerified: true,
          });
        }
      }
      return this.login(user);
    } catch (e) {
      throw e;
    }
  }

  async createDefaultAdmin() {
    const transaction = await this.sequelize.transaction();
    try {
      const userDto = {
        email: this.configService.get('DEFAULT_ADMIN_EMAIL'),
        password: await bcrypt.hash(this.configService.get('DEFAULT_ADMIN_PASSWORD'), 10),
        emailVerified: true,
      };
      let user = await this.userModel.findOne({ where: { email: userDto.email }, transaction });
      if (!user) {
        user = await this.userModel.create(userDto, { transaction });
        const roles = await this.roleModel.findAll({ where: { name: { [Op.or]: ['admin', 'user'] } }, transaction });
        await user.$add('roles', roles, { transaction });
      }
      await transaction.commit();
    } catch (e) {
      Logger.error(e);
      await transaction.rollback();
    }
  }

  async login(user: any) {
    const payload = { sub: user.id };
    return {
      user,
      jwt: this.jwtService.sign(payload),
    };
  }

  getUserRoles(user: User): Promise<Role[]> {
    return user.$get('roles');
  }

  async matchRoles(user: User, roles: Array<string>): Promise<boolean> {
    const userRoles = await this.getUserRoles(user);
    for (const userRole of userRoles) {
      for (const role of roles) {
        if (userRole.name === role) {
          return true;
        }
      }
    }
    return false;
  }

  async registerUser(userDto: any): Promise<any> {
    const transaction = await this.sequelize.transaction();
    try {
      userDto.password = await bcrypt.hash(userDto.password, 10);

      // check if a user with this email verified exists
      let user = await this.userModel.findOne({
        where: {
          email: userDto.email,
          emailVerified: true,
        },
        attributes: { exclude: ['password'] },
        transaction,
      });

      // create verification token for this email
      if (user && user.id) {
        // This email is already taken
        throw new BadRequestException(`A user with this email already exists. 
        If you are the user, please proceed to login.
        Click on forgot password if you have forgotten your password`);
      }
      user = await this.userModel.create(userDto, { transaction });
      const emailVToken = new EmailVerificationToken({
        token: uuidv4(),
        expiry: moment().add(48, 'hours'),
      });
      await user.$set('emailVerificationToken', emailVToken, { transaction });

      await this.sendEmailVerificationMail(user.email, {
        email: user.email,
        token: emailVToken.token,
        link: `${this.configService.get('CLIENT_EMAIL_VERIFY_REDIRECT')}?email-verify=success&email=${user.email}&token=${emailVToken.token}`,
      });

      await transaction.commit();
      // @ts-ignore
      const userDataValues = user.dataValues;
      delete userDataValues.password;
      return {
        userDataValues,
        message: 'An email with a verification link has been sent to you. Please click the link to verify your email.',
      };
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  }

  private async sendEmailVerificationMail(to: string, context: any) {
    try {
      await this
        .mailerService
        .sendMail({
          to,
          subject: 'Please verify your email',
          template: 'verify-email',
          context,
        });
    } catch (e) {
      Logger.error(e);
    }
  }

  private async sendForgotPassMail(to: string, context: any) {
    try {
      await this
        .mailerService
        .sendMail({
          to,
          subject: 'Company: Renew Password',
          template: 'forgot-password',
          context,
        });
    } catch (e) {
      Logger.error(e);
    }

  }

  async verifyUserEmailToken({ email, token }: { email: string, token: string }): Promise<any> {
    const transaction = await this.sequelize.transaction();
    try {
      let user = await User.findOne({
        where: { email },
        attributes: { exclude: ['password'] },
        transaction,
      });
      if (!user || !user.id) {
        throw new BadRequestException('A user with this email does not exist. Please register first.');
      }

      if (user.emailVerified) {
        throw new BadRequestException('You account is already verified. Please login or click forgot password to renew your password');
      }

      const emailVToken = await user.$get('emailVerificationToken', { transaction });

      if (!emailVToken || !emailVToken.id) {
        throw new BadRequestException('This token is invalid. Please use the link sent to your email to verify your account.');
      }

      if (emailVToken.expiry < new Date()) {
        throw new BadRequestException('This link has expired, please request for another verification token.');
      }

      if (emailVToken.token !== token) {
        throw new BadRequestException('This token is invalid. Please use the link sent to your email to verify your account.');
      }

      user = await user.update({ emailVerified: true }, { transaction });

      const role = await this.roleModel.findByPk(1, { transaction });
      await user.$add('roles', role, { transaction });

      await emailVToken.destroy({ transaction });

      await transaction.commit();
      return {
        user,
        message: 'Your account has ben successfully verified. Please login to continue',
      };
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  }

  async resendEmailVerificationToken({ email }: { email: string }): Promise<any> {
    try {
      const user = await this.userModel.findOne({
        where: { email },
        attributes: { exclude: ['password'] },
      });
      if (!user || !user.id) {
        throw new BadRequestException('A user with this email does not exist. Please register first.');
      }

      if (user.emailVerified) {
        throw new BadRequestException('You account is already verified. Please login or click forgot password to renew your password');
      }

      let emailVToken = await user.$get('emailVerificationToken');
      if (emailVToken && emailVToken.id) {
        await emailVToken.update({ token: uuidv4(), expiry: moment().add(48, 'hours') });
      } else {
        emailVToken = new EmailVerificationToken({
          token: uuidv4(),
          expiry: moment().add(48, 'hours'),
        });
        await user.$set('emailVerificationToken', emailVToken);
      }
      await this.sendEmailVerificationMail(user.email, {
        email: user.email,
        token: emailVToken.token,
        link: `${this.configService.get('CLIENT_EMAIL_VERIFY_REDIRECT')}?email-verify=success&email=${user.email}&token=${emailVToken.token}`,
      });
      return {
        user,
        message: 'An email with a verification link has been sent to you. Please click the link to verify your email.',
      };
    } catch (e) {
      throw e;
    }
  }

  async forgotPassword({ email }: { email: string }) {
    try {
      const user = await this.userModel.findOne({
        where: { email },
        attributes: { exclude: ['password'] },
      });
      if (!user || !user.id) {
        throw new BadRequestException('A user with this email does not exist. Please register first.');
      }

      if (!user.emailVerified) {
        throw new BadRequestException('Your account has not been verified yet. Check your email for a verification link or request for a new one.');
      }

      let fPassToken = await user.$get('forgotPasswordToken');
      if (fPassToken && fPassToken.id) {
        await fPassToken.update({ token: uuidv4(), expiry: moment().add(48, 'hours') });
      } else {
        fPassToken = new ForgotPasswordToken({
          token: uuidv4(),
          expiry: moment().add(48, 'hours'),
        });
        await user.$set('forgotPasswordToken', fPassToken);
      }
      await this.sendForgotPassMail(user.email, {
        email: user.email,
        token: fPassToken.token,
        url: `${this.configService.get('CLIENT_FORGOT_PASSWORD_REDIRECT')}?token=${fPassToken.token}&email=${user.email}`,
      });
      return {
        user,
        message: 'An email with an activation link has been sent to you. Please click the link to change your password.',
      };
    } catch (e) {
      throw e;
    }
  }

  async changeForgottenPassword({ email, token, password }) {
    const transaction = await this.sequelize.transaction();
    try {
      let user = await User.findOne({
        where: { email },
        attributes: { exclude: ['password'] },
        transaction,
      });
      if (!user || !user.id) {
        throw new BadRequestException('A user with this email does not exist. Please register first.');
      }

      const fPassToken = await user.$get('forgotPasswordToken', { transaction });

      if (!fPassToken || !fPassToken.id) {
        throw new BadRequestException('This token is invalid. Please use the link sent to your email to renew your password.');
      }

      if (fPassToken.expiry < new Date()) {
        throw new BadRequestException('This link has expired, please click forgot password to get a new password renewal link.');
      }

      if (fPassToken.token !== token) {
        throw new BadRequestException('This token is invalid. Please use the link sent to your email to renew your password.');
      }

      user = await user.update({ password: await bcrypt.hash(password, 10) }, { transaction });

      user = await User.findOne({
        where: { email },
        attributes: { exclude: ['password'] },
        transaction,
      });

      await fPassToken.destroy({ transaction });

      await transaction.commit();
      return {
        user,
        message: 'Your password has been changed. Please login to continue',
      };
    } catch (e) {
      throw e;
    }
  }

  async changePassword({ user, currentPassword, newPassword }:
    { user: User, currentPassword: string, newPassword: string }) {
    try {
      const userPass = await this.userModel.findByPk(user.id, { attributes: ['password'] });
      if (await bcrypt.compare(currentPassword, userPass.password)) {
        await user.update({ password: await bcrypt.hash(newPassword, 10) });

        // @ts-ignore
        user = user.dataValues;
        delete user.password;
        return {
          user,
          message: 'You have successfully changed your password',
        };
      } else {
        throw new ForbiddenException('Incorrect Password. Please try again');
      }
    } catch (e) {
      throw e;
    }
  }

  async updateUser(user: User, userDto: UpdateUserDto): Promise<any> {
    try {
      let u = await user.update(userDto);
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      u = u.dataValues;
      delete u.password;
      return u;
    } catch (e) {
      throw e;
    }
  }

}
