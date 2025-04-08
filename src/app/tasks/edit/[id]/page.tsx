import { TaskForm } from "@/components/tasks/TaskForm";
import { Task } from "@/interfaces/Tasks";
import { pool } from "@/utils/database";
import { QueryResult } from "pg";

import type { JSX } from "react";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

async function getTask(id: string): Promise<Task> {
  const { rows }: QueryResult<Task> = await pool.query(
    "SELECT * FROM tasks WHERE id = $1",
    [id]
  );

  if (rows.length === 0) {
    throw new Error("Task not found");
  }

  return rows[0];
}

export default async function EditPage({
  params,
}: Props): Promise<JSX.Element> {
  const { id } = await params;
  const task = await getTask(id);

  return <TaskForm taskId={id} initialTask={task} />;
}
