import { useState, useEffect, useCallback } from "react";

export interface Preferences {
  roleKeywords: string;
  preferredLocations: string[];
  preferredMode: string[];
  experienceLevel: string;
  skills: string;
  minMatchScore: number;
}

const STORAGE_KEY = "jobTrackerPreferences";

const defaultPreferences: Preferences = {
  roleKeywords: "",
  preferredLocations: [],
  preferredMode: [],
  experienceLevel: "",
  skills: "",
  minMatchScore: 40,
};

export function usePreferences() {
  const [preferences, setPreferences] = useState<Preferences>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return { ...defaultPreferences, ...JSON.parse(stored) };
    } catch {}
    return defaultPreferences;
  });

  const checkHasPreferences = (prefs: Preferences) => {
    return !!(
      prefs.roleKeywords.trim() ||
      prefs.preferredLocations.length > 0 ||
      prefs.preferredMode.length > 0 ||
      prefs.experienceLevel ||
      prefs.skills.trim()
    );
  };

  const [hasPreferences, setHasPreferences] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return checkHasPreferences({ ...defaultPreferences, ...JSON.parse(stored) });
    } catch {}
    return false;
  });

  const save = useCallback((prefs: Preferences) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    setPreferences(prefs);
    setHasPreferences(checkHasPreferences(prefs));
  }, []);

  const clear = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setPreferences(defaultPreferences);
    setHasPreferences(false);
  }, []);

  return { preferences, hasPreferences, save, clear, defaultPreferences };
}
