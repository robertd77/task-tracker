import dotenv from "dotenv";
dotenv.config();
import express from "express";
import tasksRouter from "./routes/tasks";
import { initKafkaProducer } from "./kafka/producer";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/tasks", tasksRouter);

app.listen(4000, async () => {
  console.log("API running on http://localhost:4000");
  await initKafkaProducer();
});
