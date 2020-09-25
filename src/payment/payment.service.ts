import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './model/payment.model';

@Injectable()
export class PaymentService {

  constructor(@InjectModel(Payment) private paymentModel: typeof Payment) {
  }
}
