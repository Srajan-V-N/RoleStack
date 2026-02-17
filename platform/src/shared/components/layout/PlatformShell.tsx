import { NavLink, Outlet, useLocation } from "react-router";
import { FileText, Target, Briefcase, LayoutDashboard } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const modules = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/jnt", label: "Job Notification Tracker", icon: Briefcase },
  { to: "/prp", label: "Placement Readiness", icon: Target },
  { to: "/rb", label: "Resume Builder", icon: FileText },
];

export default function PlatformShell() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-surface font-sans text-text-primary print:min-h-0">
      <nav className="flex h-14 items-center justify-between border-b border-border bg-white px-6 print:hidden">
        <span className="font-serif text-lg font-bold text-text-primary">
          KodNest
        </span>
        <div className="flex gap-6">
          {modules.map(({ to, label, icon: Icon }) => {
            const isActive =
              to === "/dashboard"
                ? pathname === "/" || pathname === "/dashboard"
                : pathname.startsWith(to);
            return (
              <NavLink
                key={to}
                to={to}
                className={cn(
                  "flex items-center gap-1.5 text-sm font-medium transition-calm",
                  isActive
                    ? "text-accent"
                    : "text-gray-500 hover:text-text-primary"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            );
          })}
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
