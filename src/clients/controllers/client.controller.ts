import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';

// ---------- ---------- ---------- ---------- ----------

import { ClientsService } from '../services/client.service';
import { ClientDTO } from '../dto/client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get(':id')
  async getAllWallets(@Param('id', ParseUUIDPipe) id: string) {
    return await this.clientsService.findAllClients(id);
  }

  @Post('register')
  public async createClient(@Body() body: ClientDTO) {
    const validate = await this.clientsService.findByUniqueValues(body);
    if (!validate) {
      return validate;
    } else {
      return await this.clientsService.createClient(body);
    }
  }

  // ---------- ----------  RELATIONS  ---------- ----------

  // @Post('add-to-store')
  // public async addToStore(@Body() body: any /*UserToStoreDTO*/) {
  //   return await this.clientsService.relationToStore(body);
  // }
}
