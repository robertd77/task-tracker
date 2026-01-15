import { kafka } from "./client";

const producer = kafka.producer();

let isConnected = false;

export async function initKafkaProducer() {
  if (!isConnected) {
    await producer.connect();
    isConnected = true;
    console.log("Kafka producer connected");
  }
}

export async function sendEvent(
  topic: string,
  payload: Record<string, unknown>
) {
  try {
    await producer.send({
      topic,
      messages: [
        {
          value: JSON.stringify(payload),
        },
      ],
    });
  } catch (err) {
    console.error("Kafka send failed:", err);
  }
}
