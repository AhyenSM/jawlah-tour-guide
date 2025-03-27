import { useState, useEffect } from 'react';
import { MapPin, Award, Users } from 'lucide-react';
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
    travelerDescription,
    isGameCompleted
  } = useGameState();

  // Update game state based on completion
  useEffect(() => {
    if (isGameCompleted) {
      setGameState('results');
    }
  }, [isGameCompleted]);

  const startGame = () => {
    resetGame();
    setGameState('playing');
  };

  const playAgain = () => {
    resetGame();
    setGameState('playing');
  };

  return (
    <section 
      id="game" 
      className="py-20 relative bg-gradient-to-r from-[#F8F7F2] to-[#F0EDDE]"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1544649064-510c62b21f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundBlendMode: 'overlay'
      }}
    >
      {/* Overlay for better content visibility */}
      <div className="absolute inset-0 bg-[#1A365D] opacity-80"></div>
      
      <div className="container relative z-10 mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="font-poppins font-bold text-3xl md:text-5xl text-center mb-6 text-white text-shadow">
            Test Your <span className="text-[#D4AF37]">Travel Instincts</span>
          </h2>
          <p className="text-xl text-center text-slate-200 max-w-3xl mx-auto mb-10 text-shadow-sm">
            Experience a taste of Qatar with our interactive tour game. Make choices and discover your true travel personality!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-white">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl border border-white border-opacity-20 hover:bg-opacity-20 transition-all">
              <div className="rounded-full bg-[#D4AF37] bg-opacity-20 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Explore Qatar</h3>
              <p className="text-slate-200">Navigate through authentic cultural scenarios and experiences.</p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl border border-white border-opacity-20 hover:bg-opacity-20 transition-all">
              <div className="rounded-full bg-[#D4AF37] bg-opacity-20 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Earn Your Score</h3>
              <p className="text-slate-200">Make decisions and discover your unique travel personality type.</p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl border border-white border-opacity-20 hover:bg-opacity-20 transition-all">
              <div className="rounded-full bg-[#D4AF37] bg-opacity-20 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Compare & Share</h3>
              <p className="text-slate-200">See how your choices compare to other travelers on our global leaderboard.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white bg-opacity-95 backdrop-blur-lg p-8 rounded-2xl shadow-xl max-w-5xl mx-auto">
          {gameState === 'intro' && <GameIntro onStartGame={startGame} />}
          
          {gameState === 'playing' && (
            <GameContainer
              currentScenario={currentScenario}
              totalScenarios={totalScenarios}
              currentScore={currentScore}
              onChoice={handleScenarioChoice}
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
    </section>
  );
};

export default GameSection;
