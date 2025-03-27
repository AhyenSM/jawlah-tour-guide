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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#1A365D] shadow-md' : ''}`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <div className="text-white font-poppins font-bold text-2xl cursor-pointer">
              <span className="text-[#D4AF37]">Jaw</span><span>lah</span>
              <span className="font-amiri text-sm ml-1">جولة</span>
            </div>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-white hover:text-[#D4AF37] transition-colors">Features</a>
          <a href="#game" className="text-white hover:text-[#D4AF37] transition-colors">Tour Game</a>
          <a href="#contact" className="text-white hover:text-[#D4AF37] transition-colors">Contact</a>
          <Button 
            variant="qatarGold" 
            onClick={openSurveyModal}
          >
            Join Early Access
          </Button>
        </div>
        <button 
          className="md:hidden text-white text-2xl" 
          onClick={toggleMobileMenu}
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} bg-[#0F172A] bg-opacity-95 absolute w-full py-4`}>
        <div className="container mx-auto px-6 flex flex-col space-y-4">
          <a href="#features" className="text-white hover:text-[#D4AF37] transition-colors py-2">Features</a>
          <a href="#game" className="text-white hover:text-[#D4AF37] transition-colors py-2">Tour Game</a>
          <a href="#contact" className="text-white hover:text-[#D4AF37] transition-colors py-2">Contact</a>
          <Button 
            variant="qatarGold" 
            onClick={openSurveyModal}
            className="w-full"
          >
            Join Early Access
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
