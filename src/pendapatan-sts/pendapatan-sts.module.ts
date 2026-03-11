import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PendapatanStsController } from './pendapatan-sts.controller';
import { PendapatanStsService } from './pendapatan-sts.service';
import { PendapatanStsEntity } from './entities/pendapatan-sts.entity';
import { AddRecordEvent } from './events/add-record.event';
import { AddReadRecordEvent } from './events/add-read-record.event';

@Module({
  imports: [
    TypeOrmModule.forFeature([PendapatanStsEntity]),
    TypeOrmModule.forFeature([PendapatanStsEntity], 'report_read'),
  ],
  controllers: [PendapatanStsController],
  providers: [PendapatanStsService, AddRecordEvent, AddReadRecordEvent],
  exports: [PendapatanStsService, AddRecordEvent, AddReadRecordEvent],
})
export class PendapatanStsModule {}
