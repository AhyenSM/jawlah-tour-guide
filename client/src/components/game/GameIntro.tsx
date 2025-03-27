import { Button } from '@/components/ui/button';

interface GameIntroProps {
  onStartGame: () => void;
}

const GameIntro = ({ onStartGame }: GameIntroProps) => {
  return (
    <div className="game-card max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl border border-slate-200 hover:shadow-2xl transition-all">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <h3 className="font-poppins font-bold text-2xl mb-4 text-[#1A365D]">Qatar Travel Adventure</h3>
          <p className="text-slate-600 mb-6">
            Embark on a virtual journey through Qatar! Navigate cultural experiences, make travel decisions, and discover your travel style.
          </p>
          <Button 
            variant="qatarBlue" 
            onClick={onStartGame}
            className="w-full md:w-auto"
          >
            Start Your Journey
          </Button>
        </div>
        <div className="relative h-64 md:h-auto">
          <img 
            alt="Qatar skyline" 
            src="https://images.unsplash.com/photo-1549060146-87d3ad4c1a36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg">
            <i className="fas fa-gamepad text-[#D4AF37] text-2xl"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameIntro;
