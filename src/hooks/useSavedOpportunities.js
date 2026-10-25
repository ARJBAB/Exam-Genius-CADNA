import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "savedOpportunityIds";

// Temporary localStorage stand-in until a saved-opportunities API exists.
const readSavedIds = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const savedIds = JSON.parse(stored);
    return Array.isArray(savedIds)
      ? savedIds.filter((id) => typeof id === "string")
      : [];
  } catch {
    return [];
  }
};

export const useSavedOpportunities = () => {
  const [savedIds, setSavedIds] = useState(readSavedIds);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
    } catch {
      // Local persistence may be unavailable in restricted browser contexts.
    }
  }, [savedIds]);

  const toggleSaved = useCallback((id) => {
    setSavedIds((currentIds) =>
      currentIds.includes(id)
        ? currentIds.filter((savedId) => savedId !== id)
        : [...currentIds, id],
    );
  }, []);

  return { savedIds: new Set(savedIds), toggleSaved };
};
