/**
 * Satu record STS yang disimpan untuk reporting (data bersih).
 * Diisi dari event pendapatan.sts.posted.
 */
export interface PendapatanStsRecord {
  id_sts: number;
  no_sts: string;
  uraian: string;
  total: number;
  list_id_tbp_bapenda: number[];
  tanggal_sts: string;
  nomor_referensi: string;
  workstation: string;
  /** Waktu event diterima (ISO 8601) */
  at: string;
  /** Waktu record disimpan di reporting (untuk audit) */
  receivedAt: string;
}
