import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EmailSubscription } from './email-subscription.model';
import { CreateEmailSubscriptionDto } from './dto/create.email-subscription.dto';

@Injectable()
export class EmailSubscriptionsService {

  constructor(@InjectModel(EmailSubscription) private emailSubscriptionModel: typeof EmailSubscription) {
  }

  async createSubscription(subscriptionDto: CreateEmailSubscriptionDto): Promise<EmailSubscription> {
    try {
      const subscription = await this.emailSubscriptionModel.findOne({ where: { email: subscriptionDto.email } });
      if (subscription) {
        throw new BadRequestException('You are already subscribed to our newsletter. Thank you for being part of us');
      }
      return this.emailSubscriptionModel.create(subscriptionDto);
    } catch (e) {
      throw e;
    }
  }

  async getAllSubscriptions(): Promise<EmailSubscription[]> {
    return this.emailSubscriptionModel.findAll({ attributes: { exclude: ['token'] } });
  }

  async unsubscribe({ email, token }): Promise<unknown> {
    try {
      const subscription = await this.emailSubscriptionModel.findOne({ where: { email } });
      if (subscription && subscription.id) {
        if (subscription.token === token) {
          return subscription.destroy();
        } else {
          throw new ForbiddenException('Please use the link in the newsletters to unsubscribe.');
        }
      } else {
        throw new NotFoundException('You are not subscribed to our newsletter. Maybe you already unsubscribed.');
      }
    } catch (e) {
      throw e;
    }
  }
}
