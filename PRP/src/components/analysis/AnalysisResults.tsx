import { useState, useMemo, useCallback } from 'react';
import { Card } from '@/components/ui';
import type { AnalysisEntry, ExtractedSkills } from '@/lib/types';

const CATEGORY_LABELS: Record<keyof ExtractedSkills, string> = {
  coreCS: 'Core CS',
  languages: 'Languages',
  web: 'Web',
  data: 'Data',
  cloud: 'Cloud/DevOps',
  testing: 'Testing',
  other: 'General',
};

function ScoreGauge({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color =
    score >= 75 ? '#22c55e' : score >= 50 ? '#eab308' : '#ef4444';

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="12"
        />
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 70 70)"
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
        <text
          x="70"
          y="70"
          textAnchor="middle"
          dominantBaseline="central"
          className="text-2xl font-bold"
          fill={color}
          fontSize="28"
        >
          {score}
        </text>
      </svg>
      <span className="text-sm font-medium text-gray-600">
        Readiness Score
      </span>
    </div>
  );
}

interface AnalysisResultsProps {
  entry: AnalysisEntry;
  onEntryChange?: (entry: AnalysisEntry) => void;
}

export function AnalysisResults({ entry, onEntryChange }: AnalysisResultsProps) {
  const allSkills = useMemo(
    () => Object.values(entry.extractedSkills).flat(),
    [entry.extractedSkills],
  );

  const [confidenceMap, setConfidenceMap] = useState<Record<string, 'know' | 'practice'>>(() => {
    const defaults: Record<string, 'know' | 'practice'> = {};
    for (const skill of allSkills) {
      defaults[skill] = 'practice';
    }
    return { ...defaults, ...entry.skillConfidenceMap };
  });

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const adjustedScore = useMemo(() => {
    const base = entry.baseScore;
    let adjustment = 0;
    for (const skill of allSkills) {
      adjustment += confidenceMap[skill] === 'know' ? 2 : 0;
    }
    return Math.max(0, Math.min(100, base + adjustment));
  }, [entry.baseScore, allSkills, confidenceMap]);

  const toggleSkill = useCallback(
    (skill: string) => {
      setConfidenceMap((prev) => {
        const next = {
          ...prev,
          [skill]: prev[skill] === 'know' ? 'practice' : 'know',
        } as Record<string, 'know' | 'practice'>;

        // Compute new adjusted score for the updated entry
        const base = entry.baseScore;
        let adj = 0;
        for (const s of allSkills) {
          adj += next[s] === 'know' ? 2 : 0;
        }
        const newScore = Math.max(0, Math.min(100, base + adj));

        const updated: AnalysisEntry = {
          ...entry,
          skillConfidenceMap: next,
          finalScore: newScore,
          updatedAt: new Date().toISOString(),
        };
        onEntryChange?.(updated);

        return next;
      });
    },
    [entry, allSkills, onEntryChange],
  );

  // --- Export helpers ---

  function formatPlanText(): string {
    return entry.plan7Days
      .map(({ day, focus, tasks }) =>
        `${day}: ${focus}\n${tasks.map((t, i) => `  ${i + 1}. ${t}`).join('\n')}`,
      )
      .join('\n\n');
  }

  function formatChecklistText(): string {
    return entry.checklist
      .map(({ roundTitle, items }) =>
        `${roundTitle}\n${items.map((item) => `  - ${item}`).join('\n')}`,
      )
      .join('\n\n');
  }

  function formatQuestionsText(): string {
    return entry.questions.map((q, i) => `${i + 1}. ${q}`).join('\n');
  }

  function formatFullTxt(): string {
    const skillLines = (Object.keys(entry.extractedSkills) as (keyof ExtractedSkills)[])
      .filter((key) => entry.extractedSkills[key].length > 0)
      .map((key) => `${CATEGORY_LABELS[key]}: ${entry.extractedSkills[key].join(', ')}`);

    const sections = [
      `${entry.role}${entry.company ? ` @ ${entry.company}` : ''}`,
      `Readiness Score: ${adjustedScore}/100`,
      '',
      '=== KEY SKILLS ===',
      ...skillLines,
      '',
      '=== 7-DAY PLAN ===',
      formatPlanText(),
      '',
      '=== INTERVIEW CHECKLIST ===',
      formatChecklistText(),
      '',
      '=== PRACTICE QUESTIONS ===',
      formatQuestionsText(),
    ];
    return sections.join('\n');
  }

  async function copyToClipboard(text: string, key: string) {
    await navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  }

  function downloadTxt() {
    const blob = new Blob([formatFullTxt()], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${entry.role || 'analysis'}-${entry.company || 'prep'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setCopiedKey('download');
    setTimeout(() => setCopiedKey(null), 2000);
  }

  const exportButtons: { key: string; label: string; action: () => void }[] = [
    { key: 'plan', label: 'Copy 7-Day Plan', action: () => copyToClipboard(formatPlanText(), 'plan') },
    { key: 'checklist', label: 'Copy Round Checklist', action: () => copyToClipboard(formatChecklistText(), 'checklist') },
    { key: 'questions', label: 'Copy 10 Questions', action: () => copyToClipboard(formatQuestionsText(), 'questions') },
    { key: 'download', label: 'Download as TXT', action: downloadTxt },
  ];

  return (
    <div className="mt-6 space-y-6">
      {/* Score + Company Info */}
      <Card className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-8">
        <ScoreGauge score={adjustedScore} />
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-lg font-semibold text-gray-900">
            {entry.role || 'Role'}{' '}
            {entry.company && (
              <span className="text-gray-500">@ {entry.company}</span>
            )}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Analyzed on{' '}
            {new Date(entry.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </Card>

      {/* Company Intel */}
      {entry.companyIntel && (
        <Card>
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Company Intel
          </h3>
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
              {entry.companyIntel.industry}
            </span>
            <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
              {entry.companyIntel.sizeLabel}
            </span>
          </div>
          <p className="mt-3 text-sm text-gray-700">
            {entry.companyIntel.hiringFocus}
          </p>
          <p className="mt-3 text-xs italic text-gray-400">
            Demo Mode: Company intel generated heuristically.
          </p>
        </Card>
      )}

      {/* Expected Interview Rounds */}
      {entry.roundMapping.length > 0 && (
        <Card>
          <h3 className="mb-6 text-lg font-semibold text-gray-900">
            Expected Interview Rounds
          </h3>
          <div className="relative ml-4 border-l-2 border-primary pl-6">
            {entry.roundMapping.map((r, i) => (
              <div key={i} className="relative mb-8 last:mb-0">
                <div className="absolute -left-[calc(1.5rem+5px)] flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  {i + 1}
                </div>
                <h4 className="text-sm font-bold text-gray-900">{r.roundTitle}</h4>
                <span className="text-xs font-medium text-primary">{r.focusAreas.join(', ')}</span>
                <p className="mt-1 text-xs italic text-gray-500">{r.whyItMatters}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Export Buttons */}
      <div className="flex flex-wrap gap-2">
        {exportButtons.map(({ key, label, action }) => (
          <button
            key={key}
            onClick={action}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-primary"
          >
            {copiedKey === key ? (key === 'download' ? 'Downloaded!' : 'Copied!') : label}
          </button>
        ))}
      </div>

      {/* Extracted Skills with Confidence Toggles */}
      <Card>
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Key Skills Identified
        </h3>
        <p className="mb-3 text-xs text-gray-500">
          Click a skill to mark it as known — your readiness score updates live.
        </p>
        <div className="space-y-3">
          {(Object.keys(entry.extractedSkills) as (keyof ExtractedSkills)[])
            .filter((key) => entry.extractedSkills[key].length > 0)
            .map((key) => (
              <div key={key}>
                <span className="text-sm font-medium text-gray-700">
                  {CATEGORY_LABELS[key]}
                </span>
                <div className="mt-1 flex flex-wrap gap-2">
                  {entry.extractedSkills[key].map((skill) => {
                    const isKnown = confidenceMap[skill] === 'know';
                    return (
                      <button
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                          isKnown
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                        }`}
                      >
                        {skill} {isKnown ? '— I know this' : '— Need practice'}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
        </div>
      </Card>

      {/* Round-wise Checklist */}
      <Card>
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Interview Preparation Checklist
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {entry.checklist.map(({ roundTitle, items }) => (
            <div
              key={roundTitle}
              className="rounded-lg border border-gray-200 p-4"
            >
              <h4 className="mb-2 text-sm font-semibold text-primary">
                {roundTitle}
              </h4>
              <ul className="space-y-1.5">
                {items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <span className="mt-0.5 text-primary">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      {/* 7-Day Plan */}
      <Card>
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          7-Day Preparation Plan
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {entry.plan7Days.map(({ day, focus, tasks }) => (
            <div
              key={day}
              className="rounded-lg border border-gray-200 p-4"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded bg-primary px-2 py-0.5 text-xs font-bold text-white">
                  {day}
                </span>
                <span className="text-sm font-semibold text-gray-800">
                  {focus}
                </span>
              </div>
              <ul className="space-y-1">
                {tasks.map((task, i) => (
                  <li
                    key={i}
                    className="text-sm text-gray-600"
                  >
                    {i + 1}. {task}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      {/* Interview Questions */}
      <Card>
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Practice Interview Questions
        </h3>
        <ol className="space-y-3">
          {entry.questions.map((q, i) => (
            <li
              key={i}
              className="flex gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3 text-sm text-gray-700"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                {i + 1}
              </span>
              {q}
            </li>
          ))}
        </ol>
      </Card>

      {/* Action Next */}
      <Card>
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Action Next
        </h3>
        {(() => {
          const weakSkills = allSkills
            .filter((s) => confidenceMap[s] === 'practice')
            .slice(0, 3);

          if (weakSkills.length === 0) {
            return (
              <p className="text-sm text-green-700">
                You've marked all skills as known — great confidence! Review the
                practice questions above and start your prep plan to stay sharp.
              </p>
            );
          }

          return (
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Focus on these skills first:
              </p>
              <div className="flex flex-wrap gap-2">
                {weakSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              {entry.plan7Days[0] && (
                <p className="text-sm text-gray-700">
                  Start with{' '}
                  <span className="font-semibold">Day 1</span> of your prep
                  plan —{' '}
                  <span className="font-medium text-primary">
                    {entry.plan7Days[0].focus}
                  </span>
                </p>
              )}
            </div>
          );
        })()}
      </Card>
    </div>
  );
}
