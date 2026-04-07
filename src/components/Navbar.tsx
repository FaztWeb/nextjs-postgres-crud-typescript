import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar = () => {
  return (
    <nav className="bg-parchment-100 border-b border-parchment-300 dark:bg-night-surface dark:border-night-border transition-colors duration-200">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="text-2xl">📓</span>
          <span className="font-extrabold text-lg text-ink dark:text-night-text tracking-tight">
            My Tasks
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/tasks/new"
            className="bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold py-2 px-5 rounded-xl shadow-card dark:shadow-card-dark hover:shadow-card-hover dark:hover:shadow-card-dark-hover transition-all duration-200"
          >
            + New Task
          </Link>
        </div>
      </div>
    </nav>
  );
};
