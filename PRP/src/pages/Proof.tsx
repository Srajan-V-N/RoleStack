import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const CHECKLIST_KEY = 'prp-test-checklist';
const SUBMISSION_KEY = 'prp_final_submission';
const CHECKLIST_TOTAL = 10;

interface ProofLinks {
  lovable: string;
  github: string;
  deployed: string;
}

function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function loadProofLinks(): ProofLinks {
  try {
    const raw = localStorage.getItem(SUBMISSION_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        lovable: parsed.lovable || '',
        github: parsed.github || '',
        deployed: parsed.deployed || '',
      };
    }
  } catch {
    // ignore
  }
  return { lovable: '', github: '', deployed: '' };
}

function saveProofLinks(links: ProofLinks) {
  localStorage.setItem(SUBMISSION_KEY, JSON.stringify(links));
}

function allChecklistPassed(): boolean {
  try {
    const raw = localStorage.getItem(CHECKLIST_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return (
        Array.isArray(parsed) &&
        parsed.length === CHECKLIST_TOTAL &&
        parsed.every(Boolean)
      );
    }
  } catch {
    // ignore
  }
  return false;
}

const STEPS = [
  { label: 'Idea', alwaysDone: true },
  { label: 'Plan', alwaysDone: true },
  { label: 'Design', alwaysDone: true },
  { label: 'Build Core', alwaysDone: true },
  { label: 'Integrate', alwaysDone: true },
  { label: 'Polish', alwaysDone: true },
  { label: 'Test', alwaysDone: false },
  { label: 'Ship', alwaysDone: false },
];

export function Proof() {
  const [links, setLinks] = useState<ProofLinks>(loadProofLinks);
  const [touched, setTouched] = useState({ lovable: false, github: false, deployed: false });
  const [copied, setCopied] = useState(false);

  const checklistPassed = allChecklistPassed();
  const allLinksValid =
    isValidUrl(links.lovable) &&
    isValidUrl(links.github) &&
    isValidUrl(links.deployed);
  const isShipped = checklistPassed && allLinksValid;

  function stepCompleted(index: number): boolean {
    const step = STEPS[index];
    if (step.alwaysDone) return true;
    if (index === 6) return checklistPassed;
    if (index === 7) return isShipped;
    return false;
  }

  useEffect(() => {
    const allValid =
      (!links.lovable || isValidUrl(links.lovable)) &&
      (!links.github || isValidUrl(links.github)) &&
      (!links.deployed || isValidUrl(links.deployed));
    if (allValid) {
      saveProofLinks(links);
    }
  }, [links]);

  function updateLink(field: keyof ProofLinks, value: string) {
    setLinks((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) setTouched((prev) => ({ ...prev, [field]: false }));
  }

  function handleBlur(field: keyof ProofLinks) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function showError(field: keyof ProofLinks): boolean {
    return touched[field] && links[field].length > 0 && !isValidUrl(links[field]);
  }

  async function copySubmission() {
    const text = `------------------------------------------
Placement Readiness Platform — Final Submission

Lovable Project: ${links.lovable}
GitHub Repository: ${links.github}
Live Deployment: ${links.deployed}

Core Capabilities:
- JD skill extraction (deterministic)
- Round mapping engine
- 7-day prep plan
- Interactive readiness scoring
- History persistence
------------------------------------------`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-4 text-2xl font-bold">Proof</h1>

      {/* Section C — Status Badge */}
      <div className="mb-8">
        {isShipped ? (
          <span className="inline-block rounded-full bg-green-100 px-4 py-1.5 text-sm font-semibold text-green-700">
            Shipped
          </span>
        ) : (
          <span className="inline-block rounded-full bg-amber-100 px-4 py-1.5 text-sm font-semibold text-amber-700">
            In Progress
          </span>
        )}
      </div>

      {/* Section D — Completion Message */}
      {isShipped && (
        <Card className="mb-8 border-2 border-green-400 bg-green-50">
          <p className="font-semibold text-green-800">You built a real product.</p>
          <p className="text-green-700">Not a tutorial. Not a clone.</p>
          <p className="text-green-700">
            A structured tool that solves a real problem.
          </p>
          <p className="mt-3 font-semibold text-green-800">
            This is your proof of work.
          </p>
        </Card>
      )}

      {/* Section A — Step Completion Overview */}
      <Card className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">Step Completion</h2>
        <div className="space-y-2">
          {STEPS.map((step, i) => {
            const done = stepCompleted(i);
            return (
              <div key={i} className="flex items-center gap-3">
                {done ? (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-xs text-white">
                    &#10003;
                  </span>
                ) : (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-300 text-xs text-white">
                    &bull;
                  </span>
                )}
                <span className={done ? 'font-medium text-green-700' : 'text-gray-500'}>
                  {i + 1}. {step.label}
                </span>
                <span className="ml-auto text-xs">
                  {done ? (
                    <span className="text-green-600">Completed</span>
                  ) : (
                    <span className="text-gray-400">Pending</span>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Section B — Artifact Inputs */}
      <Card className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">Final Artifacts</h2>
        <div className="space-y-4">
          {([
            { field: 'lovable' as const, label: 'Lovable Project Link' },
            { field: 'github' as const, label: 'GitHub Repository Link' },
            { field: 'deployed' as const, label: 'Deployed URL' },
          ]).map(({ field, label }) => (
            <div key={field}>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                type="url"
                value={links[field]}
                onChange={(e) => updateLink(field, e.target.value)}
                onBlur={() => handleBlur(field)}
                placeholder="https://..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              {showError(field) && (
                <p className="mt-1 text-xs text-amber-600">
                  Enter a valid URL starting with http:// or https://
                </p>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Section E — Copy Final Submission */}
      <div className="mb-8">
        <Button onClick={copySubmission} disabled={!allLinksValid}>
          {copied ? 'Copied!' : 'Copy Final Submission'}
        </Button>
      </div>

      {/* Bottom Navigation */}
      <div className="flex flex-wrap items-center gap-3">
        <Link to="/prp/08-ship">
          <Button variant="secondary">Ship</Button>
        </Link>
        <Link to="/prp/07-test">
          <Button variant="secondary">Test Checklist</Button>
        </Link>
        <Link to="/dashboard">
          <Button variant="ghost">Back to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
