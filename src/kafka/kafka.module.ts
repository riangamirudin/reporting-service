import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer/consumer.service';
import { PendapatanStsModule } from '../pendapatan-sts/pendapatan-sts.module';

/**
 * Modul Kafka: consumer yang memproses event dan mengisi data reporting.
 * Sesuai modul: imports domain module, providers ConsumerService.
 */
@Module({
  imports: [PendapatanStsModule],
  providers: [ConsumerService],
  exports: [ConsumerService],
})
export class KafkaModule {}
