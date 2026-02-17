import { useState, useCallback } from "react";

export interface ProofLinks {
  lovableLink: string;
  githubLink: string;
  deployedLink: string;
}

const STORAGE_KEY = "jobTrackerProofLinks";

function load(): ProofLinks {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { lovableLink: "", githubLink: "", deployedLink: "" };
}

const URL_REGEX = /^https?:\/\/.+\..+/;

export function isValidUrl(url: string): boolean {
  return URL_REGEX.test(url.trim());
}

export function useProofSubmission() {
  const [links, setLinks] = useState<ProofLinks>(load);

  const updateLink = useCallback((key: keyof ProofLinks, value: string) => {
    setLinks((prev) => {
      const next = { ...prev, [key]: value };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const allLinksValid =
    isValidUrl(links.lovableLink) &&
    isValidUrl(links.githubLink) &&
    isValidUrl(links.deployedLink);

  return { links, updateLink, allLinksValid };
}
