import { Job } from "@/modules/jnt/data/jobs";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { ExternalLink, MapPin } from "lucide-react";

interface JobDetailModalProps {
  job: Job | null;
  open: boolean;
  onClose: () => void;
}

const JobDetailModal = ({ job, open, onClose }: JobDetailModalProps) => {
  if (!job) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{job.title}</DialogTitle>
          <DialogDescription className="font-sans">
            {job.company} · {job.location}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-[16px] font-sans text-sm">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-[8px] text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {job.mode}
            </span>
            <span>·</span>
            <span>{job.experience}</span>
            <span>·</span>
            <span className="font-medium text-foreground">{job.salaryRange}</span>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-[8px]">
            {job.skills.map((s) => (
              <Badge key={s} variant="secondary" className="font-sans text-xs">
                {s}
              </Badge>
            ))}
          </div>

          {/* Description */}
          <p className="leading-relaxed text-foreground whitespace-pre-line">
            {job.description}
          </p>

          {/* Apply */}
          <Button className="w-full gap-1" asChild>
            <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" /> Apply on {job.source}
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailModal;
