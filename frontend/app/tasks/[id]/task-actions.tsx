"use client";

import { useRouter } from "next/navigation";
import { updateTask, deleteTask, Task } from "@/lib/api";
import { useState } from "react";

export default function TaskActions({ task }: { task: Task }) {
  const router = useRouter();
  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState(task.status);
  const [loading, setLoading] = useState(false);

  async function handleUpdate() {
    setLoading(true);
    await updateTask(task.id, title, status);
    setLoading(false);
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm("Delete this task?")) return;

    setLoading(true);
    await deleteTask(task.id);
    router.push("/tasks");
  }

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as "open" | "done")}
      >
        <option value="open">open</option>
        <option value="done">done</option>
      </select>

      <button onClick={handleUpdate} disabled={loading}>
        Update
      </button>

      <button onClick={handleDelete} disabled={loading}>
        Delete
      </button>
    </div>
  );
}
