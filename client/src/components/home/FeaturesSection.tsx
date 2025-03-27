import { Button } from '@/components/ui/button';
import { useSurvey } from '@/context/SurveyContext';

const FeaturesSection = () => {
  const { openSurveyModal } = useSurvey();

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="font-poppins font-bold text-3xl md:text-4xl text-center mb-16 text-[#1A365D]">
          Experience Qatar <span className="text-[#D4AF37]">Like Never Before</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center rounded-lg p-6 shadow-lg transition-all hover:shadow-xl">
            <div className="w-16 h-16 rounded-full bg-[#1A365D] text-white flex items-center justify-center mb-6">
              <i className="fas fa-map-marked-alt text-2xl"></i>
            </div>
            <h3 className="font-poppins font-semibold text-xl mb-3 text-[#1A365D]">Personalized Tours</h3>
            <p className="text-slate-600">Discover Qatar with custom itineraries tailored to your interests, pace, and preferences.</p>
          </div>
          
          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center rounded-lg p-6 shadow-lg transition-all hover:shadow-xl">
            <div className="w-16 h-16 rounded-full bg-[#1A365D] text-white flex items-center justify-center mb-6">
              <i className="fas fa-users text-2xl"></i>
            </div>
            <h3 className="font-poppins font-semibold text-xl mb-3 text-[#1A365D]">Local Expertise</h3>
            <p className="text-slate-600">Connect with verified local guides who know Qatar's hidden gems, culture, and history.</p>
          </div>
          
          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center rounded-lg p-6 shadow-lg transition-all hover:shadow-xl">
            <div className="w-16 h-16 rounded-full bg-[#1A365D] text-white flex items-center justify-center mb-6">
              <i className="fas fa-mobile-alt text-2xl"></i>
            </div>
            <h3 className="font-poppins font-semibold text-xl mb-3 text-[#1A365D]">Seamless Experience</h3>
            <p className="text-slate-600">Book, communicate, and experience Qatar tours with our easy-to-use platform and app.</p>
          </div>
        </div>
        
        {/* Survey CTA */}
        <div className="mt-20 p-8 md:p-12 rounded-2xl blue-gradient text-white text-center">
          <h3 className="font-poppins font-bold text-2xl mb-4">Help Shape the Future of Travel in Qatar!</h3>
          <p className="mb-8 text-lg max-w-3xl mx-auto">Take our quick survey to share your travel preferences and get exclusive early access perks when we launch.</p>
          <Button 
            variant="qatarGold" 
            size="xl"
            onClick={openSurveyModal}
            className="transform hover:scale-105"
          >
            Take the Survey
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
