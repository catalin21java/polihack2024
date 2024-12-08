import React, { createContext, useContext, useState, ReactNode } from "react";

interface AnswersContextType {
  answers: Record<number, string[]>; // Store answers for each question
  setAnswers: (questionIndex: number, selectedAnswers: string[]) => void;
}

// Create context
const AnswersContext = createContext<AnswersContextType | undefined>(undefined);

// Provider component
export const AnswersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [answers, setAllAnswers] = useState<Record<number, string[]>>({});

  // Save answers for a specific question
  const setAnswers = (questionIndex: number, selectedAnswers: string[]) => {
    setAllAnswers((prev) => ({
      ...prev,
      [questionIndex]: selectedAnswers,
    }));
  };

  return (
    <AnswersContext.Provider value={{ answers, setAnswers }}>
      {children}
    </AnswersContext.Provider>
  );
};

// Hook to use the context
export const useAnswers = () => {
  const context = useContext(AnswersContext);
  if (!context) {
    throw new Error("useAnswers must be used within an AnswersProvider");
  }
  return context;
};
