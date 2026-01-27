type ActivityEvent = {
  id: string;
  event_type: string;
  created_at: string;
  task_title?: string | null;
};

export default function ActivityFeed({ events }: { events: ActivityEvent[] }) {
  if (!events.length) {
    return <p className="text-gray-500 text-sm">No recent activity.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h1 className="text-2xl font-semibold mb-6">Activity Feed</h1>

      <ul className="space-y-3">
        {events.map((event: any) => {
          const eventType = event.event_type.replace("task.", "").toUpperCase();

          return (
            <li
              key={event.id}
              className="
                bg-white
                rounded-lg
                border
                px-4
                py-3
                shadow-sm
                transition
                duration-200
                ease-out
                hover:bg-gray-50
                hover:translate-x-[2px]
              "
            >
              <div className="flex justify-between items-center gap-3">
                <div className="flex items-center gap-3 text-sm">
                  <div>{renderIcon(event.event_type)}</div>
                  <div className="text-sm">
                    <span className="font-semibold text-gray-800">
                      {eventType}
                    </span>
                    <span className="text-gray-500">
                      {" "}
                      — {event.task_title ?? "N/A"}
                    </span>
                  </div>
                </div>
                <time className="text-xs text-gray-500 whitespace-nowrap">
                  {new Date(event.created_at).toLocaleString()}
                </time>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function renderIcon(type: string) {
  if (type === "task.created") return <span className="text-green-500">●</span>;
  if (type === "task.updated") return <span className="text-teal-500">●</span>;
  if (type === "task.deleted") return <span className="text-red-500">●</span>;
  return <span className="text-gray-400">●</span>;
}
