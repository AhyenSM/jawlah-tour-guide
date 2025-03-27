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
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ChatbotSection /> 
      <GameSection />
      <AppAnnouncementBanner />
      <DestinationsShowcase />
      <FooterSection />
      <SurveyModal />
    </div>
  );
};

export default HomePage;
