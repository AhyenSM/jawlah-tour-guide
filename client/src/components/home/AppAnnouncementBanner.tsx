import { useSurvey } from '@/context/SurveyContext';
import { Button } from '@/components/ui/button';
import { ClipboardList } from 'lucide-react';

const AppAnnouncementBanner = () => {
  const { openSurveyModal } = useSurvey();
  
  return (
    <section className="py-16 bg-[#1A365D] relative overflow-hidden">
      {/* Background image */}
      <div className="absolute top-0 right-0 w-full h-full opacity-10">
        <img 
          alt="Qatar skyline pattern" 
          src="https://images.unsplash.com/photo-1559339943-bef607c78b14?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center">
          {/* Survey info */}
          <div className="bg-white rounded-2xl p-8 max-w-3xl mx-auto mb-12 shadow-xl">
            <div className="inline-block p-3 rounded-full bg-[#1A365D] text-white mb-4">
              <ClipboardList className="h-6 w-6" />
            </div>
            
            <h3 className="font-bold text-2xl md:text-3xl text-[#1A365D] mb-3">
              Help Shape the Future of Travel in Qatar!
            </h3>
            
            <div className="bg-slate-100 border-l-4 border-[#1A365D] p-4 rounded mb-6">
              <p className="text-black font-bold text-lg mb-2">
                Take our quick survey to share your travel preferences and get exclusive early access perks when we launch.
              </p>
            </div>
            
            <div className="bg-[#D4AF37] text-black p-3 rounded-lg font-bold text-xl mb-6">
              ✦ Your Opinion Matters ✦
            </div>
            
            <Button 
              onClick={openSurveyModal}
              className="bg-[#D4AF37] hover:bg-[#C69C22] text-black px-10 py-7 text-2xl font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all border-2 border-black"
            >
              Take the Survey
            </Button>
          </div>
          
          {/* Platforms section */}
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-white mb-6">
            <span className="text-[#D4AF37]">Launching Soon</span> on All Platforms
          </h2>
          
          <p className="text-white text-xl max-w-2xl mx-auto mb-10">
            Jawlah will be available on iOS, Android, and Web. Stay tuned for our official launch!
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-white bg-opacity-10 rounded-xl p-4 flex items-center backdrop-blur-sm hover:bg-opacity-20 transition-all cursor-pointer">
              <i className="fab fa-apple text-4xl text-white mr-3"></i>
              <div className="text-left">
                <div className="text-white text-xs">Download on the</div>
                <div className="text-white font-semibold text-lg">App Store</div>
              </div>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-xl p-4 flex items-center backdrop-blur-sm hover:bg-opacity-20 transition-all cursor-pointer">
              <i className="fab fa-google-play text-4xl text-white mr-3"></i>
              <div className="text-left">
                <div className="text-white text-xs">GET IT ON</div>
                <div className="text-white font-semibold text-lg">Google Play</div>
              </div>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-xl p-4 flex items-center backdrop-blur-sm hover:bg-opacity-20 transition-all cursor-pointer">
              <i className="fas fa-globe text-4xl text-white mr-3"></i>
              <div className="text-left">
                <div className="text-white text-xs">ACCESS ON</div>
                <div className="text-white font-semibold text-lg">Web Browser</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppAnnouncementBanner;
