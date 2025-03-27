import { createContext, useState, useContext, ReactNode } from 'react';

interface SurveyContextType {
  isModalOpen: boolean;
  openSurveyModal: () => void;
  closeSurveyModal: () => void;
}

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const SurveyProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openSurveyModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeSurveyModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <SurveyContext.Provider value={{ isModalOpen, openSurveyModal, closeSurveyModal }}>
      {children}
    </SurveyContext.Provider>
  );
};

export const useSurvey = () => {
  const context = useContext(SurveyContext);
  if (context === undefined) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
};
