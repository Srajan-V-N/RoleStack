import { Routes, Route, Outlet } from "react-router";
import ModuleNav from "@/shared/components/layout/ModuleNav";
import Index from "@/modules/jnt/pages/Index";
import Dashboard from "@/modules/jnt/pages/Dashboard";
import Saved from "@/modules/jnt/pages/Saved";
import Digest from "@/modules/jnt/pages/Digest";
import Settings from "@/modules/jnt/pages/Settings";
import Proof from "@/modules/jnt/pages/Proof";
import TestChecklist from "@/modules/jnt/pages/TestChecklist";

const jntNav = [
  { to: "/jnt", label: "Home", end: true },
  { to: "/jnt/dashboard", label: "Dashboard" },
  { to: "/jnt/saved", label: "Saved" },
  { to: "/jnt/digest", label: "Digest" },
  { to: "/jnt/settings", label: "Settings" },
  { to: "/jnt/proof", label: "Proof" },
  { to: "/jnt/test", label: "Test" },
];

function JntLayout() {
  return (
    <>
      <ModuleNav items={jntNav} />
      <Outlet />
    </>
  );
}

function JntRoutes() {
  return (
    <Routes>
      <Route element={<JntLayout />}>
        <Route index element={<Index />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="saved" element={<Saved />} />
        <Route path="digest" element={<Digest />} />
        <Route path="settings" element={<Settings />} />
        <Route path="proof" element={<Proof />} />
        <Route path="test" element={<TestChecklist />} />
      </Route>
    </Routes>
  );
}

export function Component() {
  return <JntRoutes />;
}
