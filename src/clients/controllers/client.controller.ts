import { Body, Controller, Post } from '@nestjs/common';

// ---------- ---------- ---------- ---------- ----------

import { ClientsService } from '../services/client.service';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post('register')
  public async createClient(@Body() body: any) {
    const {
      firstname,
      lastname,
      dni,
      province,
      country,
      department,
      emails,
      phones,
    } = body;
    return await this.clientsService.createClient(
      firstname,
      lastname,
      dni,
      department,
      province,
      country,
      emails,
      phones,
    );
  }

  // ---------- ----------  RELATIONS  ---------- ----------

  @Post('add-to-store')
  public async addToStore(@Body() body: any /*UserToStoreDTO*/) {
    return await this.clientsService.relationToStore(body);
  }
}
