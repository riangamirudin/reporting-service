import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'pendapatan_sts' })
export class PendapatanStsEntity {
  @PrimaryColumn({ type: 'int' })
  id_sts: number;

  @Column({ type: 'varchar', length: 100 })
  no_sts: string;

  @Column({ type: 'text' })
  uraian: string;

  @Column({ type: 'numeric' })
  total: number;

  @Column('int', { array: true })
  list_id_tbp_bapenda: number[];

  @Column({ type: 'date' })
  tanggal_sts: string;

  @Column({ type: 'varchar', length: 100 })
  nomor_referensi: string;

  @Column({ type: 'varchar', length: 100 })
  workstation: string;

  @Column({ type: 'timestamptz' })
  at: string;

  @Column({ type: 'timestamptz' })
  receivedAt: string;
}

