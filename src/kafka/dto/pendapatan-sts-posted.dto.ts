/**
 * Payload event dari topic pendapatan.sts.posted
 */
export interface PendapatanStsPostedPayload {
  /** Jenis event (sts.posted) */
  event: string;
  /** ID STS */
  id_sts: number;
  /** Nomor STS */
  no_sts: string;
  /** Uraian retribusi/penyetoran */
  uraian: string;
  /** Total nominal */
  total: number;
  /** Daftar ID TBP Bapenda */
  list_id_tbp_bapenda: number[];
  /** Tanggal STS (YYYY-MM-DD) */
  tanggal_sts: string;
  /** Nomor referensi */
  nomor_referensi: string;
  /** Workstation sumber */
  workstation: string;
  /** Waktu event (ISO 8601) */
  at: string;
}
