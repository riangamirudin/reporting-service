import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { PendapatanStsEntity } from './entities/pendapatan-sts.entity';
import type { PendapatanStsRecord } from './entities/pendapatan-sts-record.entity';

/**
 * Service untuk mengelola data STS yang dikonsumsi dari Kafka.
 * Read mengarah ke DB reporting_read (read replica / read table).
 */
@Injectable()
export class PendapatanStsService {
  constructor(
    @InjectRepository(PendapatanStsEntity, 'reporting_read')
    private readonly readRepository: Repository<PendapatanStsEntity>,
  ) {}

  /** Mendapatkan semua record STS dari read table (untuk reporting/monitoring) */
  async getAllRecords(): Promise<PendapatanStsRecord[]> {
    const rows = await this.readRepository.find({
      order: { id_sts: 'DESC' },
    });
    return rows.map((e) => this.entityToRecord(e));
  }

  /** Mendapatkan record berdasarkan id_sts dari read table */
  async getRecordByIdSts(
    idSts: number,
  ): Promise<PendapatanStsRecord | undefined> {
    const row = await this.readRepository.findOne({ where: { id_sts: idSts } });
    return row ? this.entityToRecord(row) : undefined;
  }

  /** Mendapatkan record berdasarkan no_sts dari read table */
  async getRecordByNoSts(
    noSts: string,
  ): Promise<PendapatanStsRecord | undefined> {
    const row = await this.readRepository.findOne({
      where: { no_sts: noSts },
    });
    return row ? this.entityToRecord(row) : undefined;
  }

  private entityToRecord(entity: PendapatanStsEntity): PendapatanStsRecord {
    return {
      id_sts: entity.id_sts,
      no_sts: entity.no_sts,
      uraian: entity.uraian,
      total: Number(entity.total),
      list_id_tbp_bapenda: entity.list_id_tbp_bapenda,
      tanggal_sts:
        typeof entity.tanggal_sts === 'string'
          ? entity.tanggal_sts
          : (entity.tanggal_sts as Date).toISOString().slice(0, 10),
      nomor_referensi: entity.nomor_referensi,
      workstation: entity.workstation,
      at: typeof entity.at === 'string' ? entity.at : (entity.at as Date).toISOString(),
      receivedAt:
        typeof entity.receivedAt === 'string'
          ? entity.receivedAt
          : (entity.receivedAt as Date).toISOString(),
    };
  }
}
