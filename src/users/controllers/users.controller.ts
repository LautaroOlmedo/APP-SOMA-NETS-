import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

// ---------- ---------- ---------- ---------- ----------

import { UsersService } from '../services/users.service';
import { UserDTO, UserToStoreDTO, UserUpdateDTO } from '../dto/user.dto';
import { PublicAcces } from 'src/auth/decorators/public.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('users')
//@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all')
  async getAllUsers() {
    return await this.usersService.findAllUsers();
  }

  //@PublicAcces()
  @Get(':id')
  public async getUserById(@Param('id', ParseUUIDPipe) id: string) {
    // A CHECKEAR EL PARSE
    return await this.usersService.findOneUser(id);
  }

  @Post('register')
  public async registerUser(@Body() body: UserDTO) {
    const {
      firstname,
      lastname,
      age,
      password,
      dni,
      role,
      active,
      username,
      direction,
      brand,
      department,
      province,
      country,
      emails,
      phones,
    } = body;
    console.log('USERNAME: ', username);

    return await this.usersService.createUser(
      lastname,
      firstname,
      age,
      username,
      password,
      role,
      active,
      dni,
      direction,
      brand,
      department,
      province,
      country,
      emails,
      phones,
    );
  }

  @Put('edit/:id')
  public async updateUser(
    @Param('id') id: string,
    @Body() body: UserUpdateDTO,
  ) {
    console.log(id);
    return await this.usersService.updateUser(id, body);
  }

  @Delete('delete/:id')
  public async deleteUser(@Param('id') id: string) {
    console.log(id);

    return await this.usersService.deleteUser(id);
  }

  // ---------- ----------  RELATIONS  ---------- ----------

  @Post('add-to-store')
  public async addToStore(@Body() body: UserToStoreDTO) {
    return await this.usersService.relationToStore(body);
  }
}
