import { Injectable } from '@nestjs/common';
import type { PendapatanStsRecord } from './entities/pendapatan-sts-record.entity';

/**
 * Service untuk mengelola data STS yang dikonsumsi dari Kafka.
 * Menyimpan data bersih untuk dikonsumsi user (reporting).
 */
@Injectable()
export class PendapatanStsService {
  /** Mendapatkan semua record STS (untuk keperluan reporting/monitoring) */
  getAllRecords(): PendapatanStsRecord[] {
    // Untuk saat ini kita tetap expose bentuk interface lama dari database read.
    // Implementasi bisa diubah nanti untuk langsung mapping dari entity.
    throw new Error('getAllRecords belum diimplementasikan untuk database');
  }

  /** Mendapatkan record berdasarkan id_sts */
  getRecordByIdSts(idSts: number): PendapatanStsRecord | undefined {
    throw new Error('getRecordByIdSts belum diimplementasikan untuk database');
  }

  /** Mendapatkan record berdasarkan no_sts */
  getRecordByNoSts(noSts: string): PendapatanStsRecord | undefined {
    throw new Error('getRecordByNoSts belum diimplementasikan untuk database');
  }
}
