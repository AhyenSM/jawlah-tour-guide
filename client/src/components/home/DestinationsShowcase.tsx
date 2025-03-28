import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DestinationsShowcase = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Qatar-specific images
  const qatarMuseumImage = '/florian-wehde-Do6yoytec5E-unsplash.jpg';
  const qatarTorchTowerImage = '/bashir-mohd-0gSM4u8zfA8-unsplash.jpg';
  const qatarDesertImage = '/abuli-munavary-RsvErh4eirg-unsplash.jpg';
  const qatarCulturalPathImage = '/jaanus-jagomagi-AZJAIiIn6BY-unsplash.jpg';
  
  const destinations = [
    {
      name: "Museum of Islamic Art",
      location: "Doha",
      description: "One of the world's great museums, designed by I.M. Pei, dedicated to collecting, preserving, and displaying Islamic art.",
      image: qatarMuseumImage,
      comingSoon: true
    },
    {
      name: "Torch Tower",
      location: "Aspire Zone, Doha",
      description: "The iconic 300-meter tall skyscraper that housed officials during the 2006 Asian Games and now stands as a luxury hotel with panoramic views of Qatar.",
      image: qatarTorchTowerImage,
      comingSoon: true
    },
    {
      name: "Qatar Desert Safari",
      location: "Various locations across Qatar",
      description: "Experience the thrill of dune bashing, camel riding, and traditional Bedouin hospitality in Qatar's stunning desert landscapes.",
      image: qatarDesertImage,
      comingSoon: true
    },
    {
      name: "Cultural Pathways",
      location: "Throughout Qatar",
      description: "Explore Qatar's rich cultural heritage through carefully curated paths showcasing the country's history, architecture, and traditions.",
      image: qatarCulturalPathImage,
      comingSoon: true
    }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % destinations.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [destinations.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % destinations.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + destinations.length) % destinations.length);
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <h2 className="font-poppins font-bold text-3xl md:text-4xl text-center mb-6 text-[#1A365D]">
          Explore <span className="text-[#D4AF37]">Qatar's Wonders</span>
        </h2>
        <p className="text-center text-slate-600 max-w-3xl mx-auto mb-10">
          From modern architectural marvels to ancient cultural sites, experience the best of Qatar with Jawlah.
        </p>
        
        {/* Vertical Slider */}
        <div className="max-w-6xl mx-auto relative">
          {/* Navigation Buttons */}
          <div className="absolute left-0 right-0 -top-5 flex justify-center z-20">
            <button 
              onClick={prevSlide}
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Previous destination"
            >
              <ChevronUp className="h-5 w-5 text-[#1A365D]" />
            </button>
          </div>
          
          <div className="absolute left-0 right-0 -bottom-5 flex justify-center z-20">
            <button 
              onClick={nextSlide}
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Next destination"
            >
              <ChevronDown className="h-5 w-5 text-[#1A365D]" />
            </button>
          </div>
          
          {/* Destination Carousel */}
          <div className="relative h-[500px] md:h-[600px] overflow-hidden rounded-xl shadow-2xl">
            {destinations.map((destination, index) => (
              <div 
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <div className="h-full relative">
                  <img 
                    alt={destination.name} 
                    src={destination.image} 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                    <div className="bg-black/30 backdrop-blur-sm p-6 md:p-8 rounded-xl max-w-2xl text-white">
                      <h3 className="font-poppins text-2xl md:text-3xl font-bold mb-2 text-shadow">{destination.name}</h3>
                      <p className="text-[#D4AF37] font-medium mb-4">{destination.location}</p>
                      <p className="mb-6 text-white/90 text-shadow-sm">{destination.description}</p>
                      
                      {destination.comingSoon ? (
                        <div className="flex items-center">
                          <div className="bg-white/20 px-4 py-2 rounded-full flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-[#D4AF37]" />
                            <span className="text-sm font-medium">Coming Soon</span>
                          </div>
                        </div>
                      ) : (
                        <Button variant="qatarGold" size="lg">Book Now</Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Indicator Pills */}
          <div className="flex justify-center mt-6 space-x-2">
            {destinations.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === index ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestinationsShowcase;
