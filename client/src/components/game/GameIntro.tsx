import { Button } from '@/components/ui/button';
import { Play, MapPin, Star, Trophy } from 'lucide-react';
import { useState, useEffect } from 'react';

interface GameIntroProps {
  onStartGame: () => void;
}

const GameIntro = ({ onStartGame }: GameIntroProps) => {
  const [isButtonAnimated, setIsButtonAnimated] = useState(true);
  
  // Start animation after a delay to get user attention
  useEffect(() => {
    const interval = setInterval(() => {
      setIsButtonAnimated(prev => !prev);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="game-card max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl border border-slate-200 hover:shadow-2xl transition-all">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-8 md:p-10 flex flex-col justify-center relative z-10">
          <div className="inline-block px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-medium mb-4">
            QATAR TOURISM EXPERIENCE
          </div>
          
          <h3 className="font-poppins font-bold text-2xl md:text-3xl mb-4 text-[#1A365D]">Qatar Travel Adventure</h3>
          
          <p className="text-slate-600 mb-6">
            Embark on a virtual journey through Qatar! Navigate cultural experiences, make travel decisions, and discover your travel style.
          </p>
          
          <div className="flex flex-col space-y-4 mb-8">
            <div className="flex items-center">
              <div className="w-7 h-7 rounded-full bg-[#1A365D]/10 flex items-center justify-center mr-3">
                <MapPin className="h-4 w-4 text-[#1A365D]" />
              </div>
              <span className="text-slate-700">Explore Qatar's top attractions</span>
            </div>
            
            <div className="flex items-center">
              <div className="w-7 h-7 rounded-full bg-[#1A365D]/10 flex items-center justify-center mr-3">
                <Star className="h-4 w-4 text-[#1A365D]" />
              </div>
              <span className="text-slate-700">Discover your traveler personality</span>
            </div>
            
            <div className="flex items-center">
              <div className="w-7 h-7 rounded-full bg-[#1A365D]/10 flex items-center justify-center mr-3">
                <Trophy className="h-4 w-4 text-[#1A365D]" />
              </div>
              <span className="text-slate-700">Share your results with friends</span>
            </div>
          </div>
          
          {/* Big Play Button - Mobile/Tablet */}
          <div className="md:hidden flex justify-center">
            <Button 
              variant="qatarGold" 
              size="lg"
              onClick={onStartGame}
              className={`group relative overflow-hidden px-8 py-6 shadow-xl text-lg font-medium rounded-full ${isButtonAnimated ? 'animate-pulse' : ''} hover:scale-105 transition-transform`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-white/30 to-[#D4AF37]/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="flex items-center text-lg font-semibold">
                <Play className="mr-2 h-6 w-6" fill="white" /> PLAY NOW
              </span>
            </Button>
          </div>
          
          {/* Standard Button - Desktop */}
          <div className="hidden md:flex justify-start mt-8">
            <Button 
              variant="qatarGold" 
              size="lg"
              onClick={onStartGame}
              className={`group relative overflow-hidden px-8 py-6 shadow-xl text-lg font-medium ${isButtonAnimated ? 'animate-pulse' : ''} hover:scale-105 transition-transform`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-white/30 to-[#D4AF37]/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="flex items-center text-lg font-semibold">
                <Play className="mr-2 h-6 w-6" fill="white" /> Start Your Journey
              </span>
            </Button>
          </div>
        </div>
        
        <div className="relative h-80 md:h-auto">
          <img 
            alt="Qatar desert adventure" 
            src="https://images.unsplash.com/photo-1591409523839-85d0928cf0c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <div className="text-sm font-light opacity-90">EXPERIENCE</div>
            <div className="text-xl font-bold text-shadow">Qatar like never before</div>
          </div>
          
          {/* Big Play button overlay - Desktop */}
          <div className="hidden md:flex absolute top-0 left-0 w-full h-full items-center justify-center">
            <div 
              className={`w-24 h-24 rounded-full bg-[#D4AF37] flex items-center justify-center shadow-2xl cursor-pointer transform hover:scale-110 transition-transform duration-300 ${isButtonAnimated ? 'animate-pulse' : ''}`}
              onClick={onStartGame}
            >
              <Play className="h-12 w-12 text-white ml-2" fill="white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameIntro;
