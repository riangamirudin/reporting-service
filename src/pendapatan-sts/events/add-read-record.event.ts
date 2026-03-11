import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import type { PendapatanStsRecord } from '../entities/pendapatan-sts-record.entity';
import { PendapatanStsEntity } from '../entities/pendapatan-sts.entity';
import type { PendapatanStsPostedPayload } from '../../kafka/dto/pendapatan-sts-posted.dto';

@Injectable()
export class AddReadRecordEvent {
  constructor(
    @InjectRepository(PendapatanStsEntity)
    private readonly readRepository: Repository<PendapatanStsEntity>,
  ) {}

  /**
   * Event untuk menambah record ke database report_read.
   */
  async handle(payload: PendapatanStsPostedPayload): Promise<void> {
    const receivedAt = new Date().toISOString();
    const record: PendapatanStsRecord = {
      id_sts: payload.id_sts,
      no_sts: payload.no_sts,
      uraian: payload.uraian,
      total: payload.total,
      list_id_tbp_bapenda: payload.list_id_tbp_bapenda,
      tanggal_sts: payload.tanggal_sts,
      nomor_referensi: payload.nomor_referensi,
      workstation: payload.workstation,
      at: payload.at,
      receivedAt,
    };

    await this.readRepository.save({
      ...record,
    });
  }
}

