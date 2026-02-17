import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { jobs, Job } from "@/data/jobs";
import { useSavedJobs } from "@/hooks/useSavedJobs";
import { usePreferences } from "@/hooks/usePreferences";
import { useJobStatus } from "@/hooks/useJobStatus";
import { computeMatchScore } from "@/lib/matchScore";
import FilterBar, { Filters } from "@/components/jobs/FilterBar";
import JobCard from "@/components/jobs/JobCard";
import JobDetailModal from "@/components/jobs/JobDetailModal";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Settings } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const defaultFilters: Filters = {
  keyword: "",
  location: "All",
  mode: "All",
  experience: "All",
  source: "All",
  status: "All",
  sort: "Latest",
};

function extractSalaryNum(s: string): number {
  const match = s.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

const Dashboard = () => {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [viewJob, setViewJob] = useState<Job | null>(null);
  const [matchOnly, setMatchOnly] = useState(false);
  const { isSaved, toggleSave } = useSavedJobs();
  const { preferences, hasPreferences } = usePreferences();
  const { getStatus, setStatus: setJobStatus } = useJobStatus();
  const navigate = useNavigate();

  const handleStatusChange = (id: number, status: import("@/hooks/useJobStatus").JobStatus) => {
    setJobStatus(id, status);
    if (status !== "Not Applied") {
      toast({ title: `Status updated: ${status}` });
    }
  };

  const scored = useMemo(() => {
    return jobs.map((job) => ({
      job,
      matchScore: hasPreferences ? computeMatchScore(job, preferences) : 0,
    }));
  }, [preferences, hasPreferences]);

  const filtered = useMemo(() => {
    let list = [...scored];

    // Match threshold filter
    if (matchOnly && hasPreferences) {
      list = list.filter((item) => item.matchScore >= preferences.minMatchScore);
    }

    // Keyword
    if (filters.keyword) {
      const kw = filters.keyword.toLowerCase();
      list = list.filter(
        (item) =>
          item.job.title.toLowerCase().includes(kw) ||
          item.job.company.toLowerCase().includes(kw),
      );
    }
    if (filters.location !== "All")
      list = list.filter((item) => item.job.location === filters.location);
    if (filters.mode !== "All")
      list = list.filter((item) => item.job.mode === filters.mode);
    if (filters.experience !== "All")
      list = list.filter((item) => item.job.experience === filters.experience);
    if (filters.source !== "All")
      list = list.filter((item) => item.job.source === filters.source);
    if (filters.status !== "All")
      list = list.filter((item) => getStatus(item.job.id) === filters.status);

    // Sorting
    if (filters.sort === "Latest") {
      list.sort((a, b) => a.job.postedDaysAgo - b.job.postedDaysAgo);
    } else if (filters.sort === "Oldest") {
      list.sort((a, b) => b.job.postedDaysAgo - a.job.postedDaysAgo);
    } else if (filters.sort === "Match Score") {
      list.sort((a, b) => b.matchScore - a.matchScore);
    } else if (filters.sort === "Salary") {
      list.sort(
        (a, b) => extractSalaryNum(b.job.salaryRange) - extractSalaryNum(a.job.salaryRange),
      );
    }

    return list;
  }, [scored, filters, matchOnly, hasPreferences, preferences.minMatchScore, getStatus]);

  return (
    <main className="flex-1 px-[24px] py-[24px] space-y-[24px]">
      <div>
        <h2 className="text-foreground">Job Board</h2>
        <p className="mt-[8px] text-sm text-muted-foreground font-sans">
          {filtered.length} positions from {jobs.length} listings
        </p>
      </div>

      {/* Preferences banner */}
      {!hasPreferences && (
        <div className="flex items-center gap-[12px] rounded-md border border-border bg-card px-[16px] py-[12px]">
          <AlertTriangle className="h-4 w-4 shrink-0 text-warning" />
          <p className="text-sm text-muted-foreground font-sans flex-1">
            Set your preferences to activate intelligent matching.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="gap-1 shrink-0"
            onClick={() => navigate("/settings")}
          >
            <Settings className="h-3.5 w-3.5" /> Preferences
          </Button>
        </div>
      )}

      <FilterBar filters={filters} onChange={setFilters} />

      {/* Match toggle */}
      {hasPreferences && (
        <div className="flex items-center gap-[8px]">
          <Switch
            id="match-toggle"
            checked={matchOnly}
            onCheckedChange={setMatchOnly}
          />
          <Label htmlFor="match-toggle" className="text-sm font-sans cursor-pointer">
            Show only jobs above my threshold ({preferences.minMatchScore}%)
          </Label>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-[64px] text-center">
          <h3 className="text-foreground">No roles match your criteria.</h3>
          <p className="mt-[8px] text-sm text-muted-foreground font-sans prose-width">
            Adjust filters or lower your match threshold in preferences.
          </p>
        </div>
      ) : (
        <div className="grid gap-[16px] sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(({ job, matchScore }) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={isSaved(job.id)}
              onToggleSave={toggleSave}
              onView={setViewJob}
              matchScore={hasPreferences ? matchScore : undefined}
              jobStatus={getStatus(job.id)}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}

      <JobDetailModal
        job={viewJob}
        open={!!viewJob}
        onClose={() => setViewJob(null)}
      />
    </main>
  );
};

export default Dashboard;
