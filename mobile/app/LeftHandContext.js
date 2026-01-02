import React, { createContext, useContext, useState } from "react";

const LeftHandContext = createContext(null);

export function LeftHandProvider({ children }) {
  const [leftHandMode, setLeftHandMode] = useState(false);

  const toggleLeftHandMode = () => setLeftHandMode((prev) => !prev);

  return (
    <LeftHandContext.Provider
      value={{ leftHandMode, setLeftHandMode, toggleLeftHandMode }}
    >
      {children}
    </LeftHandContext.Provider>
  );
}

export function useLeftHand() {
  const ctx = useContext(LeftHandContext);
  if (!ctx) {
    throw new Error("useLeftHand must be used inside LeftHandProvider");
  }
  return ctx;
}
