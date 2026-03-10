import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import {
  Kafka,
  Consumer,
  ConsumerSubscribeTopics,
  EachMessagePayload,
} from 'kafkajs';
import { kafkaConfig } from '../kafka.config';
import { PendapatanStsService } from '../../pendapatan-sts/pendapatan-sts.service';
import type { PendapatanStsPostedPayload } from '../dto/pendapatan-sts-posted.dto';

/**
 * Consumer Kafka dengan kafkajs (sesuai modul).
 * Subscribe ke pendapatan.sts.posted dan memperbarui data reporting via PendapatanStsService.
 */
@Injectable()
export class ConsumerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(ConsumerService.name);
  private kafka: Kafka;
  private consumer: Consumer;

  constructor(private readonly pendapatanStsService: PendapatanStsService) {
    this.kafka = new Kafka({
      clientId: kafkaConfig.clientId,
      brokers: kafkaConfig.brokers,
    });
    this.consumer = this.kafka.consumer({
      groupId: kafkaConfig.groupId,
    });
  }

  async onModuleInit() {
    await this.consumer.connect();
    this.logger.log('✅ Kafka consumer connected');

    const topicConfig: ConsumerSubscribeTopics = {
      topics: [kafkaConfig.topics.pendapatanStsPosted],
      fromBeginning: true,
    };
    await this.consumer.subscribe(topicConfig);
    this.logger.log(
      `📡 Subscribed to topic: ${kafkaConfig.topics.pendapatanStsPosted}`,
    );

    await this.consumer.run({
      eachMessage: async (payload: EachMessagePayload) => {
        await this.handlePendapatanStsPostedEvent(payload);
      },
    });
  }

  private async handlePendapatanStsPostedEvent(
    payload: EachMessagePayload,
  ): Promise<void> {
    const { topic, partition, message } = payload;
    const key = message.key?.toString();
    const value = message.value?.toString();

    this.logger.log('====================================');
    this.logger.log(`📥 Received message from topic: ${topic}`);
    this.logger.log(`📌 Partition: ${partition}, Key: ${key}`);

    try {
      const eventData: PendapatanStsPostedPayload = JSON.parse(value ?? '{}');
      this.logger.debug(
        `📦 Event data: ${JSON.stringify(eventData, null, 2)}`,
      );

      if (
        eventData.id_sts == null ||
        !eventData.no_sts ||
        eventData.total == null
      ) {
        this.logger.warn(
          '❌ Invalid event format: missing id_sts, no_sts, or total',
        );
        return;
      }

      this.pendapatanStsService.addRecord(eventData);
      this.logger.log(
        `✅ Record added: id_sts=${eventData.id_sts}, no_sts=${eventData.no_sts}, total=${eventData.total}`,
      );
    } catch (error) {
      this.logger.error(
        `❌ Error processing event: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
    this.logger.log('====================================');
  }

  async onModuleDestroy() {
    await this.consumer.disconnect();
    this.logger.log('Kafka consumer disconnected');
  }
}
