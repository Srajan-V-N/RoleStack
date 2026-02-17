import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Saved", to: "/saved" },
  { label: "Digest", to: "/digest" },
  { label: "Settings", to: "/settings" },
  { label: "Proof", to: "/proof" },
  { label: "Test", to: "/test" },
];

const AppNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="border-b border-border bg-card">
      <div className="flex items-center justify-between px-[24px] py-[8px]">
        <span className="font-sans text-sm font-semibold tracking-wide text-foreground">
          KodNest
        </span>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-[24px]">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className="font-sans text-sm text-muted-foreground pb-[8px] border-b-2 border-transparent transition-calm"
                activeClassName="text-foreground border-primary"
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-[8px] text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <ul className="md:hidden flex flex-col border-t border-border bg-card px-[24px] py-[16px] gap-[16px]">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className="font-sans text-sm text-muted-foreground transition-calm"
                activeClassName="text-foreground font-medium"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default AppNavbar;
