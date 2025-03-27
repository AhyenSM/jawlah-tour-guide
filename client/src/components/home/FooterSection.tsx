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
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="text-white font-poppins font-bold text-3xl mb-4">
              <span className="text-[#D4AF37]">Jaw</span><span>lah</span>
              <span className="font-amiri text-base ml-1">جولة</span>
            </div>
            <p className="text-slate-300 mb-6">
              Your gateway to immersive tour experiences in Qatar. Launching soon with verified local guides, personalized itineraries, and authentic cultural experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white bg-opacity-10 hover:bg-opacity-20 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="bg-white bg-opacity-10 hover:bg-opacity-20 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="bg-white bg-opacity-10 hover:bg-opacity-20 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="bg-white bg-opacity-10 hover:bg-opacity-20 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-300 hover:text-[#D4AF37] transition-colors">Home</a></li>
              <li><a href="#features" className="text-slate-300 hover:text-[#D4AF37] transition-colors">Features</a></li>
              <li><a href="#game" className="text-slate-300 hover:text-[#D4AF37] transition-colors">Tour Game</a></li>
              <li><a href="#" className="text-slate-300 hover:text-[#D4AF37] transition-colors">About Us</a></li>
              <li><a href="#contact" className="text-slate-300 hover:text-[#D4AF37] transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Stay Updated</h4>
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
                variant="qatarGold" 
                className="w-full"
              >
                Join Waitlist
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white border-opacity-20 pt-8 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Jawlah. All rights reserved. </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
