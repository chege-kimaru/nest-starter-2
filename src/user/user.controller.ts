import {Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/guards/roles.decorator';

@Controller('users')
export class UserController {

  constructor(private usersService: UserService) {
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @Roles('admin')
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.usersService.findUserById(id);
  }

}
