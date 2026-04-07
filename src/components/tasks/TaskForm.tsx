"use client";

import { ChangeEvent, FormEvent, useState, type JSX } from "react";
import { Task } from "@/interfaces/Tasks";
import { FaSave, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ChangeInputHandler = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

interface TaskFormProps {
  taskId?: string;
  initialTask?: Task;
}

const inititalState = {
  title: "",
  description: "",
};

export const TaskForm = ({
  taskId,
  initialTask = inititalState,
}: TaskFormProps): JSX.Element => {
  const [task, setTask] = useState<Task>(initialTask);
  const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const router = useRouter();

  const createTask = async (task: Task) =>
    await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });

  const updateTask = async (id: string, task: Task) => {
    const result = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!result.ok) {
      throw new Error("Failed to update task");
    }

    toast.success("Task updated successfully");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      if (taskId) {
        await updateTask(taskId, task);
      } else {
        await createTask(task);
      }
      setTask(inititalState);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleChange = ({ target: { name, value } }: ChangeInputHandler) =>
    setTask({ ...task, [name]: value });

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h2 className="text-xl font-bold text-ink dark:text-night-text mb-5">
          {taskId ? "Edit Task" : "New Task"}
        </h2>
        <div className="bg-white border border-parchment-200 shadow-form rounded-notebook p-6 dark:bg-night-card dark:border-night-border dark:shadow-form-dark">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-ink-light dark:text-night-muted mb-1.5"
              >
                Title
              </label>
              <input
                type="text"
                placeholder="What needs to be done?"
                name="title"
                onChange={handleChange}
                value={task.title}
                autoFocus
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-ink-light dark:text-night-muted mb-1.5"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={3}
                placeholder="Add some details..."
                onChange={handleChange}
                value={task.description}
              />
            </div>
            <div className="flex gap-3 pt-1">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl text-white bg-amber-500 hover:bg-amber-600 active:bg-amber-700 shadow-card dark:shadow-card-dark hover:shadow-card-hover dark:hover:shadow-card-dark-hover focus:outline-none focus:ring-2 focus:ring-amber-300 dark:focus:ring-amber-500/30 disabled:opacity-50 transition-all duration-200"
              >
                <FaSave className="mr-2" />
                {taskId
                  ? loading
                    ? "Updating..."
                    : "Update"
                  : loading
                    ? "Saving..."
                    : "Save"}
              </button>
              {taskId && (
                <button
                  type="button"
                  onClick={() => setOpenConfirm(true)}
                  className="inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 dark:text-red-400 dark:bg-red-500/10 dark:border-red-500/20 dark:hover:bg-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-200 dark:focus:ring-red-500/20 transition-all duration-200"
                >
                  <FaTrash className="mr-2 text-xs" />
                  Delete
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {openConfirm && taskId && (
        <div className="fixed inset-0 bg-ink/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-parchment-200 rounded-notebook p-6 max-w-sm w-full shadow-card-hover dark:bg-night-card dark:border-night-border dark:shadow-card-dark-hover">
            <h3 className="text-lg font-bold text-ink dark:text-night-text mb-2">Delete task?</h3>
            <p className="text-sm text-ink-light dark:text-night-muted mb-6">
              This can&apos;t be undone. The task will be permanently removed.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpenConfirm(false)}
                className="px-4 py-2 text-sm font-semibold rounded-xl text-ink-light bg-parchment-100 border border-parchment-300 hover:bg-parchment-200 dark:text-night-muted dark:bg-night-surface dark:border-night-border dark:hover:bg-night-border transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(taskId)}
                className="px-4 py-2 text-sm font-semibold rounded-xl text-white bg-red-500 hover:bg-red-600 transition-all duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
