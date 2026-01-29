import dotenv from "dotenv";
dotenv.config();
import express from "express";
import tasksRouter from "./routes/tasks";
import { initKafkaProducer } from "./kafka/producer";
import activityRouter from "./routes/activity";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use("/tasks", tasksRouter);
app.use("/activity", activityRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  console.log("API running on port", PORT);
  await initKafkaProducer();
});
