import { getTasks } from "@/lib/api";
import CreateTaskForm from "@/components/CreateTaskForm";
import Link from "next/link";

export default async function Home() {
  const tasks = await getTasks();

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Task Tracker</h1>
      <CreateTaskForm />

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center border p-3 rounded"
          >
            <Link href={`/tasks/${task.id}`}>
              <span className={task.status === "done" ? "line-through" : ""}>
                {task.title}
              </span>
            </Link>
            <span className="text-sm text-gray-500">{task.status}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
