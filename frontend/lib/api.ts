const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export type Task = {
  id: string;
  title: string;
  status: "open" | "done";
  created_at: string;
};

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(`${API_URL}/tasks`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

export async function getTaskById(id: string): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch task");
  return res.json();
}

export async function createTask(title: string): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
}

export async function updateTask(
  id: string,
  title: string,
  status: "open" | "done",
): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, status }),
  });
  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
}

export async function deleteTask(id: string) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete task");
}

export async function getActivity() {
  const res = await fetch(`${API_URL}/activity`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch activity");
  return res.json();
}
