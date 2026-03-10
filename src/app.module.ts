import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { PendapatanStsModule } from './pendapatan-sts/pendapatan-sts.module';

@Module({
  imports: [KafkaModule, PendapatanStsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
