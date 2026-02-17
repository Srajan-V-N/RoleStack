import { useState, useCallback } from "react";
import { format } from "date-fns";
import { Job, jobs } from "@/modules/jnt/data/jobs";
import { computeMatchScore } from "@/modules/jnt/lib/matchScore";
import { Preferences } from "@/modules/jnt/hooks/usePreferences";

export interface DigestEntry {
  job: Job;
  matchScore: number;
}

export interface DigestData {
  entries: DigestEntry[];
  generatedAt: string; // ISO string
}

function storageKey(date: Date): string {
  return `jobTrackerDigest_${format(date, "yyyy-MM-dd")}`;
}

function loadTodayDigest(): DigestData | null {
  try {
    const raw = localStorage.getItem(storageKey(new Date()));
    if (raw) return JSON.parse(raw) as DigestData;
  } catch {}
  return null;
}

function generateDigest(preferences: Preferences): DigestData {
  const scored = jobs.map((job) => ({
    job,
    matchScore: computeMatchScore(job, preferences),
  }));

  scored.sort((a, b) => {
    if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
    return a.job.postedDaysAgo - b.job.postedDaysAgo;
  });

  const filtered = scored.filter((e) => e.matchScore >= preferences.minMatchScore);
  const top = filtered.slice(0, 10);

  const data: DigestData = {
    entries: top,
    generatedAt: new Date().toISOString(),
  };

  localStorage.setItem(storageKey(new Date()), JSON.stringify(data));
  return data;
}

export function digestToPlainText(data: DigestData): string {
  const dateStr = format(new Date(data.generatedAt), "EEEE, d MMMM yyyy");
  let text = `Top ${data.entries.length} Jobs For You — 9AM Digest\n${dateStr}\n\n`;

  data.entries.forEach((entry, i) => {
    const { job, matchScore } = entry;
    text += `${i + 1}. ${job.title} — ${job.company}\n`;
    text += `   Location: ${job.location} · ${job.mode}\n`;
    text += `   Experience: ${job.experience}\n`;
    text += `   Match: ${matchScore}%\n`;
    text += `   Apply: ${job.applyUrl}\n\n`;
  });

  text += "This digest was generated based on your preferences.\n";
  text += "Demo Mode: Daily 9AM trigger simulated manually.";
  return text;
}

export function useDigest(preferences: Preferences) {
  const [digest, setDigest] = useState<DigestData | null>(loadTodayDigest);

  const generate = useCallback(() => {
    const data = generateDigest(preferences);
    setDigest(data);
    return data;
  }, [preferences]);

  return { digest, generate };
}
