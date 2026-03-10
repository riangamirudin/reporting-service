/**
 * Konfigurasi Kafka untuk reporting service
 */
export const KAFKA_BROKERS = process.env.KAFKA_BROKERS?.split(',') ?? [
  'localhost:9092',
];
export const KAFKA_CLIENT_ID =
  process.env.KAFKA_CLIENT_ID ?? 'reporting-service-consumer';
export const KAFKA_CONSUMER_GROUP =
  process.env.KAFKA_CONSUMER_GROUP ?? 'reporting-service-group';

/** Topic untuk event penambahan data pendapatan STS yang sudah di-post */
export const TOPIC_PENDAPATAN_STS_POSTED = 'pendapatan.sts.posted';
