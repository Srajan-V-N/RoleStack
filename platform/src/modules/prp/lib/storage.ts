import type { AnalysisEntry, ExtractedSkills } from './types';

const STORAGE_KEY = 'prp-history';

const OLD_KEY_MAP: Record<string, keyof ExtractedSkills> = {
  'Core CS': 'coreCS',
  'Languages': 'languages',
  'Web': 'web',
  'Data': 'data',
  'Cloud/DevOps': 'cloud',
  'Testing': 'testing',
  'General': 'other',
};

function migrateEntry(raw: Record<string, unknown>): AnalysisEntry | null {
  try {
    // Detect new format
    if ('baseScore' in raw && 'plan7Days' in raw && 'finalScore' in raw) {
      return raw as unknown as AnalysisEntry;
    }

    // Migrate old format
    const oldSkills = raw.extractedSkills as Record<string, string[]> | undefined;
    const newSkills: ExtractedSkills = {
      coreCS: [], languages: [], web: [], data: [], cloud: [], testing: [], other: [],
    };

    if (oldSkills) {
      for (const [oldKey, skills] of Object.entries(oldSkills)) {
        const newKey = OLD_KEY_MAP[oldKey];
        if (newKey) {
          newSkills[newKey] = skills;
        }
      }
    }

    // plan → plan7Days (title → focus)
    const oldPlan = raw.plan as { day: string; title: string; tasks: string[] }[] | undefined;
    const plan7Days = (oldPlan ?? []).map((p) => ({
      day: p.day,
      focus: p.title,
      tasks: p.tasks,
    }));

    // checklist[].round → roundTitle
    const oldChecklist = raw.checklist as { round: string; items: string[] }[] | undefined;
    const checklist = (oldChecklist ?? []).map((c) => ({
      roundTitle: c.round,
      items: c.items,
    }));

    // roundMapping: round→roundTitle, focus→focusAreas, why→whyItMatters
    const oldRoundMapping = raw.roundMapping as { round: string; focus: string; why: string; tips?: string[] }[] | undefined;
    const roundMapping = (oldRoundMapping ?? []).map((r) => ({
      roundTitle: r.round,
      focusAreas: [r.focus],
      whyItMatters: r.why,
    }));

    // Scores
    const baseScore = (raw.baseReadinessScore ?? raw.readinessScore ?? 35) as number;

    // Build skillConfidenceMap defaulting all skills to 'practice'
    const allSkills = Object.values(newSkills).flat();
    const oldConfidence = raw.skillConfidenceMap as Record<string, 'know' | 'practice'> | undefined;
    const skillConfidenceMap: Record<string, 'know' | 'practice'> = {};
    for (const skill of allSkills) {
      skillConfidenceMap[skill] = oldConfidence?.[skill] ?? 'practice';
    }

    // Compute finalScore from baseScore + confidence adjustments
    let adjustment = 0;
    for (const skill of allSkills) {
      if (skillConfidenceMap[skill] === 'know') adjustment += 2;
    }
    const finalScore = Math.max(0, Math.min(100, baseScore + adjustment));

    return {
      id: raw.id as string,
      createdAt: raw.createdAt as string,
      updatedAt: (raw.updatedAt as string) ?? new Date().toISOString(),
      company: raw.company as string,
      role: raw.role as string,
      jdText: raw.jdText as string,
      extractedSkills: newSkills,
      roundMapping,
      checklist,
      plan7Days,
      questions: raw.questions as string[],
      baseScore,
      skillConfidenceMap,
      finalScore,
      companyIntel: raw.companyIntel as AnalysisEntry['companyIntel'],
    };
  } catch {
    return null;
  }
}

export function getHistoryWithStatus(): { entries: AnalysisEntry[]; hadCorruption: boolean } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { entries: [], hadCorruption: false };

    const parsed = JSON.parse(raw) as Record<string, unknown>[];
    let hadCorruption = false;
    const entries: AnalysisEntry[] = [];

    for (const item of parsed) {
      const migrated = migrateEntry(item);
      if (migrated) {
        entries.push(migrated);
      } else {
        hadCorruption = true;
      }
    }

    // Write migrated data back
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));

    return { entries, hadCorruption };
  } catch {
    return { entries: [], hadCorruption: true };
  }
}

export function getHistory(): AnalysisEntry[] {
  return getHistoryWithStatus().entries;
}

export function saveAnalysis(entry: AnalysisEntry): void {
  const history = getHistory();
  history.unshift(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function updateEntry(updated: AnalysisEntry): void {
  const history = getHistory().map((e) => (e.id === updated.id ? updated : e));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function deleteEntry(id: string): void {
  const history = getHistory().filter((e) => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}
