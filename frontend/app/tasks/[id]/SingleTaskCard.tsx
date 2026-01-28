"use client";

import { useRouter } from "next/navigation";
import { updateTask, deleteTask, Task } from "@/lib/api";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SingleTaskCard({ task }: { task: Task }) {
  const router = useRouter();
  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState(task.status);
  const [loading, setLoading] = useState(false);

  async function handleUpdate() {
    setLoading(true);
    try {
      await updateTask(task.id, title, status);
      toast.success("Task updated");
      router.refresh();
    } catch (err) {
      toast.error("Failed to update task");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this task?")) return;

    setLoading(true);
    try {
      await deleteTask(task.id);
      toast.success("Task deleted");
      router.push("/tasks");
    } catch (err) {
      toast.error("Failed to delete task");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-8 space-y-6">
      {/* Title */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-2xl font-semibold text-gray-800 border-b border-gray-200 focus:outline-none focus:border-teal-500"
      />

      {/* Created date */}
      <p className="text-sm text-gray-500">
        Created{" "}
        {new Date(task.created_at).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>

      {/* Status */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-600">Status</span>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Task["status"])}
          className="border border-gray-300 rounded-md px-3 py-1 text-sm"
        >
          <option value="OPEN">Pending</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      {/* Badges (hardcoded for now) */}
      <div className="flex gap-3">
        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">
          Priority: High
        </span>
        <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs">
          Category: Personal
        </span>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center pt-6 border-t">
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="bg-teal-500 hover:bg-teal-600  cursor-pointer disabled:opacity-60 text-white px-6 py-2 rounded-md font-medium"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-red-600 cursor-pointer hover:text-red-700 font-medium"
        >
          Delete Task
        </button>
      </div>
    </div>
  );
}
