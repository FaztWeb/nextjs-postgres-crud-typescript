import Link from "next/link";
import { Task } from "@/interfaces/Tasks";

interface Props {
  task: Task;
}

export const TaskCard = ({ task }: Props) => {
  return (
    <Link
      href={`/tasks/edit/${task.id}`}
      className="block bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
    >
      <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
      {task.created_on && (
        <p className="text-sm text-gray-500 mb-2">
          {new Date(task.created_on).toLocaleDateString()}
        </p>
      )}
      <p className="text-gray-700">{task.description}</p>
    </Link>
  );
}; 