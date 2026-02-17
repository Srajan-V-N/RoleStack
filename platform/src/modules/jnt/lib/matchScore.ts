import { Job } from "@/modules/jnt/data/jobs";
import { Preferences } from "@/modules/jnt/hooks/usePreferences";

export function computeMatchScore(job: Job, prefs: Preferences): number {
  let score = 0;

  const keywords = prefs.roleKeywords
    .split(",")
    .map((k) => k.trim().toLowerCase())
    .filter(Boolean);

  const userSkills = prefs.skills
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  // +25 if any roleKeyword appears in job.title
  if (keywords.some((kw) => job.title.toLowerCase().includes(kw))) {
    score += 25;
  }

  // +15 if any roleKeyword appears in job.description
  if (keywords.some((kw) => job.description.toLowerCase().includes(kw))) {
    score += 15;
  }

  // +15 if job.location matches preferredLocations
  if (prefs.preferredLocations.includes(job.location)) {
    score += 15;
  }

  // +10 if job.mode matches preferredMode
  if (prefs.preferredMode.includes(job.mode)) {
    score += 10;
  }

  // +10 if job.experience matches experienceLevel
  if (prefs.experienceLevel && job.experience === prefs.experienceLevel) {
    score += 10;
  }

  // +15 if overlap between job.skills and user.skills
  if (
    userSkills.length > 0 &&
    job.skills.some((s) => userSkills.includes(s.toLowerCase()))
  ) {
    score += 15;
  }

  // +5 if postedDaysAgo <= 2
  if (job.postedDaysAgo <= 2) {
    score += 5;
  }

  // +5 if source is LinkedIn
  if (job.source === "LinkedIn") {
    score += 5;
  }

  return Math.min(score, 100);
}

export function scoreBadgeColor(score: number): string {
  if (score >= 80) return "bg-[hsl(152,30%,42%)] text-white border-transparent";
  if (score >= 60) return "bg-[hsl(40,60%,50%)] text-white border-transparent";
  if (score >= 40) return "bg-secondary text-secondary-foreground border-transparent";
  return "bg-muted text-muted-foreground border-transparent";
}
