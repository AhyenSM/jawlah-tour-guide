import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useSurvey } from '@/context/SurveyContext';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';

const HeroSection = () => {
  const { openSurveyModal } = useSurvey();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Welcome to <span class='text-[#D4AF37]'>Jawlah</span>",
      subtitle: "Your gateway to immersive tour experiences in Qatar",
      bgClass: "bg-[url('https://images.unsplash.com/photo-1577102114237-9a16b85a021b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')]",
      action: { 
        text: "Join Early Access", 
        onClick: () => openSurveyModal()
      }
    },
    {
      title: "Experience the <span class='text-[#D4AF37]'>Adventure</span>",
      subtitle: "Play our interactive travel adventure game and discover your travel personality",
      bgClass: "bg-[url('https://images.unsplash.com/photo-1548786811-dd6e453ccca7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')]",
      action: { 
        text: "Play Now", 
        href: "/game"
      }
    },
    {
      title: "Get <span class='text-[#D4AF37]'>Personalized</span> Help",
      subtitle: "Chat with our AI travel assistant and get tailored recommendations",
      bgClass: "bg-[url('https://images.unsplash.com/photo-1519817914152-22d216bb9170?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')]",
      action: { 
        text: "Chat Now", 
        href: "#chatbot"
      }
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            currentSlide === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
          } ${slide.bgClass}`}
        >
          {/* Dark overlay for better text visibility */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container mx-auto px-6 flex flex-col items-center text-white z-10">
              <h1 
                className="font-poppins font-bold text-4xl md:text-6xl text-center mb-4 text-shadow-lg"
                dangerouslySetInnerHTML={{ __html: slide.title }}
              />
              <p className="text-xl md:text-2xl text-center max-w-2xl mb-12 text-shadow-sm">
                {slide.subtitle}
              </p>
              
              {slide.action.href ? (
                <Link href={slide.action.href}>
                  <Button 
                    variant="qatarGold" 
                    size="xl"
                    className="transform hover:scale-105"
                  >
                    {slide.action.text}
                  </Button>
                </Link>
              ) : (
                <Button 
                  variant="qatarGold" 
                  size="xl"
                  onClick={slide.action.onClick}
                  className="transform hover:scale-105"
                >
                  {slide.action.text}
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
      
      {/* Slide indicators */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 w-3 rounded-full transition-all ${
              currentSlide === index ? 'bg-[#D4AF37] w-10' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
      
      {/* Next slide button */}
      <button 
        onClick={nextSlide}
        className="absolute bottom-10 right-10 text-white bg-[#1A365D] bg-opacity-60 p-3 rounded-full hover:bg-opacity-80 transition-all z-20"
      >
        <ChevronRight size={24} />
      </button>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-20 left-0 right-0 text-white opacity-75 animate-pulse flex flex-col items-center z-20">
        <div className="text-sm font-light">Scroll to explore</div>
        <ChevronDown className="mt-2" size={20} />
      </div>
    </section>
  );
};

export default HeroSection;
