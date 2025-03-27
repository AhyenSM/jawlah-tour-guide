import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSurvey } from '@/context/SurveyContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, Share2, Redo, Facebook, Twitter, Linkedin, Instagram, Camera } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import html2canvas from 'html2canvas';

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
  const resultCardRef = useRef<HTMLDivElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  // Message to share on social media
  const shareMessage = `I just completed the Jawlah Qatar Travel Quiz! My travel personality is "${travelerType}" with a score of ${finalScore}. Discover yours at jawlah.replit.app #JawlahQatar #TravelQuiz`;
  
  // URLs for social sharing
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareMessage)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(window.location.href)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=My%20Jawlah%20Qatar%20Travel%20Results&summary=${encodeURIComponent(shareMessage)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareMessage + ' ' + window.location.href)}`
  };

  const captureResultCard = async () => {
    if (!resultCardRef.current) return;
    
    try {
      setIsCapturing(true);
      const canvas = await html2canvas(resultCardRef.current);
      const imageUrl = canvas.toDataURL('image/png');
      
      // Create a temporary link element to download the image
      const a = document.createElement('a');
      a.href = imageUrl;
      a.download = `jawlah-travel-results-${travelerType.toLowerCase().replace(/\s+/g, '-')}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to capture result card:', error);
    } finally {
      setIsCapturing(false);
    }
  };

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
            <TabsTrigger value="share" className="flex items-center">
              <Share2 className="h-4 w-4 mr-2" /> Share Results
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="results" className="p-6 text-center">
          <div ref={resultCardRef} className="mb-6 p-6 bg-white rounded-xl">
            <div className="inline-block rounded-full p-6 mb-4 gold-gradient">
              <Award className="h-12 w-12 text-[#1A365D]" />
            </div>
            <h4 className="font-poppins font-bold text-2xl text-[#1A365D] mb-2">Your Traveler Score</h4>
            <div className="text-4xl font-bold text-[#D4AF37] mb-2">{finalScore}</div>
            <div className="text-xl font-semibold text-[#1A365D] mb-4">{travelerType}</div>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {travelerDescription}
            </p>
            <div className="mt-4 text-xs text-slate-400">jawlah.replit.app</div>
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
              onClick={() => setActiveTab('share')}
              className="text-[#1A365D]"
            >
              Share your results with friends &rarr;
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="share" className="p-6">
          <div className="mb-6 text-center">
            <h4 className="font-poppins font-bold text-xl text-[#1A365D] mb-2">Share Your Qatar Travel Personality</h4>
            <p className="text-slate-600 max-w-2xl mx-auto mb-6">
              You scored <span className="font-bold text-[#D4AF37]">{finalScore}</span> points as a <span className="font-semibold">{travelerType}</span>
            </p>
          </div>
          
          {/* Screenshot download button */}
          <div className="mb-8 flex justify-center">
            <Button 
              variant="outline" 
              size="lg" 
              onClick={captureResultCard}
              disabled={isCapturing}
              className="flex items-center justify-center"
            >
              <Camera className="h-5 w-5 mr-2" />
              {isCapturing ? 'Capturing...' : 'Download as Image'}
            </Button>
          </div>
          
          {/* Social share buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
            <a 
              href={shareUrls.facebook} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors"
            >
              <Facebook className="h-8 w-8 text-[#1877F2]" />
              <span className="text-sm font-medium">Facebook</span>
            </a>
            
            <a 
              href={shareUrls.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              <Twitter className="h-8 w-8 text-[#1DA1F2]" />
              <span className="text-sm font-medium">Twitter</span>
            </a>
            
            <a 
              href={shareUrls.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              <Linkedin className="h-8 w-8 text-[#0A66C2]" />
              <span className="text-sm font-medium">LinkedIn</span>
            </a>
            
            <a 
              href={shareUrls.whatsapp} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors"
            >
              <FaWhatsapp className="h-8 w-8 text-[#25D366]" />
              <span className="text-sm font-medium">WhatsApp</span>
            </a>
          </div>
          
          {/* Copy to clipboard box */}
          <div className="bg-slate-50 p-4 rounded-lg mb-8 max-w-2xl mx-auto">
            <div className="text-sm mb-2 font-medium text-[#1A365D]">Or copy this message:</div>
            <div className="p-3 bg-white rounded border border-slate-200 text-sm">
              {shareMessage}
            </div>
          </div>
          
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
