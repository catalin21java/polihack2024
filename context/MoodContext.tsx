import React, { createContext, useContext, useState, ReactNode } from "react";

interface MoodData {
  labels: string[];
  data: number[];
  positiveDays: number;
  totalDays: number;
}

interface MoodContextType {
  moodData: MoodData;
  setMoodData: React.Dispatch<React.SetStateAction<MoodData>>;
}

// Default values for the context
const defaultMoodData: MoodData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  data: [0, 1, 3, 2],
  positiveDays: 4,
  totalDays: 5,
};

// Create the context
const MoodContext = createContext<MoodContextType | undefined>(undefined);

// Provider component
export const MoodProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [moodData, setMoodData] = useState<MoodData>(defaultMoodData);

  return (
    <MoodContext.Provider value={{ moodData, setMoodData }}>
      {children}
    </MoodContext.Provider>
  );
};

// Hook to use the MoodContext
export const useMood = () => {
  const context = useContext(MoodContext);
  if (!context) {
    throw new Error("useMood must be used within a MoodProvider");
  }
  return context;
};
