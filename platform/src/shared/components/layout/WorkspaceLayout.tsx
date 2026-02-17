import type { ReactNode } from "react";
import TopBar from "./TopBar";
import ContextHeader from "./ContextHeader";
import ProofFooter from "./ProofFooter";
import SecondaryPanel from "./SecondaryPanel";

interface WorkspaceLayoutProps {
  projectName: string;
  currentStep: number;
  totalSteps: number;
  status: "Not Started" | "In Progress" | "Shipped";
  headline: string;
  subtext: string;
  stepTitle: string;
  stepDescription: string;
  prompt?: string;
  hideSecondaryPanel?: boolean;
  children: ReactNode;
}

const WorkspaceLayout = ({
  projectName,
  currentStep,
  totalSteps,
  status,
  headline,
  subtext,
  stepTitle,
  stepDescription,
  prompt,
  hideSecondaryPanel = false,
  children,
}: WorkspaceLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-[hsl(var(--background))]">
      <TopBar
        projectName={projectName}
        currentStep={currentStep}
        totalSteps={totalSteps}
        status={status}
      />

      <ContextHeader headline={headline} subtext={subtext} />

      <div className="flex flex-1 border-t border-[hsl(var(--border))]">
        {/* Primary Workspace — 70% */}
        <main className={hideSecondaryPanel ? "flex-1 p-[24px]" : "flex-[7] p-[24px]"}>
          {children}
        </main>

        {/* Secondary Panel — 30% */}
        {!hideSecondaryPanel && (
          <div className="flex-[3]">
            <SecondaryPanel
              stepTitle={stepTitle}
              stepDescription={stepDescription}
              prompt={prompt}
            />
          </div>
        )}
      </div>

      <ProofFooter />
    </div>
  );
};

export default WorkspaceLayout;
