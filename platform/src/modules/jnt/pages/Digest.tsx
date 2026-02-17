import { format } from "date-fns";
import { usePreferences } from "@/modules/jnt/hooks/usePreferences";
import { useDigest, digestToPlainText } from "@/modules/jnt/hooks/useDigest";
import { useJobStatus } from "@/modules/jnt/hooks/useJobStatus";
import { jobs as allJobs } from "@/modules/jnt/data/jobs";
import { scoreBadgeColor } from "@/modules/jnt/lib/matchScore";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import { toast } from "sonner";
import {
  Mail,
  Copy,
  ExternalLink,
  Settings,
  Sparkles,
  SearchX,
  ClipboardList,
} from "lucide-react";
import { Link } from "react-router";

const statusBadgeColor: Record<string, string> = {
  Applied: "bg-[hsl(210,80%,42%)] text-white border-transparent",
  Rejected: "bg-destructive text-destructive-foreground border-transparent",
  Selected: "bg-[hsl(152,30%,42%)] text-white border-transparent",
};

const Digest = () => {
  const { preferences, hasPreferences } = usePreferences();
  const { digest, generate } = useDigest(preferences);
  const { history } = useJobStatus();

  // State 1: No preferences
  if (!hasPreferences) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center px-[24px] py-[64px] text-center">
        <Settings className="h-10 w-10 text-muted-foreground/50" />
        <h2 className="mt-[24px] text-foreground">
          Set preferences to generate a personalized digest.
        </h2>
        <p className="mt-[8px] prose-width text-muted-foreground font-sans">
          Configure your role keywords, locations, and skills so we can match
          the best jobs for you.
        </p>
        <Button asChild className="mt-[24px]">
          <Link to="/jnt/settings">Go to Settings</Link>
        </Button>
      </main>
    );
  }

  // State 2: Preferences set, no digest yet
  if (!digest) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center px-[24px] py-[64px] text-center">
        <Sparkles className="h-10 w-10 text-muted-foreground/50" />
        <h2 className="mt-[24px] text-foreground">Your digest is ready to generate.</h2>
        <p className="mt-[8px] prose-width text-muted-foreground font-sans">
          We'll pick the top 10 jobs that match your preferences.
        </p>
        <Button onClick={generate} className="mt-[24px] gap-2">
          <Mail className="h-4 w-4" />
          Generate Today's 9AM Digest (Simulated)
        </Button>
      </main>
    );
  }

  // State 3a: Digest generated but empty
  if (digest.entries.length === 0) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center px-[24px] py-[64px] text-center">
        <SearchX className="h-10 w-10 text-muted-foreground/50" />
        <h2 className="mt-[24px] text-foreground">
          No matching roles today.
        </h2>
        <p className="mt-[8px] prose-width text-muted-foreground font-sans">
          Check again tomorrow or adjust your preferences for broader results.
        </p>
        <Button asChild variant="outline" className="mt-[24px]">
          <Link to="/jnt/settings">Adjust Preferences</Link>
        </Button>
      </main>
    );
  }

  // Helpers
  const dateStr = format(new Date(digest.generatedAt), "EEEE, d MMMM yyyy");

  const handleCopy = async () => {
    const text = digestToPlainText(digest);
    await navigator.clipboard.writeText(text);
    toast("Copied to clipboard");
  };

  const handleEmail = () => {
    const text = digestToPlainText(digest);
    const subject = encodeURIComponent("My 9AM Job Digest");
    const body = encodeURIComponent(text);
    window.open(`mailto:?subject=${subject}&body=${body}`, "_self");
  };

  // State 3b: Full digest
  return (
    <main className="flex flex-1 flex-col items-center px-[24px] py-[40px]">
      {/* Email card */}
      <Card className="w-full max-w-[640px] bg-card shadow-sm">
        {/* Header */}
        <div className="px-[24px] pt-[40px] pb-[24px] text-center">
          <h2 className="text-foreground">
            Top {digest.entries.length} Jobs For You — 9AM Digest
          </h2>
          <p className="mt-[8px] text-sm text-muted-foreground font-sans">
            {dateStr}
          </p>
        </div>

        <Separator />

        {/* Job list */}
        <div className="divide-y divide-border">
          {digest.entries.map(({ job, matchScore }, idx) => (
            <div
              key={job.id}
              className="px-[24px] py-[16px] flex items-start justify-between gap-[16px]"
            >
              <div className="min-w-0 flex-1 space-y-[4px]">
                <p className="text-sm font-sans font-medium text-foreground">
                  <span className="text-muted-foreground mr-[8px]">
                    {idx + 1}.
                  </span>
                  {job.title}
                </p>
                <p className="text-xs text-muted-foreground font-sans">
                  {job.company} · {job.location} · {job.mode}
                </p>
                <p className="text-xs text-muted-foreground font-sans">
                  {job.experience}
                </p>
              </div>
              <div className="flex items-center gap-[8px] shrink-0 pt-[2px]">
                <Badge
                  className={`text-[11px] font-sans ${scoreBadgeColor(matchScore)}`}
                >
                  {matchScore}%
                </Badge>
                <Button variant="outline" size="sm" className="gap-1 h-8" asChild>
                  <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-3 w-3" /> Apply
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Footer */}
        <div className="px-[24px] py-[24px] text-center space-y-[8px]">
          <p className="text-xs text-muted-foreground font-sans">
            This digest was generated based on your preferences.
          </p>
          <p className="text-[11px] text-muted-foreground/60 font-sans">
            Demo Mode: Daily 9AM trigger simulated manually.
          </p>
        </div>
      </Card>

      {/* Action buttons */}
      <div className="flex items-center gap-[16px] mt-[24px]">
        <Button variant="outline" onClick={handleCopy} className="gap-2">
          <Copy className="h-4 w-4" /> Copy Digest to Clipboard
        </Button>
        <Button variant="outline" onClick={handleEmail} className="gap-2">
          <Mail className="h-4 w-4" /> Create Email Draft
        </Button>
      </div>

      {/* Recent Status Updates */}
      {history.length > 0 && (
        <Card className="w-full max-w-[640px] mt-[32px] bg-card shadow-sm">
          <div className="px-[24px] pt-[24px] pb-[16px] flex items-center gap-[8px]">
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-lg text-foreground">Recent Status Updates</h3>
          </div>
          <Separator />
          <div className="divide-y divide-border">
            {history.slice(0, 10).map((entry, idx) => {
              const job = allJobs.find((j) => j.id === entry.jobId);
              if (!job) return null;
              return (
                <div
                  key={`${entry.jobId}-${idx}`}
                  className="px-[24px] py-[12px] flex items-center justify-between gap-[16px]"
                >
                  <div className="min-w-0 flex-1 space-y-[2px]">
                    <p className="text-sm font-sans font-medium text-foreground truncate">
                      {job.title}
                    </p>
                    <p className="text-xs text-muted-foreground font-sans">
                      {job.company} · {format(new Date(entry.changedAt), "d MMM yyyy, h:mm a")}
                    </p>
                  </div>
                  <Badge
                    className={`text-[11px] font-sans shrink-0 ${statusBadgeColor[entry.status] ?? "bg-muted text-muted-foreground border-transparent"}`}
                  >
                    {entry.status}
                  </Badge>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </main>
  );
};

export default Digest;
