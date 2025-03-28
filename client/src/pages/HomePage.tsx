import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import DestinationsShowcase from '@/components/home/DestinationsShowcase';
import GameSection from '@/components/home/GameSection';
import AppAnnouncementBanner from '@/components/home/AppAnnouncementBanner';
import ChatbotSection from '@/components/home/ChatbotSection';
import FooterSection from '@/components/home/FooterSection';
import SurveyModal from '@/components/home/SurveyModal';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Full-width sections */}
      <main className="flex-grow">
        <HeroSection />
        
        <div id="features" className="section-container py-16">
          <FeaturesSection />
        </div>
        
        <div id="chatbot" className="bg-gray-50 dark:bg-gray-900 py-16">
          <div className="section-container">
            <ChatbotSection />
          </div>
        </div>
        
        <div id="game" className="section-container py-16">
          <GameSection />
        </div>
        
        <AppAnnouncementBanner />
        
        <div id="destinations" className="bg-gray-50 dark:bg-gray-900 py-16">
          <div className="section-container">
            <DestinationsShowcase />
          </div>
        </div>
        
        <FooterSection />
      </main>
      
      <SurveyModal />
    </div>
  );
};

export default HomePage;
