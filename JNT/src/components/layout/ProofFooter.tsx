import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckItem {
  label: string;
  key: string;
}

const items: CheckItem[] = [
  { label: "UI Built", key: "ui" },
  { label: "Logic Working", key: "logic" },
  { label: "Test Passed", key: "test" },
  { label: "Deployed", key: "deployed" },
];

const ProofFooter = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <footer className="border-t border-border px-[24px] py-[16px]">
      <div className="flex items-center gap-[24px]">
        {items.map((item) => (
          <button
            key={item.key}
            onClick={() => toggle(item.key)}
            className="flex items-center gap-[8px] font-sans text-sm text-muted-foreground transition-calm hover:text-foreground"
          >
            <span
              className={cn(
                "flex h-[18px] w-[18px] items-center justify-center rounded-sm border border-border transition-calm",
                checked[item.key] && "border-primary bg-primary"
              )}
            >
              {checked[item.key] && (
                <Check className="h-3 w-3 text-primary-foreground" />
              )}
            </span>
            {item.label}
          </button>
        ))}
      </div>
    </footer>
  );
};

export default ProofFooter;
