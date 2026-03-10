import { Module } from '@nestjs/common';
import { PendapatanStsController } from './pendapatan-sts.controller';
import { PendapatanStsService } from './pendapatan-sts.service';

@Module({
  controllers: [PendapatanStsController],
  providers: [PendapatanStsService],
  exports: [PendapatanStsService],
})
export class PendapatanStsModule {}
