import { getActivity } from "@/lib/api";

export default async function ActivityPage() {
  const activity = await getActivity();

  return (
    <div>
      <h1>Activity Feed</h1>
      <ul>
        {activity.map((event: any) => (
          <li key={event.id}>
            <strong>{event.event_type.replace("task.", "")}</strong> –{" "}
            {event.task_title ?? "N/A"} (
            {new Date(event.created_at).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
}
