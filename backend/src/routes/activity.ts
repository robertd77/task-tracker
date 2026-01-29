import { Router } from "express";
import { pool } from "../db";

const activityRouter = Router();

activityRouter.get("/", async (_req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT
        id,
        event_type,
        task_id,
        task_title,
        created_at
      FROM activity
      ORDER BY created_at DESC
      LIMIT 20
      `,
    );

    res.json(result.rows);
  } catch (err) {
    console.error("GET /activity error:", err);
    res.status(500).json({ error: "Failed to fetch activity" });
  }
});

export default activityRouter;
