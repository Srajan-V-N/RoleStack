import { Routes, Route, Outlet } from "react-router";
import ModuleNav from "@/shared/components/layout/ModuleNav";
import { Landing } from "@/modules/prp/pages/Landing";
import { Dashboard } from "@/modules/prp/pages/Dashboard";
import { Practice } from "@/modules/prp/pages/Practice";
import { Assessments } from "@/modules/prp/pages/Assessments";
import { Resources } from "@/modules/prp/pages/Resources";
import { Profile } from "@/modules/prp/pages/Profile";
import { TestChecklist } from "@/modules/prp/pages/TestChecklist";
import { Ship } from "@/modules/prp/pages/Ship";
import { Proof } from "@/modules/prp/pages/Proof";

const dashboardNav = [
  { to: "/prp/dashboard", label: "Overview", end: true },
  { to: "/prp/dashboard/practice", label: "Practice" },
  { to: "/prp/dashboard/assessments", label: "Assessments" },
  { to: "/prp/dashboard/resources", label: "Resources" },
  { to: "/prp/dashboard/profile", label: "Profile" },
  { to: "/prp/test", label: "Test Checklist" },
  { to: "/prp/ship", label: "Ship" },
  { to: "/prp/proof", label: "Proof" },
];

function DashboardLayout() {
  return (
    <>
      <ModuleNav items={dashboardNav} />
      <main className="flex-1 overflow-y-auto bg-surface p-6">
        <Outlet />
      </main>
    </>
  );
}

function PrpRoutes() {
  return (
    <Routes>
      <Route index element={<Landing />} />
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="practice" element={<Practice />} />
        <Route path="assessments" element={<Assessments />} />
        <Route path="resources" element={<Resources />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="test" element={<TestChecklist />} />
      <Route path="ship" element={<Ship />} />
      <Route path="proof" element={<Proof />} />
    </Routes>
  );
}

export function Component() {
  return <PrpRoutes />;
}
