import { useState, useEffect } from 'react';
import { gameScenarios } from '@/lib/gameData';

interface Choice {
  scenarioId: number;
  choiceId: string;
  points: number;
}

export const useGameState = () => {
  const [currentScenario, setCurrentScenario] = useState(1);
  const [currentScore, setCurrentScore] = useState(0);
  const [choices, setChoices] = useState<Choice[]>([]);
  const totalScenarios = gameScenarios.length;
  
  // Load from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('jawlahGameState');
    if (savedState) {
      try {
        const { currentScenario, currentScore, choices } = JSON.parse(savedState);
        setCurrentScenario(currentScenario);
        setCurrentScore(currentScore);
        setChoices(choices);
      } catch (error) {
        console.error('Error parsing saved game state:', error);
      }
    }
  }, []);
  
  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('jawlahGameState', JSON.stringify({
      currentScenario,
      currentScore,
      choices
    }));
  }, [currentScenario, currentScore, choices]);
  
  const resetGame = () => {
    setCurrentScenario(1);
    setCurrentScore(0);
    setChoices([]);
  };
  
  const handleScenarioChoice = (scenarioId: number, choiceId: string, points: number) => {
    // Record the choice
    setChoices([...choices, { scenarioId, choiceId, points }]);
    
    // Update score
    setCurrentScore(currentScore + points);
    
    // Move to next scenario
    if (currentScenario < totalScenarios) {
      setCurrentScenario(currentScenario + 1);
    }
  };
  
  // Calculate traveler type based on final score
  const getTravelerInfo = () => {
    if (currentScore >= 35) {
      return {
        travelerType: "Cultural Enthusiast",
        travelerDescription: "You're a true explorer who values authentic experiences and cultural immersion. You're eager to try new foods, learn local customs, and connect with the people and traditions of Qatar."
      };
    } else if (currentScore >= 25) {
      return {
        travelerType: "Balanced Adventurer",
        travelerDescription: "You appreciate a good mix of planned activities and spontaneous discoveries. You're open to new experiences while still valuing comfort and convenience in your travels."
      };
    } else if (currentScore >= 15) {
      return {
        travelerType: "Comfort Seeker",
        travelerDescription: "You enjoy traveling at your own pace with a focus on relaxation and familiar comforts. You appreciate guided experiences that provide context without pushing too far outside your comfort zone."
      };
    } else {
      return {
        travelerType: "Cautious Explorer",
        travelerDescription: "You prefer predictable, well-planned travel experiences with minimal surprises. You value safety, structure, and familiar elements in your travel experiences."
      };
    }
  };
  
  const { travelerType, travelerDescription } = getTravelerInfo();
  
  return {
    currentScenario,
    totalScenarios,
    currentScore,
    finalScore: currentScore,
    travelerType,
    travelerDescription,
    resetGame,
    handleScenarioChoice,
    choices
  };
};
