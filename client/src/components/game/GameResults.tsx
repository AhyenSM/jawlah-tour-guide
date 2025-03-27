import { Button } from '@/components/ui/button';
import { useSurvey } from '@/context/SurveyContext';

interface GameResultsProps {
  finalScore: number;
  travelerType: string;
  travelerDescription: string;
  onPlayAgain: () => void;
}

const GameResults = ({ 
  finalScore, 
  travelerType, 
  travelerDescription, 
  onPlayAgain 
}: GameResultsProps) => {
  const { openSurveyModal } = useSurvey();

  return (
    <div className="max-w-4xl mx-auto mt-8 rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="bg-[#1A365D] p-6 text-center text-white">
        <h3 className="font-poppins font-bold text-2xl mb-2">Your Jawlah Travel Results</h3>
        <p>Based on your choices throughout the virtual journey</p>
      </div>
      
      <div className="p-8 text-center">
        <div className="mb-6">
          <div className="inline-block rounded-full p-6 mb-4 gold-gradient">
            <i className="fas fa-award text-[#1A365D] text-5xl"></i>
          </div>
          <h4 className="font-poppins font-bold text-2xl text-[#1A365D] mb-2">Your Traveler Score</h4>
          <div className="text-4xl font-bold text-[#D4AF37] mb-2">{finalScore}</div>
          <div className="text-xl font-semibold text-[#1A365D] mb-4">{travelerType}</div>
          <p className="text-slate-600 max-w-2xl mx-auto">
            {travelerDescription}
          </p>
        </div>
        
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Button 
            variant="qatarBlue" 
            size="lg"
            onClick={onPlayAgain}
          >
            <i className="fas fa-redo mr-2"></i> Play Again
          </Button>
          <Button 
            variant="qatarGold" 
            size="lg"
            onClick={openSurveyModal}
          >
            <i className="fas fa-envelope mr-2"></i> Join Early Access
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameResults;
