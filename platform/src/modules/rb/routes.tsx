import { Routes, Route } from "react-router";
import { ResumeProvider } from "@/modules/rb/context/ResumeContext";
import { TemplateProvider } from "@/modules/rb/context/TemplateContext";
import HomePage from "@/modules/rb/pages/HomePage";
import BuilderPage from "@/modules/rb/pages/BuilderPage";
import PreviewPage from "@/modules/rb/pages/PreviewPage";
import ProofPage from "@/modules/rb/pages/ProofPage";

function RbRoutes() {
  return (
    <ResumeProvider>
      <TemplateProvider>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="builder" element={<BuilderPage />} />
          <Route path="preview" element={<PreviewPage />} />
          <Route path="proof" element={<ProofPage />} />
        </Routes>
      </TemplateProvider>
    </ResumeProvider>
  );
}

export function Component() {
  return <RbRoutes />;
}
