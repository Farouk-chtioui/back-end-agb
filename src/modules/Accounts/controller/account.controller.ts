import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from '../services/account.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Query('page') page: number = 1) {
    return this.usersService.findAll(page);
  }

  @Get('search')
  async search(@Query('term') searchTerm: string) {
    console.log('Received search term:', searchTerm);  // Debugging: Log the received search term
    return this.usersService.searchUsers(searchTerm);
  }
}
