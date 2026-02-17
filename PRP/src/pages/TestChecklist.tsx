import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const STORAGE_KEY = 'prp-test-checklist';
const TOTAL = 10;

const TEST_ITEMS = [
  {
    label: 'JD required validation works',
    hint: 'Leave JD empty on Assessments page; Analyze button should be disabled.',
  },
  {
    label: 'Short JD warning shows for <200 chars',
    hint: 'Type <200 chars in JD textarea; amber warning should appear.',
  },
  {
    label: 'Skills extraction groups correctly',
    hint: 'Paste a JD mentioning React, Python, AWS; check skill categories.',
  },
  {
    label: 'Round mapping changes based on company + skills',
    hint: 'Analyze with/without company name; round mapping should differ.',
  },
  {
    label: 'Score calculation is deterministic',
    hint: 'Analyze same JD twice; base score should be identical.',
  },
  {
    label: 'Skill toggles update score live',
    hint: "On results page, toggle a skill to 'I know this'; score should increase.",
  },
  {
    label: 'Changes persist after refresh',
    hint: 'Toggle skills, refresh page; toggles and score should persist.',
  },
  {
    label: 'History saves and loads correctly',
    hint: 'Analyze a JD, go to Resources; entry should appear in list.',
  },
  {
    label: 'Export buttons copy the correct content',
    hint: "Click 'Copy 7-Day Plan'; paste in notepad and verify content.",
  },
  {
    label: 'No console errors on core pages',
    hint: 'Open DevTools Console, navigate all pages; no red errors.',
  },
];

function loadChecklist(): boolean[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length === TOTAL) return parsed;
    }
  } catch {
    // ignore
  }
  return Array(TOTAL).fill(false);
}

export function TestChecklist() {
  const [checks, setChecks] = useState<boolean[]>(loadChecklist);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checks));
  }, [checks]);

  const passed = checks.filter(Boolean).length;

  function toggle(index: number) {
    setChecks((prev) => prev.map((v, i) => (i === index ? !v : v)));
  }

  function reset() {
    const fresh = Array(TOTAL).fill(false) as boolean[];
    setChecks(fresh);
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">Test Checklist</h1>

      {/* Summary */}
      <Card className="mb-8">
        <p className="text-lg font-semibold">
          Tests Passed: {passed} / {TOTAL}
        </p>
        {passed < TOTAL ? (
          <p className="mt-1 text-sm text-amber-600">
            Fix issues before shipping.
          </p>
        ) : (
          <p className="mt-1 text-sm text-green-600">
            All tests passed! Ready to ship.
          </p>
        )}
      </Card>

      {/* Checklist */}
      <div className="space-y-3">
        {TEST_ITEMS.map((item, i) => (
          <label
            key={i}
            className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
          >
            <input
              type="checkbox"
              checked={checks[i]}
              onChange={() => toggle(i)}
              className="mt-0.5 h-5 w-5 shrink-0 accent-primary"
            />
            <div>
              <span className="font-medium">
                {i + 1}. {item.label}
              </span>
              <p className="mt-0.5 text-sm text-gray-500">{item.hint}</p>
            </div>
          </label>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button variant="secondary" onClick={reset}>
          Reset checklist
        </Button>
        <Link to="/prp/08-ship">
          <Button>Go to Ship</Button>
        </Link>
        <Link to="/dashboard">
          <Button variant="ghost">Back to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
