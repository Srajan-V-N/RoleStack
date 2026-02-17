import { useState } from "react";
import { jobs, Job } from "@/modules/jnt/data/jobs";
import { useSavedJobs } from "@/modules/jnt/hooks/useSavedJobs";
import { useJobStatus } from "@/modules/jnt/hooks/useJobStatus";
import JobCard from "@/modules/jnt/components/jobs/JobCard";
import JobDetailModal from "@/modules/jnt/components/jobs/JobDetailModal";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";

const Saved = () => {
  const { savedIds, isSaved, toggleSave } = useSavedJobs();
  const { getStatus, setStatus: setJobStatus } = useJobStatus();
  const [viewJob, setViewJob] = useState<Job | null>(null);

  const handleStatusChange = (id: number, status: import("@/modules/jnt/hooks/useJobStatus").JobStatus) => {
    setJobStatus(id, status);
    if (status !== "Not Applied") {
      toast(`Status updated: ${status}`);
    }
  };

  const savedJobs = jobs.filter((j) => savedIds.includes(j.id));

  if (savedJobs.length === 0) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center px-[24px] py-[64px] text-center">
        <Bookmark className="h-10 w-10 text-muted-foreground/50" />
        <h2 className="mt-[24px] text-foreground">No saved jobs.</h2>
        <p className="mt-[8px] prose-width text-muted-foreground font-sans">
          Jobs you bookmark will appear here for quick access.
        </p>
      </main>
    );
  }

  return (
    <main className="flex-1 px-[24px] py-[24px] space-y-[24px]">
      <div>
        <h2 className="text-foreground">Saved Jobs</h2>
        <p className="mt-[8px] text-sm text-muted-foreground font-sans">
          {savedJobs.length} saved position{savedJobs.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid gap-[16px] sm:grid-cols-2 lg:grid-cols-3">
        {savedJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isSaved={isSaved(job.id)}
            onToggleSave={toggleSave}
            onView={setViewJob}
            jobStatus={getStatus(job.id)}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>

      <JobDetailModal
        job={viewJob}
        open={!!viewJob}
        onClose={() => setViewJob(null)}
      />
    </main>
  );
};

export default Saved;
