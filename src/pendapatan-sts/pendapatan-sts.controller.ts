import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PendapatanStsService } from './pendapatan-sts.service';
import type { PendapatanStsRecord } from './entities/pendapatan-sts-record.entity';

/**
 * Endpoint untuk mengonsumsi data bersih STS (reporting).
 */
@Controller('pendapatan-sts')
export class PendapatanStsController {
  constructor(private readonly pendapatanStsService: PendapatanStsService) {}

  @Get()
  getAll(): PendapatanStsRecord[] {
    return this.pendapatanStsService.getAllRecords();
  }

  @Get('by-id/:id_sts')
  getByIdSts(
    @Param('id_sts', ParseIntPipe) idSts: number,
  ): PendapatanStsRecord | undefined {
    return this.pendapatanStsService.getRecordByIdSts(idSts);
  }

  @Get('by-no/:no_sts')
  getByNoSts(
    @Param('no_sts') noSts: string,
  ): PendapatanStsRecord | undefined {
    return this.pendapatanStsService.getRecordByNoSts(noSts);
  }
}
