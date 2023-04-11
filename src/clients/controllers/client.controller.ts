import { Body, Controller, Post } from '@nestjs/common';

// ---------- ---------- ---------- ---------- ----------

import { ClientsService } from '../services/client.service';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  // ---------- ----------  RELATIONS  ---------- ----------

  @Post('add-to-store')
  public async addToStore(@Body() body: any /*UserToStoreDTO*/) {
    return await this.clientsService.relationToStore(body);
  }
}
