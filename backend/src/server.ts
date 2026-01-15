import dotenv from "dotenv";
dotenv.config();
import express from "express";
import tasksRouter from "./routes/tasks";
import { initKafkaProducer } from "./kafka/producer";

const app = express();
app.use(express.json());

app.use("/tasks", tasksRouter);

app.listen(3000, async () => {
  console.log("API running on http://localhost:3000");
  await initKafkaProducer();
});
