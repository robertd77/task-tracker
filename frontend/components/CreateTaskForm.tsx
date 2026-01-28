"use client";

import { useState } from "react";
import { createTask } from "@/lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CreateTaskForm() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      await createTask(title);
      setTitle("");
      router.refresh(); // refresh task list
      toast.success("Task created");
    } catch (err) {
      toast.error("Failed to create task");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col sm:flex-row gap-3 items-center"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task title"
        className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className={`px-4 py-2 rounded-md cursor-pointer text-white font-semibold transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {loading ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}
