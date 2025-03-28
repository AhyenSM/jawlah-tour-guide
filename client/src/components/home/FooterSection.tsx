import { Button } from '@/components/ui/button';
import { useState } from 'react';

const FooterSection = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store the email in local storage for later access
    if (email) {
      localStorage.setItem('jawlah_waitlist_email', email);
      setEmail('');
      alert('Thank you for joining our waitlist! We\'ll keep you updated on our launch.');
    }
  };

  return (
    <footer id="contact" className="bg-[#1A365D] text-white pt-20 pb-10">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="text-white font-bold text-3xl mb-4 flex items-center">
              <span className="text-[#D4AF37]">Jaw</span><span>lah</span>
              <span className="font-serif text-base ml-1 text-[#D4AF37]">جولة</span>
            </div>
            <p className="text-slate-300 mb-6">
              Your gateway to immersive tour experiences in Qatar. Launching soon with verified local guides, personalized itineraries, and authentic cultural experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white bg-opacity-10 hover:bg-opacity-20 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3c-2.444 0-2.75.01-3.71.054-.959.044-1.613.196-2.185.419A4.412 4.412 0 004.51 4.51a4.412 4.412 0 00-1.037 1.595c-.223.572-.375 1.226-.419 2.184C3.01 9.25 3 9.556 3 12s.01 2.75.054 3.71c.044.959.196 1.613.419 2.185.23.562.537 1.04.996 1.46a4.412 4.412 0 001.596 1.037c.572.223 1.226.375 2.184.419.96.044 1.267.054 3.71.054s2.75-.01 3.71-.054c.959-.044 1.613-.196 2.185-.419a4.412 4.412 0 001.595-1.037c.46-.42.766-.898.997-1.46.223-.572.375-1.226.419-2.184.044-.96.054-1.267.054-3.71s-.01-2.75-.054-3.71c-.044-.959-.196-1.613-.419-2.185A4.412 4.412 0 0019.49 4.51a4.412 4.412 0 00-1.595-1.037c-.572-.223-1.226-.375-2.184-.419C14.75 3.01 14.444 3 12 3z" />
                  <circle cx="12" cy="12" r="3" />
                  <circle cx="17" cy="7" r="1" />
                </svg>
              </a>
              <a href="#" className="bg-white bg-opacity-10 hover:bg-opacity-20 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753C20.18 7.773 21.692 5.25 22 4.009z" />
                </svg>
              </a>
              <a href="#" className="bg-white bg-opacity-10 hover:bg-opacity-20 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.896 4H5.104C4.494 4 4 4.494 4.001 5.104v13.793C4.001 19.506 4.494 20 5.104 20h13.793c.609 0 1.103-.494 1.103-1.103V5.104C20 4.494 19.506 4 18.896 4zM8.5 10v4m0-4v.5a3.5 3.5 0 1 0 7 0V10M12 14v-4" />
                </svg>
              </a>
              <a href="#" className="bg-white bg-opacity-10 hover:bg-opacity-20 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4 text-[#D4AF37]">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-300 hover:text-[#D4AF37] transition-colors block">Home</a></li>
              <li><a href="#features" className="text-slate-300 hover:text-[#D4AF37] transition-colors block">Features</a></li>
              <li><a href="#chatbot" className="text-slate-300 hover:text-[#D4AF37] transition-colors block">AI Assistant</a></li>
              <li><a href="#game" className="text-slate-300 hover:text-[#D4AF37] transition-colors block">Tour Game</a></li>
              <li><a href="#destinations" className="text-slate-300 hover:text-[#D4AF37] transition-colors block">Destinations</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4 text-[#D4AF37]">Stay Updated</h4>
            <p className="text-slate-300 mb-4">
              Join our early access list to be the first to know when we launch.
            </p>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div>
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full px-4 py-3 rounded-md bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-[#D4AF37] hover:bg-[#B89A2F] text-[#1A365D] font-semibold"
              >
                Join Waitlist
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white border-opacity-20 pt-8 flex justify-between items-center flex-wrap">
          <p className="text-slate-400 text-sm">&copy; {new Date().getFullYear()} Jawlah. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-slate-400 hover:text-white text-sm">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-white text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
