import { Router } from "express";
import { pool } from "../db";

const taskRouter = Router();

taskRouter.post("/", async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: "title is required" });
    }

    const result = await pool.query(
      "insert into tasks (title) values ($1) returning *",
      [title]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("POST /tasks error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

taskRouter.get("/", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM tasks ORDER BY created_at DESC"
  );
  res.json(result.rows);
});

taskRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, status } = req.body;

    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(id)) {
      return res.status(400).json({ error: "Invalid UUID" });
    }

    const result = await pool.query(
      "UPDATE tasks SET title = COALESCE($1, title), status = COALESCE($2, status) WHERE id = $3 RETURNING *",
      [title, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("PUT /tasks/:id error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

taskRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(id)) {
      return res.status(400).json({ error: "Invalid UUID" });
    }

    const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("GET /tasks/:id error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

taskRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(id)) {
      return res.status(400).json({ error: "Invalid UUID" });
    }

    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted", task: result.rows[0] });
  } catch (error) {
    console.error("DELETE /tasks error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default taskRouter;
