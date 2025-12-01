import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const links = [
    { name: "Dashboard", path: "/" },
    { name: "Clients", path: "/clients" },
    { name: "Projects", path: "/projects" },
    { name: "Invoices", path: "/invoices" },
    { name: "Revenue", path: "/revenue" },
  ];

  return (
    <div className="w-60 bg-gray-900 text-white flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-8">BlackLedger</h1>
      {links.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            `py-2 px-4 rounded mb-2 hover:bg-gray-700 ${
              isActive ? "bg-gray-800" : ""
            }`
          }
        >
          {link.name}
        </NavLink>
      ))}
    </div>
  );
}
