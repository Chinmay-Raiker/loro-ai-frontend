import { NavLink } from "react-router-dom";

const items = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/agents", label: "Agents" },
];

export function Sidebar() {
  return (
    <aside className="hidden md:block w-64 shrink-0 border-r border-gray-200 bg-white">
      <div className="h-16 flex items-center px-4 border-b border-gray-200">
        <span className="font-semibold text-blue-600">Loro.ai</span>
      </div>
      <nav className="p-2">
        <ul className="space-y-1">
          {items.map((i) => (
            <li key={i.href}>
              <NavLink
                to={i.href}
                data-testid={`nav-${i.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `block rounded-xl px-3 py-2 text-sm",
                    ${
                      isActive ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50"
                    }
                  `
                }
                end={false}
              >
                {i.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
