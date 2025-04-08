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
    <div className="min-h-screen bg-gray-900 p-10">
      {tasks.length === 0 ? (
        <div className="flex items-center justify-center h-[70vh]">
          <div className="text-center text-gray-200">
            <BiTaskX className="mx-auto text-[15rem]" />
            <h1 className="text-3xl font-bold my-4">No tasks yet</h1>
            <a
              href="/tasks/new"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create one
            </a>
          </div>
        </div>
      ) : (
        <TaskList tasks={tasks} />
      )}
    </div>
  );
}
