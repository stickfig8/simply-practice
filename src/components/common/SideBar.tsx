import { useSideBarStore } from "@/stores/sideBarStore";
import { Link } from "react-router-dom";

export default function SideBar() {
  const { isOpen, setIsOpen } = useSideBarStore();
  return (
    <aside
      className={`fixed inset-0 h-screen bg-indigo-800 transition-all duration-300 ease-in-out  ${isOpen ? "w-30" : "w-0"}`}
    >
      <div className="flex items-center justify-between h-16 px-4">
        <button
          className="text-xl font-bold"
          onClick={() => setIsOpen(!isOpen)}
        >
          MyApp
        </button>
      </div>

      <nav
        className={`p-4 space-y-2 transform transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-30"
        }`}
      >
        <Link to="/" className="block hover:text-indigo-300">
          Home
        </Link>
        <Link to="/practice" className="block hover:text-indigo-300">
          Practice
        </Link>
        <Link to="/logs" className="block hover:text-indigo-300">
          Logs
        </Link>
      </nav>
    </aside>
  );
}
