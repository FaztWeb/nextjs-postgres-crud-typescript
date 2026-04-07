import { pool } from "@/utils/database";
import { BiTaskX } from "react-icons/bi";
import { TaskList } from "src/components/tasks/TaskList";
import { Task } from "@/interfaces/Tasks";
import { QueryResult } from "pg";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { rows: tasks }: QueryResult<Task> = await pool.query(
    "SELECT * FROM tasks"
  );

  return (
    <div className="min-h-screen p-6 md:p-10">
      <div className="container mx-auto">
        {tasks.length === 0 ? (
          <div className="flex items-center justify-center h-[70vh]">
            <div className="text-center">
              <BiTaskX className="mx-auto text-[10rem] text-parchment-400" />
              <h1 className="text-2xl font-bold my-4 text-ink">
                No tasks yet
              </h1>
              <p className="text-ink-muted mb-6">
                Start by creating your first task
              </p>
              <a
                href="/tasks/new"
                className="inline-block px-6 py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 shadow-card hover:shadow-card-hover transition-all duration-200"
              >
                Create one
              </a>
            </div>
          </div>
        ) : (
          <TaskList tasks={tasks} />
        )}
      </div>
    </div>
  );
}
