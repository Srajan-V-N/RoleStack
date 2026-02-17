import { cn } from "@/shared/lib/utils";

interface TopBarProps {
  projectName: string;
  currentStep: number;
  totalSteps: number;
  status: "Not Started" | "In Progress" | "Shipped";
}

const statusStyles: Record<TopBarProps["status"], string> = {
  "Not Started": "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]",
  "In Progress": "bg-[hsl(var(--warning))]/15 text-[hsl(var(--warning-foreground))]",
  "Shipped": "bg-[hsl(var(--success))]/15 text-[hsl(var(--success))]",
};

const TopBar = ({ projectName, currentStep, totalSteps, status }: TopBarProps) => {
  return (
    <header className="flex items-center justify-between border-b border-[hsl(var(--border))] px-[24px] py-[8px]">
      <span className="font-sans text-sm font-semibold tracking-wide text-[hsl(var(--foreground))]">
        {projectName}
      </span>
      <span className="font-sans text-sm text-[hsl(var(--muted-foreground))]">
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
