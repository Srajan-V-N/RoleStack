import { NavLink } from "react-router";
import { cn } from "@/shared/lib/utils";

interface NavItem {
  to: string;
  label: string;
  end?: boolean;
}

interface ModuleNavProps {
  items: NavItem[];
}

export default function ModuleNav({ items }: ModuleNavProps) {
  return (
    <div className="border-b border-border bg-white px-6">
      <div className="flex gap-6">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                "border-b-2 pb-2 pt-3 text-sm font-medium transition-calm",
                isActive
                  ? "border-accent text-accent"
                  : "border-transparent text-gray-500 hover:text-text-primary"
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
