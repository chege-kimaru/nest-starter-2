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
import { EmailSubscriptionsService } from './email-subscriptions.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { CloudinaryConfigService } from '../shared/cloudinary-config.service';
import { Request } from 'express';
import { Roles } from '../auth/guards/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UnsubscribeEmailSubscriptionDto } from './dto/unsubscribe.email-subscription.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Email Subscription')
@Controller('email-subscriptions')
export class EmailSubscriptionsController {

  constructor(private emailSubscriptionService: EmailSubscriptionsService) {
  }

  @ApiOperation({ summary: 'Subscribe to news letter' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Invalid data | Already subscribed' })
  @ApiBody({ type: CreateEmailSubscriptionDto })
  @Post()
  async createSubscription(@Body() createEmailSubscriptionDto: CreateEmailSubscriptionDto) {
    return this.emailSubscriptionService.createSubscription(createEmailSubscriptionDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all email subscriptions' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  getAllSubscriptions() {
    return this.emailSubscriptionService.getAllSubscriptions();
  }

  @ApiOperation({ summary: 'Unsubscribe' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Invalid email or token' })
  @ApiQuery({ name: 'email' })
  @ApiQuery({ name: 'token' })
  @Get('/unsubscribe')
  deleteStory(@Query() details: UnsubscribeEmailSubscriptionDto) {
    return this.emailSubscriptionService.unsubscribe(details);
  }

}
