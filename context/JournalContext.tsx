import React, { createContext, useContext, useState } from "react";

// Define the context type
interface JournalEntry {
  id: number;
  title: string;
  description: string;
  date: string;
}

interface JournalContextType {
  entries: JournalEntry[];
  setEntries: React.Dispatch<React.SetStateAction<JournalEntry[]>>;
}

// Create the context with a default value of `null`
const JournalContext = createContext<JournalContextType | null>(null);

// Provider component
export const JournalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  return (
    <JournalContext.Provider value={{ entries, setEntries }}>
      {children}
    </JournalContext.Provider>
  );
};

// Custom hook to use the context
export const useJournal = (): JournalContextType => {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error("useJournal must be used within a JournalProvider");
  }
  return context;
};
