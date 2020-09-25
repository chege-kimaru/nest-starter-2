import {
  Body,
  Controller, Delete,
  Get,
  Logger,
  Patch,
  Post, Put, Query, Req,
  UploadedFile, UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateEmailSubscriptionDto } from './dto/create.email-subscription.dto';
import { EmailSubscriptionService } from './email-subscription.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { CloudinaryConfigService } from '../shared/cloudinary-config.service';
import { Request } from 'express';
import { Roles } from '../auth/guards/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UnsubscribeEmailSubscriptionDto } from './dto/unsubscribe.email-subscription.dto';

@Controller('email-subscriptions')
export class EmailSubscriptionController {

  constructor(private emailSubscriptionService: EmailSubscriptionService) {
  }

  @Post()
  async createSubscription(@Body() createEmailSubscriptionDto: CreateEmailSubscriptionDto) {
    return this.emailSubscriptionService.createSubscription(createEmailSubscriptionDto);
  }

  @Get()
  getAllSubscriptions() {
    return this.emailSubscriptionService.getAllSubscriptions();
  }

  @Get('/unsubscribe')
  deleteStory(@Query() details: UnsubscribeEmailSubscriptionDto) {
    return this.emailSubscriptionService.unsubscribe(details);
  }

}
