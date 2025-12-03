import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../lib/Auth";

const links = [
  { name: "Dashboard", path: "/" },
  { name: "Clients", path: "/clients" },
  { name: "Projects", path: "/projects" },
  { name: "Invoices", path: "/invoices" },
  { name: "Revenue", path: "/revenue" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <header className="md:hidden border-b bg-background/80 backdrop-blur">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
            BL
          </div>
          <span className="text-sm font-semibold tracking-tight">
            BlackLedger
          </span>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-card text-foreground shadow-sm"
        >
          <span className="sr-only">Toggle navigation</span>
          <div className="space-y-1.5">
            <span className="block h-0.5 w-4 bg-current rounded" />
            <span className="block h-0.5 w-4 bg-current rounded" />
          </div>
        </button>
      </div>

      {open && (
        <nav className="border-t bg-background px-2 pb-3 pt-2 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-sm font-medium ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/80 hover:bg-muted"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {user && (
            <div className="mt-3 pt-3 border-t border-border">
              <p className="px-3 py-2 text-xs text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
          )}

          <button
            onClick={() => {
              setOpen(false);
              signOut();
            }}
            className="mt-2 w-full rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Sign out
          </button>
        </nav>
      )}
    </header>
  );
}
