import { getTasks } from "@/lib/api";
import CreateTaskForm from "@/components/CreateTaskForm";
import TaskCard from "@/components/TaskCard";
import Link from "next/link";

export default async function Home() {
  const tasks = await getTasks();

  return (
    <div className="min-h-screen rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 p-6 sm:p-10">
      <h1 className="text-3xl font-bold text-white mb-6">Tasks</h1>
      <CreateTaskForm />

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks yet.</p>
      ) : (
        tasks.map((task) => <TaskCard key={task.id} task={task} />)
      )}
    </div>
  );
}
