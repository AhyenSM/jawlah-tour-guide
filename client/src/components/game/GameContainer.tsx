import { useRef, useEffect } from 'react';
import { gameScenarios } from '@/lib/gameData';

interface GameContainerProps {
  currentScenario: number;
  totalScenarios: number;
  currentScore: number;
  onChoice: (scenarioId: number, choiceId: string, points: number) => void;
}

const GameContainer = ({ 
  currentScenario, 
  totalScenarios, 
  currentScore, 
  onChoice 
}: GameContainerProps) => {
  const progressWidth = `${(currentScenario / totalScenarios) * 100}%`;
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll to top of container when scenario changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentScenario]);
  
  const scenario = gameScenarios[currentScenario - 1];

  return (
    <div 
      ref={containerRef}
      className="game-container max-w-4xl mx-auto mt-8 rounded-2xl shadow-xl border border-slate-200"
    >
      {/* Game Progress Bar */}
      <div className="bg-[#1A365D] p-4 rounded-t-2xl">
        <div className="flex justify-between items-center text-white mb-2">
          <div className="font-semibold">Your Journey Progress</div>
          <div className="text-[#D4AF37] font-bold">
            <span>{currentScenario}</span>/<span>{totalScenarios}</span>
          </div>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2.5">
          <div 
            className="bg-[#D4AF37] h-2.5 rounded-full transition-all duration-500 ease-in-out" 
            style={{ width: progressWidth }}
          ></div>
        </div>
      </div>
      
      {/* Scenario Content */}
      <div className="p-6 md:p-8">
        {/* Current Score Display */}
        <div className="flex justify-end mb-4">
          <div className="scoring-pill px-4 py-1 rounded-full text-[#1A365D] font-semibold flex items-center">
            <i className="fas fa-star mr-2"></i>
            <span>Traveler Score: <span className="font-bold">{currentScore}</span></span>
          </div>
        </div>
        
        {/* Scenario Description */}
        <div id="scenarioContainer">
          <div className="scenario">
            <h3 className="font-poppins font-bold text-xl mb-4 text-[#1A365D]">{scenario.title}</h3>
            <p className="text-slate-600 mb-6">
              {scenario.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scenario.choices.map((choice) => (
                <button 
                  key={choice.id}
                  className="choice-btn bg-white border border-[#1A365D] text-[#1A365D] p-4 rounded-lg text-left hover:bg-blue-50 transition-colors"
                  onClick={() => onChoice(scenario.id, choice.id, choice.points)}
                >
                  <div className="font-semibold mb-1">{choice.text}</div>
                  <div className="text-sm text-slate-600">{choice.description}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameContainer;
