import { Injectable } from '@nestjs/common';
import type { PendapatanStsRecord } from './entities/pendapatan-sts-record.entity';
import type { PendapatanStsPostedPayload } from '../kafka/dto/pendapatan-sts-posted.dto';

/**
 * Service untuk mengelola data STS yang dikonsumsi dari Kafka.
 * Menyimpan data bersih untuk dikonsumsi user (reporting).
 */
@Injectable()
export class PendapatanStsService {
  /** Simulasi database in-memory (mirip InventoryService.stockDatabase) */
  private readonly records: Map<number, PendapatanStsRecord> = new Map();

  /**
   * Menambah record dari event pendapatan.sts.posted.
   * Update jika id_sts sudah ada (idempotensi).
   */
  addRecord(payload: PendapatanStsPostedPayload): void {
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
    this.records.set(payload.id_sts, record);
  }

  /** Mendapatkan semua record STS (untuk keperluan reporting/monitoring) */
  getAllRecords(): PendapatanStsRecord[] {
    return Array.from(this.records.values());
  }

  /** Mendapatkan record berdasarkan id_sts */
  getRecordByIdSts(idSts: number): PendapatanStsRecord | undefined {
    return this.records.get(idSts);
  }

  /** Mendapatkan record berdasarkan no_sts */
  getRecordByNoSts(noSts: string): PendapatanStsRecord | undefined {
    return this.getAllRecords().find((r) => r.no_sts === noSts);
  }
}
