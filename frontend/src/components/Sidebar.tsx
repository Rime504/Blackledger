import { NavLink } from "react-router-dom";
import { useAuth } from "../lib/Auth";

const links = [
  { name: "Dashboard", path: "/" },
  { name: "Clients", path: "/clients" },
  { name: "Projects", path: "/projects" },
  { name: "Invoices", path: "/invoices" },
  { name: "Revenue", path: "/revenue" },
];

export default function Sidebar() {
  const { user, signOut } = useAuth();

  return (
    <aside className="hidden md:flex md:w-64 lg:w-72 bg-[#0a0a0a] text-white border-r border-white/10 flex-col">
      <div className="px-6 pt-8 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="rounded-lg p-3 bg-white/10 text-base font-semibold tracking-tight">
            BL
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight">
              BlackLedger
            </span>
            <span className="text-xs text-gray-500">
              Silent finance intelligence
            </span>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              [
                "flex items-center gap-3 rounded-lg px-4 py-3 mb-1 text-sm transition-all duration-200 border-l-4",
                isActive
                  ? "bg-white/10 text-white font-semibold border-blue-500"
                  : "border-transparent text-gray-400 hover:text-white hover:bg-white/5",
              ].join(" ")
            }
          >
            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* User section with logout */}
      {user && (
        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="w-full rounded-lg px-4 py-2 text-sm font-medium text-white bg-white/5 hover:bg-white/10 transition-all duration-200 border border-white/10"
          >
            Sign out
          </button>
        </div>
      )}
    </aside>
  );
}
