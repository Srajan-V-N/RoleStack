import { Job } from "@/data/jobs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Bookmark, BookmarkCheck, ExternalLink, Eye } from "lucide-react";
import { scoreBadgeColor } from "@/lib/matchScore";
import { JobStatus } from "@/hooks/useJobStatus";

const statusColors: Record<JobStatus, string> = {
  "Not Applied": "bg-muted text-muted-foreground border-transparent",
  Applied: "bg-[hsl(210,80%,42%)] text-white border-transparent",
  Rejected: "bg-destructive text-destructive-foreground border-transparent",
  Selected: "bg-[hsl(152,30%,42%)] text-white border-transparent",
};

const allStatuses: JobStatus[] = ["Not Applied", "Applied", "Rejected", "Selected"];

interface JobCardProps {
  job: Job;
  isSaved: boolean;
  onToggleSave: (id: number) => void;
  onView: (job: Job) => void;
  matchScore?: number;
  jobStatus?: JobStatus;
  onStatusChange?: (id: number, status: JobStatus) => void;
}

function postedLabel(days: number) {
  if (days === 0) return "Today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

const sourceColor: Record<string, string> = {
  LinkedIn: "bg-[hsl(210,80%,42%)] text-white border-transparent",
  Naukri: "bg-[hsl(152,30%,42%)] text-white border-transparent",
  Indeed: "bg-[hsl(220,14%,40%)] text-white border-transparent",
};

const JobCard = ({ job, isSaved, onToggleSave, onView, matchScore, jobStatus = "Not Applied", onStatusChange }: JobCardProps) => {
  return (
    <Card className="transition-calm hover:border-primary/30">
      <CardContent className="p-[24px] space-y-[16px]">
        {/* Header row */}
        <div className="flex items-start justify-between gap-[16px]">
          <div className="min-w-0 flex-1">
            <h3 className="text-lg leading-tight">{job.title}</h3>
            <p className="mt-[4px] text-sm text-muted-foreground font-sans">
              {job.company}
            </p>
          </div>
          <div className="flex flex-col items-end gap-[6px] shrink-0">
            <Badge
              className={`text-[11px] font-sans ${sourceColor[job.source] ?? ""}`}
            >
              {job.source}
            </Badge>
            {matchScore !== undefined && (
              <Badge className={`text-[11px] font-sans ${scoreBadgeColor(matchScore)}`}>
                {matchScore}% match
              </Badge>
            )}
          </div>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-[16px] gap-y-[8px] text-sm text-muted-foreground font-sans">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {job.location} · {job.mode}
          </span>
          <span>{job.experience}</span>
          <span className="font-medium text-foreground">{job.salaryRange}</span>
        </div>

        {/* Posted */}
        <p className="text-xs text-muted-foreground font-sans">
          {postedLabel(job.postedDaysAgo)}
        </p>

        {/* Status */}
        {onStatusChange && (
          <div className="flex flex-wrap items-center gap-[6px]">
            {allStatuses.map((s) => (
              <button
                key={s}
                onClick={() => onStatusChange(job.id, s)}
                className={`px-2 py-0.5 rounded-full text-[11px] font-sans font-medium transition-calm ${
                  jobStatus === s
                    ? statusColors[s]
                    : "bg-transparent text-muted-foreground border border-border hover:border-foreground/30"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-[8px] pt-[8px] border-t border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(job)}
            className="gap-1"
          >
            <Eye className="h-3.5 w-3.5" /> View
          </Button>
          <Button
            variant={isSaved ? "default" : "outline"}
            size="sm"
            onClick={() => onToggleSave(job.id)}
            className="gap-1"
          >
            {isSaved ? (
              <BookmarkCheck className="h-3.5 w-3.5" />
            ) : (
              <Bookmark className="h-3.5 w-3.5" />
            )}
            {isSaved ? "Saved" : "Save"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1 ml-auto"
            asChild
          >
            <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3.5 w-3.5" /> Apply
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
