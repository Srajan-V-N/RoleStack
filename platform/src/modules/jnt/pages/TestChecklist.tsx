import { useTestChecklist, TEST_ITEMS } from "@/modules/jnt/hooks/useTestChecklist";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Button } from "@/shared/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { AlertTriangle, CheckCircle2, HelpCircle, RotateCcw } from "lucide-react";

const TestChecklist = () => {
  const { checked, toggle, reset, passedCount, total, allPassed } = useTestChecklist();

  return (
    <main className="flex-1 px-[24px] py-[24px] space-y-[24px]">
      <div>
        <h2 className="text-foreground">Test Checklist</h2>
        <p className="mt-[8px] text-sm text-muted-foreground font-sans">
          Verify every feature before shipping.
        </p>
      </div>

      {/* Summary */}
      <div className="rounded-md border border-border bg-card px-[24px] py-[16px] flex items-center gap-[16px]">
        {allPassed ? (
          <CheckCircle2 className="h-5 w-5 shrink-0 text-[hsl(var(--success))]" />
        ) : (
          <AlertTriangle className="h-5 w-5 shrink-0 text-warning" />
        )}
        <div className="flex-1">
          <p className="text-sm font-sans font-medium text-foreground">
            Tests Passed: {passedCount} / {total}
          </p>
          {!allPassed && (
            <p className="text-xs text-muted-foreground font-sans mt-[4px]">
              Resolve all issues before shipping.
            </p>
          )}
        </div>
        <Button variant="outline" size="sm" className="gap-1 shrink-0" onClick={reset}>
          <RotateCcw className="h-3.5 w-3.5" /> Reset Test Status
        </Button>
      </div>

      {/* Checklist */}
      <div className="rounded-md border border-border bg-card divide-y divide-border">
        {TEST_ITEMS.map((item) => (
          <label
            key={item.id}
            className="flex items-center gap-[16px] px-[24px] py-[16px] cursor-pointer hover:bg-muted/40 transition-calm"
          >
            <Checkbox
              checked={!!checked[item.id]}
              onCheckedChange={() => toggle(item.id)}
              className="shrink-0"
            />
            <span className="text-sm font-sans text-foreground flex-1">
              {item.label}
            </span>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="shrink-0 text-muted-foreground hover:text-foreground transition-calm"
                  onClick={(e) => e.preventDefault()}
                >
                  <HelpCircle className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-[280px] text-xs font-sans">
                {item.howToTest}
              </TooltipContent>
            </Tooltip>
          </label>
        ))}
      </div>
    </main>
  );
};

export default TestChecklist;
