import { cn } from "@/lib/utils";

interface TopBarProps {
  projectName: string;
  currentStep: number;
  totalSteps: number;
  status: "Not Started" | "In Progress" | "Shipped";
}

const statusStyles: Record<TopBarProps["status"], string> = {
  "Not Started": "bg-muted text-muted-foreground",
  "In Progress": "bg-warning/15 text-warning-foreground",
  "Shipped": "bg-success/15 text-success",
};

const TopBar = ({ projectName, currentStep, totalSteps, status }: TopBarProps) => {
  return (
    <header className="flex items-center justify-between border-b border-border px-[24px] py-[8px]">
      <span className="font-sans text-sm font-semibold tracking-wide text-foreground">
        {projectName}
      </span>
      <span className="font-sans text-sm text-muted-foreground">
        Step {currentStep} / {totalSteps}
      </span>
      <span
        className={cn(
          "rounded-md px-[16px] py-[4px] text-xs font-medium",
          statusStyles[status]
        )}
      >
        {status}
      </span>
    </header>
  );
};

export default TopBar;
