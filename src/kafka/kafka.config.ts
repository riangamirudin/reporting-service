/**
 * Konfigurasi Kafka untuk reporting service (consumer).
 * Sesuai pola modul: clientId, brokers, groupId, topics.
 */
export const kafkaConfig = {
  clientId:
    process.env.KAFKA_CLIENT_ID ?? 'reporting-service',
  brokers: process.env.KAFKA_BROKERS?.split(',') ?? ['localhost:9094'],
  groupId:
    process.env.KAFKA_CONSUMER_GROUP ?? 'reporting-service-group',
  topics: {
    pendapatanStsPosted: 'pendapatan.sts.posted',
  },
};
