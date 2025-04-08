import { Task } from "@/interfaces/Tasks";
import { TaskCard } from "./TaskCard";

interface Props {
  tasks: Task[];
}

export const TaskList = ({ tasks = [] }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};
