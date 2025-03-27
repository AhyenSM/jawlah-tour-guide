const DestinationsShowcase = () => {
  const destinations = [
    {
      name: "Museum of Islamic Art",
      location: "Doha",
      image: "https://images.unsplash.com/photo-1578895101408-1a6279bf5cf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Souq Waqif",
      location: "Traditional Market",
      image: "https://images.unsplash.com/photo-1569323232079-33288785b2fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Desert Safari",
      location: "Inland Sea",
      image: "https://images.unsplash.com/photo-1594396555089-69822263e5c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "The Pearl-Qatar",
      location: "Luxury Island",
      image: "https://images.unsplash.com/photo-1545066838-83eca49d1352?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Culinary Tours",
      location: "Traditional Cuisine",
      image: "https://images.unsplash.com/photo-1541518763069-e9785e919a7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "National Museum",
      location: "Cultural Heritage",
      image: "https://images.unsplash.com/photo-1619261253091-123ca412de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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
