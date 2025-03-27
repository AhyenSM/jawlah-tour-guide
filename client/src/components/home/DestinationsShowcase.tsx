const DestinationsShowcase = () => {
  const destinations = [
    {
      name: "Museum of Islamic Art",
      location: "Doha",
      image: "https://images.unsplash.com/photo-1565623833408-d77e39b88af6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
    },
    {
      name: "Souq Waqif",
      location: "Traditional Market",
      image: "https://images.unsplash.com/photo-1569949609029-b18a57d2ff86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80"
    },
    {
      name: "Desert Safari",
      location: "Inland Sea",
      image: "https://images.unsplash.com/photo-1548786811-dd6e453ccca7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      name: "The Pearl-Qatar",
      location: "Luxury Island",
      image: "https://images.unsplash.com/photo-1605193420923-1936e220aac2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
    },
    {
      name: "Culinary Tours",
      location: "Traditional Cuisine",
      image: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
    },
    {
      name: "National Museum of Qatar",
      location: "Cultural Heritage",
      image: "https://images.unsplash.com/photo-1577102114237-9a16b85a021b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <h2 className="font-poppins font-bold text-3xl md:text-4xl text-center mb-6 text-[#1A365D]">
          Explore <span className="text-[#D4AF37]">Qatar's Wonders</span>
        </h2>
        <p className="text-center text-slate-600 max-w-3xl mx-auto mb-16">
          From modern architectural marvels to ancient cultural sites, experience the best of Qatar with Jawlah.
        </p>
        
        {/* Destinations grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination, index) => (
            <div key={index} className="rounded-xl overflow-hidden shadow-lg group">
              <div className="relative h-72 overflow-hidden">
                <img 
                  alt={destination.name} 
                  src={destination.image} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="font-poppins text-xl font-bold text-white">{destination.name}</h3>
                  <p className="text-[#D4AF37]">{destination.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsShowcase;
