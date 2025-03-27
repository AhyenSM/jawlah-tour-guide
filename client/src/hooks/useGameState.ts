import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { gameScenarios } from '@/lib/gameData';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface Choice {
  scenarioId: number;
  choiceId: string;
  points: number;
}

export const useGameState = () => {
  const [currentScenario, setCurrentScenario] = useState(1);
  const [currentScore, setCurrentScore] = useState(0);
  const [choices, setChoices] = useState<Choice[]>([]);
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const { toast } = useToast();
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
  
  // API mutations
  const updateStatsMutation = useMutation({
    mutationFn: async (data: { scenarioId: number; choiceId: string }) => {
      const response = await fetch('/api/game/stats', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      return await response.json();
    },
    onError: (error) => {
      console.error('Failed to update game statistics:', error);
      // Silent fail - we don't want to disrupt the game experience
    }
  });
  
  const saveScoreMutation = useMutation({
    mutationFn: async (data: { 
      score: number; 
      travelerType: string; 
      choices: Choice[];
      userId?: number | null;
    }) => {
      const response = await fetch('/api/game/scores', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Score saved",
        description: "Your game results have been recorded.",
      });
    },
    onError: (error) => {
      console.error('Failed to save score:', error);
      toast({
        title: "Couldn't save score",
        description: "There was an error saving your results.",
        variant: "destructive",
      });
    }
  });
  
  const resetGame = () => {
    setCurrentScenario(1);
    setCurrentScore(0);
    setChoices([]);
    setIsGameCompleted(false);
  };
  
  const handleScenarioChoice = (scenarioId: number, choiceId: string, points: number) => {
    // Record the choice
    const newChoices = [...choices, { scenarioId, choiceId, points }];
    setChoices(newChoices);
    
    // Update score
    const newScore = currentScore + points;
    setCurrentScore(newScore);
    
    // Update statistics in the database
    updateStatsMutation.mutate({ scenarioId, choiceId });
    
    // Check if game is completed
    if (currentScenario === totalScenarios) {
      setIsGameCompleted(true);
      
      // Calculate traveler type
      const { travelerType } = getTravelerInfo(newScore);
      
      // Save the final score to the database
      saveScoreMutation.mutate({
        score: newScore,
        travelerType,
        choices: newChoices,
        userId: null // Anonymous user
      });
    } else {
      // Move to next scenario
      setCurrentScenario(currentScenario + 1);
    }
  };
  
  // Calculate traveler type based on final score
  const getTravelerInfo = (score: number = currentScore) => {
    if (score >= 35) {
      return {
        travelerType: "Cultural Enthusiast",
        travelerDescription: "You're a true explorer who values authentic experiences and cultural immersion. You're eager to try new foods, learn local customs, and connect with the people and traditions of Qatar."
      };
    } else if (score >= 25) {
      return {
        travelerType: "Balanced Adventurer",
        travelerDescription: "You appreciate a good mix of planned activities and spontaneous discoveries. You're open to new experiences while still valuing comfort and convenience in your travels."
      };
    } else if (score >= 15) {
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
    choices,
    isGameCompleted,
    saveScoreMutation,
    updateStatsMutation
  };
};
