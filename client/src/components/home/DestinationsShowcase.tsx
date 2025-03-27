import { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DestinationsShowcase = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const destinations = [
    {
      name: "Museum of Islamic Art",
      location: "Doha",
      description: "One of the world's great museums, designed by I.M. Pei, dedicated to collecting, preserving, and displaying Islamic art.",
      image: "https://images.unsplash.com/photo-1565623833408-d77e39b88af6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
      comingSoon: true
    },
    {
      name: "Souq Waqif",
      location: "Traditional Market, Doha",
      description: "A vibrant marketplace offering traditional Qatari goods, spices, textiles, and authentic cuisine in the heart of Doha.",
      image: "https://images.unsplash.com/photo-1569949609029-b18a57d2ff86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80",
      comingSoon: true
    },
    {
      name: "Khor Al Adaid",
      location: "Inland Sea, Southeastern Qatar",
      description: "Experience the magical Inland Sea where the desert meets the ocean, with breathtaking dunes and traditional Bedouin camps.",
      image: "https://images.unsplash.com/photo-1554709618-762a4a5f6933?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      comingSoon: true
    },
    {
      name: "The Pearl-Qatar",
      location: "Luxury Island, Doha",
      description: "A man-made island spanning nearly four million square meters, featuring luxury shopping, fine dining, and Mediterranean-style marinas.",
      image: "https://images.unsplash.com/photo-1605193420923-1936e220aac2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      comingSoon: true
    },
    {
      name: "Katara Cultural Village",
      location: "Doha",
      description: "A cultural hub showcasing Qatar's traditions and hosting international events, exhibitions, and performances throughout the year.",
      image: "https://images.unsplash.com/photo-1594708053019-5336680bab1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      comingSoon: true
    },
    {
      name: "National Museum of Qatar",
      location: "Doha",
      description: "A stunning museum designed by Jean Nouvel to reflect a desert rose, showcasing Qatar's rich history and culture through immersive exhibits.",
      image: "https://images.unsplash.com/photo-1577102114237-9a16b85a021b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
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
