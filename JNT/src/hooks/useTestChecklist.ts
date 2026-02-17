import { useState, useCallback } from "react";

export interface TestItem {
  id: string;
  label: string;
  howToTest: string;
}

export const TEST_ITEMS: TestItem[] = [
  { id: "pref_persist", label: "Preferences persist after refresh", howToTest: "Go to Settings, save preferences, refresh the page, and verify they're still there." },
  { id: "match_score", label: "Match score calculates correctly", howToTest: "Set preferences with specific keywords/skills, then check Dashboard cards show accurate match percentages." },
  { id: "match_toggle", label: "\"Show only matches\" toggle works", howToTest: "Enable the toggle on Dashboard and confirm only jobs above your threshold appear." },
  { id: "save_persist", label: "Save job persists after refresh", howToTest: "Save a job on Dashboard, refresh, then check the Saved page to confirm it's still there." },
  { id: "apply_tab", label: "Apply opens in new tab", howToTest: "Click \"Apply\" on any job card and confirm it opens the link in a new browser tab." },
  { id: "status_persist", label: "Status update persists after refresh", howToTest: "Change a job's status (e.g., to Applied), refresh the page, and verify the status is retained." },
  { id: "status_filter", label: "Status filter works correctly", howToTest: "Set a job to \"Applied\", then use the Status filter dropdown on Dashboard to filter by \"Applied\"." },
  { id: "digest_top10", label: "Digest generates top 10 by score", howToTest: "Set preferences, go to Digest, generate digest, and verify 10 jobs sorted by match score." },
  { id: "digest_persist", label: "Digest persists for the day", howToTest: "Generate a digest, refresh the page, and confirm the same digest loads without regenerating." },
  { id: "no_console_errors", label: "No console errors on main pages", howToTest: "Open browser DevTools, visit Dashboard, Saved, Digest, Settings — check for zero errors." },
];

const STORAGE_KEY = "jobTrackerTestChecklist";

function loadChecked(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
}

export function useTestChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>(loadChecked);

  const toggle = useCallback((id: string) => {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setChecked({});
  }, []);

  const passedCount = TEST_ITEMS.filter((t) => checked[t.id]).length;
  const allPassed = passedCount === TEST_ITEMS.length;

  return { checked, toggle, reset, passedCount, total: TEST_ITEMS.length, allPassed };
}
