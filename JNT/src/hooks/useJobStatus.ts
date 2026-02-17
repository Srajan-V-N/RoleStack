import { useState, useCallback } from "react";

export type JobStatus = "Not Applied" | "Applied" | "Rejected" | "Selected";

export interface StatusChange {
  jobId: number;
  status: JobStatus;
  changedAt: string; // ISO string
}

const STATUS_KEY = "jobTrackerStatuses";
const HISTORY_KEY = "jobTrackerStatusHistory";

function loadStatuses(): Record<number, JobStatus> {
  try {
    const raw = localStorage.getItem(STATUS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
}

function loadHistory(): StatusChange[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export function useJobStatus() {
  const [statuses, setStatuses] = useState<Record<number, JobStatus>>(loadStatuses);
  const [history, setHistory] = useState<StatusChange[]>(loadHistory);

  const getStatus = useCallback(
    (jobId: number): JobStatus => statuses[jobId] ?? "Not Applied",
    [statuses],
  );

  const setStatus = useCallback(
    (jobId: number, status: JobStatus) => {
      setStatuses((prev) => {
        const next = { ...prev, [jobId]: status };
        localStorage.setItem(STATUS_KEY, JSON.stringify(next));
        return next;
      });

      const entry: StatusChange = {
        jobId,
        status,
        changedAt: new Date().toISOString(),
      };

      setHistory((prev) => {
        const next = [entry, ...prev].slice(0, 50); // keep last 50
        localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
        return next;
      });
    },
    [],
  );

  return { getStatus, setStatus, history };
}
