import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSurvey } from '@/context/SurveyContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, Trophy, Redo } from 'lucide-react';
import Leaderboard from './Leaderboard';

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
  const [activeTab, setActiveTab] = useState('results');

  return (
    <div className="max-w-4xl mx-auto mt-8 rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="bg-[#1A365D] p-6 text-center text-white">
        <h3 className="font-poppins font-bold text-2xl mb-2">Your Jawlah Travel Results</h3>
        <p>Based on your choices throughout the virtual journey</p>
      </div>
      
      <Tabs 
        defaultValue="results" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="px-6 pt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="results" className="flex items-center">
              <Award className="h-4 w-4 mr-2" /> Your Results
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center">
              <Trophy className="h-4 w-4 mr-2" /> Leaderboard
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="results" className="p-6 text-center">
          <div className="mb-6">
            <div className="inline-block rounded-full p-6 mb-4 gold-gradient">
              <Award className="h-12 w-12 text-[#1A365D]" />
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
              variant="outline" 
              size="lg"
              onClick={onPlayAgain}
              className="flex items-center justify-center"
            >
              <Redo className="h-5 w-5 mr-2" /> Play Again
            </Button>
            <Button 
              variant="default"
              size="lg"
              onClick={openSurveyModal}
              className="bg-[#D4AF37] hover:bg-[#C0972F] flex items-center justify-center"
            >
              Join Early Access
            </Button>
          </div>
          
          <div className="mt-8">
            <Button 
              variant="link"
              onClick={() => setActiveTab('leaderboard')}
              className="text-[#1A365D]"
            >
              See how you compare on the leaderboard &rarr;
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="p-6">
          <div className="mb-6 text-center">
            <h4 className="font-poppins font-bold text-xl text-[#1A365D] mb-2">How do you compare?</h4>
            <p className="text-slate-600 max-w-2xl mx-auto mb-6">
              Your score: <span className="font-bold text-[#D4AF37]">{finalScore}</span> points as a <span className="font-semibold">{travelerType}</span>
            </p>
          </div>
          
          <Leaderboard />
          
          <div className="mt-8 text-center">
            <Button 
              variant="outline"
              onClick={onPlayAgain}
              className="flex items-center justify-center mx-auto"
            >
              <Redo className="h-5 w-5 mr-2" /> Play Again
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GameResults;
