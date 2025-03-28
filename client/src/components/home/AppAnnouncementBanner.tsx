const AppAnnouncementBanner = () => {
  return (
    <section className="py-16 bg-[#1A365D] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full opacity-10">
        <img 
          alt="Qatar skyline pattern" 
          src="https://images.unsplash.com/photo-1559339943-bef607c78b14?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-white mb-6">
            <span className="text-[#D4AF37]">Launching Soon</span> on All Platforms
          </h2>
          <p className="text-white text-xl max-w-2xl mx-auto mb-10">
            Jawlah will be available on iOS, Android, and Web. Stay tuned for our official launch!
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-white bg-opacity-10 rounded-xl p-4 flex items-center backdrop-blur-sm hover:bg-opacity-20 transition-all cursor-pointer">
              <i className="fab fa-apple text-4xl text-white mr-3"></i>
              <div className="text-left">
                <div className="text-white text-xs">Download on the</div>
                <div className="text-white font-semibold text-lg">App Store</div>
              </div>
            </div>
            <div className="bg-white bg-opacity-10 rounded-xl p-4 flex items-center backdrop-blur-sm hover:bg-opacity-20 transition-all cursor-pointer">
              <i className="fab fa-google-play text-4xl text-white mr-3"></i>
              <div className="text-left">
                <div className="text-white text-xs">GET IT ON</div>
                <div className="text-white font-semibold text-lg">Google Play</div>
              </div>
            </div>
            <div className="bg-white bg-opacity-10 rounded-xl p-4 flex items-center backdrop-blur-sm hover:bg-opacity-20 transition-all cursor-pointer">
              <i className="fas fa-globe text-4xl text-white mr-3"></i>
              <div className="text-left">
                <div className="text-white text-xs">ACCESS ON</div>
                <div className="text-white font-semibold text-lg">Web Browser</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppAnnouncementBanner;
