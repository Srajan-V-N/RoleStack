import { useMemo } from "react";
import { Link } from "react-router";
import { FileText, Target, Briefcase, ArrowRight } from "lucide-react";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  status: string;
  details: string[];
  to: string;
}

function ModuleCard({ title, description, icon: Icon, status, details, to }: ModuleCardProps) {
  return (
    <div className="rounded-lg border border-[hsl(var(--border))] bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-light">
            <Icon className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h3 className="font-sans text-lg font-semibold text-text-primary">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
        <span className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-gray-600">
          {status}
        </span>
      </div>

      <ul className="mt-4 space-y-1.5">
        {details.map((detail, i) => (
          <li key={i} className="text-sm text-gray-600">
            {detail}
          </li>
        ))}
      </ul>

      <Link
        to={to}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-calm hover:text-accent-hover"
      >
        Continue <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function readResumeStatus() {
  try {
    const raw = localStorage.getItem("resumeBuilderData");
    if (!raw) return { filled: 0, total: 7, checklist: 0 };
    const data = JSON.parse(raw);
    let filled = 0;
    if (data.personalInfo?.name) filled++;
    if (data.summary) filled++;
    if (data.education?.length > 0) filled++;
    if (data.experience?.length > 0) filled++;
    if (data.projects?.length > 0) filled++;
    if (data.skills?.technical?.length > 0) filled++;
    if (data.links?.linkedin || data.links?.github) filled++;

    let checklist = 0;
    try {
      const cl = localStorage.getItem("rb_checklist");
      if (cl) {
        const items = JSON.parse(cl);
        checklist = Object.values(items).filter(Boolean).length;
      }
    } catch {}

    return { filled, total: 7, checklist };
  } catch {
    return { filled: 0, total: 7, checklist: 0 };
  }
}

function readPrpStatus() {
  try {
    const raw = localStorage.getItem("prp-history");
    const analyses = raw ? JSON.parse(raw).length : 0;

    let checklist = 0;
    try {
      const cl = localStorage.getItem("prp-test-checklist");
      if (cl) {
        const items = JSON.parse(cl);
        checklist = Object.values(items).filter(Boolean).length;
      }
    } catch {}

    return { analyses, checklist };
  } catch {
    return { analyses: 0, checklist: 0 };
  }
}

function readJntStatus() {
  try {
    const savedRaw = localStorage.getItem("savedJobIds");
    const saved = savedRaw ? JSON.parse(savedRaw).length : 0;

    const statusesRaw = localStorage.getItem("jobTrackerStatuses");
    let applied = 0;
    if (statusesRaw) {
      const statuses = JSON.parse(statusesRaw);
      applied = Object.values(statuses).filter((s) => s === "Applied" || s === "Selected").length;
    }

    return { saved, applied };
  } catch {
    return { saved: 0, applied: 0 };
  }
}

export function Component() {
  const rb = useMemo(readResumeStatus, []);
  const prp = useMemo(readPrpStatus, []);
  const jnt = useMemo(readJntStatus, []);

  return (
    <div className="px-6 py-10">
      <section className="mb-10">
        <h1 className="text-text-primary">KodNest Premium Build System</h1>
        <p className="mt-2 prose-width text-gray-500">
          Your unified workspace for building career-ready deliverables.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ModuleCard
          title="Job Notification Tracker"
          description="Track and match job opportunities"
          icon={Briefcase}
          status={jnt.saved === 0 && jnt.applied === 0 ? "Not Started" : "Active"}
          details={[
            `${jnt.saved} jobs saved`,
            `${jnt.applied} applications tracked`,
          ]}
          to="/jnt"
        />
        <ModuleCard
          title="Placement Readiness"
          description="Analyze and prepare for placements"
          icon={Target}
          status={prp.analyses === 0 ? "Not Started" : "In Progress"}
          details={[
            `${prp.analyses} analysis entries`,
            `${prp.checklist} test items checked`,
          ]}
          to="/prp"
        />
        <ModuleCard
          title="Resume Builder"
          description="Craft an ATS-optimized resume"
          icon={FileText}
          status={rb.filled === 0 ? "Not Started" : rb.filled === rb.total ? "Complete" : "In Progress"}
          details={[
            `${rb.filled}/${rb.total} sections filled`,
            `${rb.checklist} proof items checked`,
          ]}
          to="/rb"
        />
      </div>
    </div>
  );
}
