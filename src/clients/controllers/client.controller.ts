import { Body, Controller, Post } from '@nestjs/common';

// ---------- ---------- ---------- ---------- ----------

import { ClientsService } from '../services/client.service';
import { ClientDTO } from '../dto/client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post('register')
  public async createClient(@Body() body: ClientDTO) {
    return await this.clientsService.createClient(body);
  }

  // ---------- ----------  RELATIONS  ---------- ----------

  // @Post('add-to-store')
  // public async addToStore(@Body() body: any /*UserToStoreDTO*/) {
  //   return await this.clientsService.relationToStore(body);
  // }
}
