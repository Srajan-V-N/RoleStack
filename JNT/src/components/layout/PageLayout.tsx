import { ReactNode } from "react";
import TopBar from "./TopBar";
import ContextHeader from "./ContextHeader";
import ProofFooter from "./ProofFooter";
import SecondaryPanel from "./SecondaryPanel";

interface PageLayoutProps {
  projectName: string;
  currentStep: number;
  totalSteps: number;
  status: "Not Started" | "In Progress" | "Shipped";
  headline: string;
  subtext: string;
  stepTitle: string;
  stepDescription: string;
  prompt?: string;
  children: ReactNode;
}

const PageLayout = ({
  projectName,
  currentStep,
  totalSteps,
  status,
  headline,
  subtext,
  stepTitle,
  stepDescription,
  prompt,
  children,
}: PageLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar
        projectName={projectName}
        currentStep={currentStep}
        totalSteps={totalSteps}
        status={status}
      />

      <ContextHeader headline={headline} subtext={subtext} />

      <div className="flex flex-1 border-t border-border">
        {/* Primary Workspace — 70% */}
        <main className="flex-[7] p-[24px]">
          {children}
        </main>

        {/* Secondary Panel — 30% */}
        <div className="flex-[3]">
          <SecondaryPanel
            stepTitle={stepTitle}
            stepDescription={stepDescription}
            prompt={prompt}
          />
        </div>
      </div>

      <ProofFooter />
    </div>
  );
};

export default PageLayout;
