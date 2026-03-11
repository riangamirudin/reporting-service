import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { PendapatanStsModule } from './pendapatan-sts/pendapatan-sts.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    KafkaModule,
    PendapatanStsModule,
    TypeOrmModule.forRoot({
      name: 'reporting',
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'reporting',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forRoot({
      name: 'reporting_read',
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'reporting_read',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
