import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, CheckCircle, AlertCircle, Camera } from "lucide-react";

interface SecondaryPanelProps {
  stepTitle: string;
  stepDescription: string;
  prompt?: string;
}

const SecondaryPanel = ({ stepTitle, stepDescription, prompt }: SecondaryPanelProps) => {
  const handleCopy = () => {
    if (prompt) navigator.clipboard.writeText(prompt);
  };

  return (
    <aside className="flex flex-col gap-[16px] border-l border-border p-[24px]">
      <div>
        <h4 className="text-foreground">{stepTitle}</h4>
        <p className="mt-[8px] text-sm text-muted-foreground leading-relaxed">
          {stepDescription}
        </p>
      </div>

      {prompt && (
        <div className="rounded-md border border-border bg-muted p-[16px]">
          <pre className="whitespace-pre-wrap font-sans text-xs text-foreground leading-relaxed">
            {prompt}
          </pre>
        </div>
      )}

      <div className="flex flex-col gap-[8px]">
        <Button variant="default" size="sm" onClick={handleCopy}>
          <Copy /> Copy Prompt
        </Button>
        <Button variant="outline" size="sm">
          <ExternalLink /> Build in Lovable
        </Button>
        <Button variant="success" size="sm">
          <CheckCircle /> It Worked
        </Button>
        <Button variant="destructive" size="sm">
          <AlertCircle /> Error
        </Button>
        <Button variant="ghost" size="sm">
          <Camera /> Add Screenshot
        </Button>
      </div>
    </aside>
  );
};

export default SecondaryPanel;
