import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="bg-parchment-100 border-b border-parchment-300">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="text-2xl">📓</span>
          <span className="font-extrabold text-lg text-ink tracking-tight">
            My Tasks
          </span>
        </Link>

        <Link
          href="/tasks/new"
          className="bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold py-2 px-5 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-200"
        >
          + New Task
        </Link>
      </div>
    </nav>
  );
};
