import { Button } from '@/components/ui/button';
import { useSurvey } from '@/context/SurveyContext';

const HeroSection = () => {
  const { openSurveyModal } = useSurvey();

  return (
    <section className="min-h-screen flex items-center justify-center text-white py-32 bg-hero-pattern">
      <div className="container mx-auto px-6 flex flex-col items-center animate-fadeIn">
        <h1 className="font-poppins font-bold text-4xl md:text-6xl text-center mb-4">
          <span className="text-[#D4AF37]">Jawlah</span> – Coming Soon!
        </h1>
        <p className="text-xl md:text-2xl text-center max-w-2xl mb-12">
          Your gateway to immersive tour experiences in Qatar – Coming Soon!
        </p>
        <Button 
          variant="qatarGold" 
          size="xl"
          onClick={openSurveyModal}
          className="transform hover:scale-105"
        >
          Join Early Access
        </Button>
        <div className="mt-16 text-white opacity-75 animate-pulse flex flex-col items-center">
          <div>Scroll to explore</div>
          <div className="scroll-prompt mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
