import Link from "next/link";
import { Task } from "@/interfaces/Tasks";

interface Props {
  task: Task;
}

export const TaskCard = ({ task }: Props) => {
  return (
    <Link
      href={`/tasks/edit/${task.id}`}
      className="group block bg-white border border-parchment-200 rounded-notebook p-5 shadow-card hover:shadow-card-hover hover:border-parchment-300 dark:bg-night-card dark:border-night-border dark:shadow-card-dark dark:hover:shadow-card-dark-hover dark:hover:border-night-muted transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-bold text-ink dark:text-night-text group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors duration-200">
          {task.title}
        </h3>
        <span className="shrink-0 w-2 h-2 mt-2 rounded-full bg-amber-400 opacity-60 group-hover:opacity-100 transition-opacity" />
      </div>
      {task.description && (
        <p className="text-sm text-ink-light dark:text-night-muted mt-2 leading-relaxed line-clamp-2">
          {task.description}
        </p>
      )}
      {task.created_on && (
        <p className="text-xs text-ink-muted dark:text-night-faint mt-3 font-semibold tracking-wide">
          {new Date(task.created_on).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      )}
    </Link>
  );
};
