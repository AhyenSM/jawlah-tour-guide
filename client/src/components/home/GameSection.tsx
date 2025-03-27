import { useState } from 'react';
import GameIntro from '../game/GameIntro';
import GameContainer from '../game/GameContainer';
import GameResults from '../game/GameResults';
import { useGameState } from '@/hooks/useGameState';

const GameSection = () => {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'results'>('intro');
  const { 
    currentScenario,
    totalScenarios,
    currentScore,
    resetGame,
    handleScenarioChoice,
    finalScore,
    travelerType,
    travelerDescription
  } = useGameState();

  const startGame = () => {
    resetGame();
    setGameState('playing');
  };

  const showResults = () => {
    setGameState('results');
  };

  const playAgain = () => {
    resetGame();
    setGameState('playing');
  };

  return (
    <section id="game" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="font-poppins font-bold text-3xl md:text-4xl text-center mb-6 text-[#1A365D]">
          Test Your <span className="text-[#D4AF37]">Travel Instincts</span>
        </h2>
        <p className="text-center text-slate-600 max-w-3xl mx-auto mb-16">
          Experience a taste of Qatar with our interactive tour game. Make choices as a tourist and earn your Traveler Score!
        </p>
        
        {gameState === 'intro' && <GameIntro onStartGame={startGame} />}
        
        {gameState === 'playing' && (
          <GameContainer
            currentScenario={currentScenario}
            totalScenarios={totalScenarios}
            currentScore={currentScore}
            onChoice={(scenarioId, choiceId, points) => {
              handleScenarioChoice(scenarioId, choiceId, points);
              if (currentScenario === totalScenarios) {
                showResults();
              }
            }}
          />
        )}
        
        {gameState === 'results' && (
          <GameResults
            finalScore={finalScore}
            travelerType={travelerType}
            travelerDescription={travelerDescription}
            onPlayAgain={playAgain}
          />
        )}
      </div>
    </section>
  );
};

export default GameSection;
