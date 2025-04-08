import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link 
          href="/"
          className="cursor-pointer flex items-center"
        >
          <span className="font-bold">Next.js App</span>
        </Link>

        <Link
          href="/tasks/new"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
        >
          New Task
        </Link>
      </div>
    </nav>
  );
};
