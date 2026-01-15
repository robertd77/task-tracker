import { kafka } from "./client";

const consumer = kafka.consumer({
  groupId: "task-audit-consumer",
});

export async function startConsumer() {
  await consumer.connect();
  console.log("Kafka consumer connected");

  await consumer.subscribe({
    topic: "tasks",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const value = message.value?.toString();

      if (!value) return;

      try {
        const event = JSON.parse(value);

        console.log("📥 Kafka event received:", {
          topic,
          partition,
          event,
        });
      } catch (err) {
        console.error("Failed to parse Kafka message:", err);
      }
    },
  });
}
