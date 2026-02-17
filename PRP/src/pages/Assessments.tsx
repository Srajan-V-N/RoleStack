import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Card, Button } from '@/components/ui';
import { AnalysisResults } from '@/components/analysis/AnalysisResults';
import {
  extractSkills,
  computeReadinessScore,
  generateChecklist,
  generatePlan,
  generateQuestions,
  getCompanyIntel,
  generateRoundMapping,
} from '@/lib/analyze';
import { saveAnalysis, updateEntry, getHistory } from '@/lib/storage';
import type { AnalysisEntry } from '@/lib/types';

const SESSION_KEY = 'prp-current-entry';

export function Assessments() {
  const location = useLocation();
  const [result, setResult] = useState<AnalysisEntry | null>(null);
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [jdText, setJdText] = useState('');

  // Load entry from navigation state, or restore from sessionStorage on refresh
  useEffect(() => {
    const state = location.state as { entry?: AnalysisEntry } | null;
    if (state?.entry) {
      setResult(state.entry);
      sessionStorage.setItem(SESSION_KEY, state.entry.id);
      window.history.replaceState({}, '');
    } else {
      const storedId = sessionStorage.getItem(SESSION_KEY);
      if (storedId) {
        const match = getHistory().find((e) => e.id === storedId);
        if (match) setResult(match);
      }
    }
  }, [location.state]);

  const isJdEmpty = jdText.trim().length === 0;
  const isJdShort = !isJdEmpty && jdText.trim().length < 200;

  function handleAnalyze() {
    const skills = extractSkills(jdText);
    const baseScore = computeReadinessScore(skills, company, role, jdText);
    const checklist = generateChecklist(skills);
    const plan7Days = generatePlan(skills);
    const questions = generateQuestions(skills);

    const companyIntel = company.trim() ? getCompanyIntel(company, skills) : undefined;
    const roundMapping = generateRoundMapping(companyIntel?.sizeCategory ?? 'Startup', skills);

    // Build skillConfidenceMap with all skills defaulting to 'practice'
    const allSkills = Object.values(skills).flat();
    const skillConfidenceMap: Record<string, 'know' | 'practice'> = {};
    for (const skill of allSkills) {
      skillConfidenceMap[skill] = 'practice';
    }

    const now = new Date().toISOString();
    const entry: AnalysisEntry = {
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
      company: company.trim(),
      role: role.trim(),
      jdText,
      extractedSkills: skills,
      plan7Days,
      checklist,
      questions,
      baseScore,
      skillConfidenceMap,
      finalScore: baseScore,
      companyIntel,
      roundMapping,
    };

    saveAnalysis(entry);
    sessionStorage.setItem(SESSION_KEY, entry.id);
    setResult(entry);
  }

  function handleReset() {
    sessionStorage.removeItem(SESSION_KEY);
    setResult(null);
    setCompany('');
    setRole('');
    setJdText('');
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900">Assessments</h2>

      {result ? (
        <>
          <div className="mt-4">
            <Button variant="ghost" onClick={handleReset}>
              ← New Analysis
            </Button>
          </div>
          <AnalysisResults
            entry={result}
            onEntryChange={(updated) => {
              setResult(updated);
              updateEntry(updated);
            }}
          />
        </>
      ) : (
        <Card className="mt-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Analyze a Job Description
          </h3>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Company
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Google"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Role
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. SDE Intern"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Job Description
              </label>
              <textarea
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                placeholder="Paste the full job description here..."
                rows={8}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {isJdShort && (
                <p className="mt-1 text-sm text-amber-600">
                  This JD is too short to analyze deeply. Paste full JD for better output.
                </p>
              )}
            </div>
            <Button onClick={handleAnalyze} disabled={isJdEmpty}>
              Analyze
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
