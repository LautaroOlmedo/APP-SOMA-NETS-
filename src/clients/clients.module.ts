import { Module } from '@nestjs/common';
import { ClientsService } from './services/clients.service';

@Module({
  providers: [ClientsService]
})
export class ClientsModule {}
