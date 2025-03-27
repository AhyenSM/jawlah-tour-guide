const ChatbotSection = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-poppins font-bold text-3xl text-[#1A365D] mb-4">
                Have <span className="text-[#D4AF37]">Questions?</span>
              </h2>
              <p className="text-slate-600 mb-6">
                Our Jawlah AI assistant can help answer your questions about Qatar travel, our upcoming platform, or anything else you're curious about.
              </p>
              <div className="bg-white rounded-lg p-4 shadow-md border border-slate-200 mb-4">
                <div className="flex items-start mb-4">
                  <div className="bg-[#1A365D] rounded-full p-2 mr-3">
                    <i className="fas fa-robot text-white"></i>
                  </div>
                  <div className="bg-slate-100 rounded-lg p-3 text-slate-700">
                    Hello! I'm the Jawlah assistant. How can I help with your Qatar travel plans today?
                  </div>
                </div>
                <div className="flex items-start mb-4 justify-end">
                  <div className="bg-[#D4AF37] rounded-lg p-3 text-[#1A365D] mr-3">
                    What are the best times of year to visit Qatar?
                  </div>
                  <div className="bg-slate-200 rounded-full p-2">
                    <i className="fas fa-user text-slate-600"></i>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#1A365D] rounded-full p-2 mr-3">
                    <i className="fas fa-robot text-white"></i>
                  </div>
                  <div className="bg-slate-100 rounded-lg p-3 text-slate-700">
                    The best time to visit Qatar is during winter (November to March) when temperatures are mild and pleasant. Summer months (June to August) can be extremely hot, often exceeding 40°C (104°F).
                  </div>
                </div>
              </div>
              <div className="text-sm text-center text-slate-500">
                This is a preview. The full AI chatbot will be available on our platform.
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                alt="AI chatbot assistant on mobile" 
                src="https://images.unsplash.com/photo-1635236570276-64b6b9ae2386?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatbotSection;
