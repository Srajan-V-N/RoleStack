import { useState } from "react";
import { useProofSubmission, isValidUrl } from "@/hooks/useProofSubmission";
import { useTestChecklist, TEST_ITEMS } from "@/hooks/useTestChecklist";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Circle,
  Copy,
  ExternalLink,
  Link as LinkIcon,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const STEPS = [
  "Environment & Setup",
  "Data Layer",
  "Dashboard UI",
  "Match Scoring",
  "Save & Status",
  "Daily Digest",
  "Settings & Preferences",
  "Test Checklist",
];

const Proof = () => {
  const { links, updateLink, allLinksValid } = useProofSubmission();
  const { checked, passedCount, total, allPassed } = useTestChecklist();
  const [copied, setCopied] = useState(false);

  const canShip = allLinksValid && allPassed;

  const status: "Not Started" | "In Progress" | "Shipped" = !allLinksValid && passedCount === 0
    ? "Not Started"
    : canShip
      ? "Shipped"
      : "In Progress";

  const statusStyles = {
    "Not Started": "bg-muted text-muted-foreground",
    "In Progress": "bg-warning/15 text-warning-foreground",
    Shipped: "bg-success/15 text-[hsl(var(--success))]",
  };

  const handleCopy = () => {
    const text = `Job Notification Tracker — Final Submission

Lovable Project:
${links.lovableLink}

GitHub Repository:
${links.githubLink}

Live Deployment:
${links.deployedLink}

Core Features:
- Intelligent match scoring
- Daily digest simulation
- Status tracking
- Test checklist enforced`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast.success("Submission copied to clipboard.");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const linkFields: { key: "lovableLink" | "githubLink" | "deployedLink"; label: string; placeholder: string }[] = [
    { key: "lovableLink", label: "Lovable Project Link", placeholder: "https://lovable.dev/projects/..." },
    { key: "githubLink", label: "GitHub Repository Link", placeholder: "https://github.com/..." },
    { key: "deployedLink", label: "Deployed URL", placeholder: "https://your-app.vercel.app" },
  ];

  return (
    <main className="flex flex-1 flex-col px-[24px] py-[40px]">
      <div className="flex items-start justify-between gap-[16px]">
        <div>
          <h1 className="text-foreground">Proof of Work</h1>
          <p className="mt-[8px] prose-width text-muted-foreground">
            Project 1 — Job Notification Tracker
          </p>
        </div>
        <span
          className={cn(
            "mt-[4px] shrink-0 rounded-md px-[16px] py-[4px] text-xs font-medium font-sans",
            statusStyles[status]
          )}
        >
          {status}
        </span>
      </div>

      <div className="mt-[40px] grid gap-[24px] max-w-[720px]">
        {/* Step Completion Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Step Completion</CardTitle>
            <CardDescription>Overview of project build steps.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-[8px]">
              {STEPS.map((step, i) => {
                // Steps 1-7 considered complete, step 8 (test) depends on allPassed
                const completed = i < 7 || (i === 7 && allPassed);
                return (
                  <div key={step} className="flex items-center gap-[12px] font-sans text-sm">
                    {completed ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[hsl(var(--success))]" />
                    ) : (
                      <Circle className="h-4 w-4 shrink-0 text-muted-foreground/40" />
                    )}
                    <span className={cn("text-foreground", !completed && "text-muted-foreground")}>
                      Step {i + 1}: {step}
                    </span>
                    <Badge
                      variant={completed ? "default" : "secondary"}
                      className={cn(
                        "ml-auto text-[10px]",
                        completed
                          ? "bg-success/15 text-[hsl(var(--success))] border-transparent hover:bg-success/20"
                          : ""
                      )}
                    >
                      {completed ? "Completed" : "Pending"}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Artifact Collection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Artifact Links</CardTitle>
            <CardDescription>Provide all required project links for submission.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-[16px]">
            {linkFields.map(({ key, label, placeholder }) => {
              const value = links[key];
              const valid = value.trim() === "" || isValidUrl(value);
              return (
                <div key={key} className="space-y-[6px]">
                  <Label className="flex items-center gap-[8px]">
                    <LinkIcon className="h-3.5 w-3.5 text-muted-foreground" />
                    {label}
                  </Label>
                  <Input
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => updateLink(key, e.target.value)}
                    className={cn(!valid && "border-destructive focus-visible:ring-destructive")}
                  />
                  {!valid && (
                    <p className="text-xs text-destructive font-sans">
                      Please enter a valid URL starting with http:// or https://
                    </p>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Validation Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ship Readiness</CardTitle>
            <CardDescription>Both conditions must be met to mark as Shipped.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-[12px]">
            <div className="flex items-center gap-[12px] font-sans text-sm">
              {allLinksValid ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[hsl(var(--success))]" />
              ) : (
                <AlertTriangle className="h-4 w-4 shrink-0 text-warning" />
              )}
              <span className="text-foreground">
                All 3 artifact links provided
              </span>
            </div>
            <div className="flex items-center gap-[12px] font-sans text-sm">
              {allPassed ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[hsl(var(--success))]" />
              ) : (
                <AlertTriangle className="h-4 w-4 shrink-0 text-warning" />
              )}
              <span className="text-foreground">
                Test checklist: {passedCount} / {total} passed
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Copy Submission */}
        <Button
          onClick={handleCopy}
          disabled={!canShip}
          className="w-fit gap-[8px]"
        >
          {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied!" : "Copy Final Submission"}
        </Button>

        {!canShip && (
          <p className="text-xs text-muted-foreground font-sans -mt-[12px]">
            Resolve all checklist items and provide all links to enable submission.
          </p>
        )}

        {/* Shipped confirmation */}
        {canShip && (
          <div className="flex items-center gap-[12px] rounded-md border border-[hsl(var(--success)/.2)] bg-success/5 px-[24px] py-[16px]">
            <Sparkles className="h-5 w-5 shrink-0 text-[hsl(var(--success))]" />
            <p className="font-sans text-sm text-foreground">
              Project 1 Shipped Successfully.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Proof;
