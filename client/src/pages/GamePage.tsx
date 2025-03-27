import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import GameIntro from '@/components/game/GameIntro';
import GameContainer from '@/components/game/GameContainer';
import GameResults from '@/components/game/GameResults';
import { useGameState } from '@/hooks/useGameState';

const GamePage = () => {
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
    <div className="min-h-screen bg-slate-50 pt-16">
      <div className="container mx-auto px-6 py-10">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="flex items-center space-x-2">
              <i className="fas fa-arrow-left"></i>
              <span>Back to Home</span>
            </Button>
          </Link>
        </div>

        <h1 className="font-poppins font-bold text-3xl md:text-5xl text-center mb-6 text-[#1A365D]">
          Qatar Travel <span className="text-[#D4AF37]">Adventure</span>
        </h1>
        <p className="text-center text-slate-600 max-w-3xl mx-auto mb-16">
          Make choices as a tourist in Qatar, navigate cultural experiences,
          and discover your unique travel personality.
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
    </div>
  );
};

export default GamePage;
