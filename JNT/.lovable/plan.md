
## Daily Digest Engine for Job Notification Tracker

### Overview
Transform the empty Digest page into a fully functional "email-style" daily digest that surfaces the top 10 matched jobs, persists per day in localStorage, and provides Copy and Email Draft actions.

### What Will Be Built

**1. Digest Generation Logic (new hook: `src/hooks/useDigest.ts`)**
- On button click, compute match scores for all jobs using the existing `computeMatchScore` engine
- Sort by matchScore descending, then postedDaysAgo ascending
- Take the top 10 results
- Store in localStorage as `jobTrackerDigest_YYYY-MM-DD` (e.g., `jobTrackerDigest_2026-02-13`)
- On page load, check if today's digest already exists -- if so, load it instead of regenerating
- Stored data: array of `{ job: Job, matchScore: number }` objects plus a generation timestamp

**2. Digest Page Rewrite (`src/pages/Digest.tsx`)**

Three possible states:

- **No preferences set**: Blocking message with icon -- "Set preferences to generate a personalized digest." with a button linking to /settings
- **No digest yet (preferences exist)**: "Generate Today's 9AM Digest (Simulated)" button, centered on the page
- **Digest generated**: Full email-style layout

**3. Email-Style Digest Layout**

```text
+--------------------------------------------------+
|  Off-white background (page bg)                  |
|                                                   |
|  +--------------------------------------------+  |
|  | White card (max-width ~640px, centered)     |  |
|  |                                             |  |
|  | HEADER                                      |  |
|  | "Top 10 Jobs For You -- 9AM Digest"         |  |
|  | Thursday, 13 February 2026                  |  |
|  |                                             |  |
|  | DIVIDER                                     |  |
|  |                                             |  |
|  | JOB 1: Title / Company / Location           |  |
|  |         Experience / Match Score / [Apply]   |  |
|  |                                             |  |
|  | DIVIDER                                     |  |
|  |                                             |  |
|  | JOB 2: ...                                  |  |
|  | ...                                         |  |
|  |                                             |  |
|  | FOOTER                                      |  |
|  | "This digest was generated based on your    |  |
|  |  preferences."                              |  |
|  |                                             |  |
|  | "Demo Mode: Daily 9AM trigger simulated     |  |
|  |  manually."                                 |  |
|  +--------------------------------------------+  |
|                                                   |
|  [Copy Digest to Clipboard] [Create Email Draft]  |
+--------------------------------------------------+
```

Each job row shows: Title, Company, Location, Experience, Match Score badge (color-coded), and an "Apply" link button.

**4. Action Buttons**

- **Copy Digest to Clipboard**: Generates a plain-text formatted list of all 10 jobs (title, company, location, experience, match score, apply URL) and copies to clipboard. Shows a toast confirmation.
- **Create Email Draft**: Opens `mailto:` link with subject "My 9AM Job Digest" and the same plain-text digest in the body.

**5. Edge Cases**
- If preferences are set but no jobs meet the minimum threshold, show: "No matching roles today. Check again tomorrow."
- If fewer than 10 jobs match, show however many are available

### Files Changed

| File | Action | Purpose |
|------|--------|---------|
| `src/hooks/useDigest.ts` | Create | Digest generation, localStorage persistence, and retrieval logic |
| `src/pages/Digest.tsx` | Rewrite | Full digest UI with all three states |

### Technical Details

- No new dependencies required
- No routes changed
- Uses existing `computeMatchScore`, `scoreBadgeColor`, `usePreferences`, `jobs` data
- localStorage key pattern: `jobTrackerDigest_YYYY-MM-DD` using `date-fns` `format()` for date formatting
- Plain-text generation helper function for both Copy and Email actions
- All styling uses existing design tokens (off-white bg, white card, serif headings, sans-serif body, 8/16/24/40/64px spacing scale)

### Verification Steps
1. Generate a digest on the Digest page
2. Refresh the page -- digest should persist and display without regenerating
3. Click "Copy Digest to Clipboard" -- paste elsewhere to confirm content
4. Click "Create Email Draft" -- confirm email client opens with pre-filled subject and body
5. Clear preferences in Settings -- return to Digest page and confirm blocking message appears
