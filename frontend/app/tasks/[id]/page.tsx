import { getTaskById } from "@/lib/api";
import TaskActions from "./task-actions";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TaskPage({ params }: Props) {
  const { id } = await params;
  const task = await getTaskById(id);

  return (
    <div>
      <h1>{task.title}</h1>
      <p>Status: {task.status}</p>

      <TaskActions task={task} />
    </div>
  );
}
