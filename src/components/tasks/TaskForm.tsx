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
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                placeholder="Write a title"
                name="title"
                onChange={handleChange}
                value={task.title}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                autoFocus
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={2}
                placeholder="Write a Description"
                onChange={handleChange}
                value={task.description}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              ></textarea>
            </div>
            <div className="flex space-x-4">
              {taskId ? (
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  <FaSave className="mr-2" />
                  {loading ? "Updating..." : "Update"}
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FaSave className="mr-2" />
                  {loading ? "Saving..." : "Save"}
                </button>
              )}
              {taskId && (
                <button
                  type="button"
                  onClick={() => setOpenConfirm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <FaTrash className="mr-2" />
                  Delete
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {openConfirm && taskId && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Delete a Task
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete task {taskId}?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setOpenConfirm(false)}
                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(taskId)}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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
