import "dotenv/config";
import { startConsumer } from "./kafka/consumer";

startConsumer().catch((err) => {
  console.error("Consumer failed:", err);
  process.exit(1);
});
