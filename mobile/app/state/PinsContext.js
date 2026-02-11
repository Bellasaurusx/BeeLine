import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const PinsContext = createContext(null);

export function PinsProvider({ children }) {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPins = useCallback(async () => {
    if (!API_URL) {
      setError("Missing EXPO_PUBLIC_API_URL");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/api/observations?limit=300&sort=newest`);
      if (!res.ok) throw new Error("Failed to load observations");

      const data = await res.json();
      setPins(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("fetchPins failed:", e);
      setError(e?.message || "Failed to load pins");
    } finally {
      setLoading(false);
    }
  }, []);

  const deletePin = useCallback(
    async (id) => {
      if (!API_URL) throw new Error("Missing EXPO_PUBLIC_API_URL");
      if (!id) throw new Error("Missing pin id");

      const prev = pins;
      setPins((cur) => cur.filter((p) => p?.id !== id));

      try {
        const res = await fetch(
          `${API_URL}/api/observations/${encodeURIComponent(String(id))}`,
          { method: "DELETE" }
        );

        if (!res.ok) {
          const json = await res.json().catch(() => ({}));
          throw new Error(json?.error || "Failed to delete pin");
        }

        return true;
      } catch (e) {
        console.error("deletePin failed:", e);
        setPins(prev);
        throw e;
      }
    },
    [pins]
  );

  const upsertPin = useCallback((pin) => {
    if (!pin?.id) return;
    setPins((cur) => {
      const idx = cur.findIndex((p) => p?.id === pin.id);
      if (idx === -1) return [pin, ...cur];
      const next = [...cur];
      next[idx] = { ...next[idx], ...pin };
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ pins, setPins, loading, error, fetchPins, deletePin, upsertPin }),
    [pins, loading, error, fetchPins, deletePin, upsertPin]
  );

  return <PinsContext.Provider value={value}>{children}</PinsContext.Provider>;
}

export function usePins() {
  const ctx = useContext(PinsContext);
  if (!ctx) throw new Error("usePins must be used inside PinsProvider");
  return ctx;
}
