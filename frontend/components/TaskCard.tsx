import { FC } from "react";
import Link from "next/link";

interface Task {
  id: string;
  title: string;
  status: string;
  created_at: string;
}

interface Props {
  task: Task;
}

const TaskCard: FC<Props> = ({ task }) => {
  const isCompleted = task.status.toLowerCase() === "done";

  return (
    <Link href={`/tasks/${task.id}`} className="block">
      <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition mb-4 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
        {/* Left side: checkmark + title */}
        <div className="flex items-center gap-3 mb-2 sm:mb-0">
          {isCompleted ? (
            <svg
              className="w-8 h-8 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25a1 1 0 011.414-1.414L9 11.586l6.543-6.543a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6l4 2"
              />
            </svg>
          )}

          <div>
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p className="text-gray-500 text-sm">
              {new Intl.DateTimeFormat("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              }).format(new Date(task.created_at))}
            </p>
          </div>
        </div>

        {/* Right side: badges */}
        <div className="flex gap-2 mt-2 sm:mt-0">
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            Priority: High
          </span>
          <span className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full">
            Category: Personal
          </span>
        </div>
      </div>
    </Link>
  );
};

export default TaskCard;
