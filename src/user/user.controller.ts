import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/guards/roles.decorator';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {

  constructor(private usersService: UserService) {
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get User Details' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({ name: 'userId' })
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':userId')
  findById(@Req() req: any) {
    return req.User;
  }

}
