import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useSurvey } from '@/context/SurveyContext';
import { Link } from 'wouter';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openSurveyModal } = useSurvey();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#1A365D] shadow-md' : 'bg-[#1A365D]/80 backdrop-blur-md'}`}>
      <div className="section-container py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <div className="text-white font-bold text-2xl cursor-pointer flex items-center">
              <span className="text-[#D4AF37]">Jaw</span><span>lah</span>
              <span className="font-serif text-sm ml-1 text-[#D4AF37]">جولة</span>
            </div>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-white hover:text-[#D4AF37] transition-colors font-medium">Features</a>
          <a href="#chatbot" className="text-white hover:text-[#D4AF37] transition-colors font-medium">AI Assistant</a>
          <a href="#game" className="text-white hover:text-[#D4AF37] transition-colors font-medium">Tour Game</a>
          <a href="#destinations" className="text-white hover:text-[#D4AF37] transition-colors font-medium">Destinations</a>
          <Button 
            className="bg-[#D4AF37] hover:bg-[#B89A2F] text-[#1A365D] font-semibold"
            onClick={openSurveyModal}
          >
            Join Early Access
          </Button>
        </div>
        <button 
          className="md:hidden text-white focus:outline-none" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} bg-[#1A365D] bg-opacity-98 backdrop-blur-md absolute w-full py-4 shadow-lg`}>
        <div className="section-container flex flex-col space-y-4">
          <a href="#features" className="text-white hover:text-[#D4AF37] transition-colors py-2 border-b border-[#2A436D] pb-2">Features</a>
          <a href="#chatbot" className="text-white hover:text-[#D4AF37] transition-colors py-2 border-b border-[#2A436D] pb-2">AI Assistant</a>
          <a href="#game" className="text-white hover:text-[#D4AF37] transition-colors py-2 border-b border-[#2A436D] pb-2">Tour Game</a>
          <a href="#destinations" className="text-white hover:text-[#D4AF37] transition-colors py-2 border-b border-[#2A436D] pb-2">Destinations</a>
          <Button 
            className="w-full bg-[#D4AF37] hover:bg-[#B89A2F] text-[#1A365D] font-semibold"
            onClick={openSurveyModal}
          >
            Join Early Access
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
