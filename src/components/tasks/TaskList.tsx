import { Task } from "@/interfaces/Tasks";
import { TaskCard } from "./TaskCard";

interface Props {
  tasks: Task[];
}

export const TaskList = ({ tasks = [] }: Props) => {
  return (
    <div>
      <h2 className="text-lg font-bold text-ink dark:text-night-text mb-5">
        {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
