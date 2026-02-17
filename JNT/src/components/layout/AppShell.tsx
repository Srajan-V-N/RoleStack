import { Outlet } from "react-router-dom";
import AppNavbar from "./AppNavbar";

const AppShell = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppNavbar />
      <Outlet />
    </div>
  );
};

export default AppShell;
