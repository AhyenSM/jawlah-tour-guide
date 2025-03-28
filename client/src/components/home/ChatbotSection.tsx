import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Globe, Clock, ShieldCheck } from 'lucide-react';

export default function ChatbotSection() {
  useEffect(() => {
    // Load the JotForm embed handler script
    const script = document.createElement('script');
    script.src = 'https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js';
    script.async = true;
    document.body.appendChild(script);

    // Initialize the embed handler when script loads
    script.onload = () => {
      if (window.jotformEmbedHandler) {
        window.jotformEmbedHandler(
          "iframe[id='JotFormIFrame-0195d97660f074838d02adfa0a582fafa120']",
          "https://www.jotform.com"
        );
      }
    };

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <section 
      id="chatbot" 
      className="py-24 relative"
      style={{
        background: "url('/assets/bashir-mohd-0gSM4u8zfA8-unsplash.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0C1D43] bg-opacity-90"></div>
      
      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-12">
          <div className="lg:w-1/2">
            <div className="mb-8">
              <span className="inline-block py-1 px-3 rounded-full text-[#D4AF37] bg-[#D4AF37] bg-opacity-10 text-sm font-medium mb-4">
                AI POWERED ASSISTANT
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight text-shadow">
                Meet <span className="text-[#D4AF37]">Zara</span>, Your Personal Qatar Travel Guide
              </h2>
              <p className="text-lg text-slate-200 mb-6 leading-relaxed text-shadow-sm">
                Have questions about Qatar? Chat with our AI travel assistant and get instant answers
                about destinations, culture, accommodations, and travel tips.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm border border-white border-opacity-20">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37] bg-opacity-20 flex items-center justify-center mr-3">
                    <Globe className="h-4 w-4 text-[#D4AF37]" />
                  </div>
                  <h3 className="font-medium text-white">Local Expertise</h3>
                </div>
                <p className="text-slate-300 text-sm">Detailed insights on Qatar's culture, attractions, and hidden gems.</p>
              </div>
              
              <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm border border-white border-opacity-20">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37] bg-opacity-20 flex items-center justify-center mr-3">
                    <MessageCircle className="h-4 w-4 text-[#D4AF37]" />
                  </div>
                  <h3 className="font-medium text-white">24/7 Assistance</h3>
                </div>
                <p className="text-slate-300 text-sm">Available anytime to answer your questions about Qatar tourism.</p>
              </div>
              
              <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm border border-white border-opacity-20">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37] bg-opacity-20 flex items-center justify-center mr-3">
                    <Clock className="h-4 w-4 text-[#D4AF37]" />
                  </div>
                  <h3 className="font-medium text-white">Real-time Info</h3>
                </div>
                <p className="text-slate-300 text-sm">Updated information on events, weather, and local recommendations.</p>
              </div>
              
              <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm border border-white border-opacity-20">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37] bg-opacity-20 flex items-center justify-center mr-3">
                    <ShieldCheck className="h-4 w-4 text-[#D4AF37]" />
                  </div>
                  <h3 className="font-medium text-white">Travel Safety</h3>
                </div>
                <p className="text-slate-300 text-sm">Important tips on local customs, etiquette, and safety information.</p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <Card className="border-0 rounded-2xl overflow-hidden shadow-2xl">
              <CardContent className="p-0">
                <iframe 
                  id="JotFormIFrame-0195d97660f074838d02adfa0a582fafa120" 
                  title="Zara: Travel Guide Assistant"
                  src="https://agent.jotform.com/0195d97660f074838d02adfa0a582fafa120?embedMode=iframe&background=1&shadow=1"
                  frameBorder="0" 
                  style={{
                    minWidth: '100%',
                    maxWidth: '100%',
                    height: '600px',
                    border: 'none',
                    width: '100%'
                  }}
                  scrolling="no"
                  allow="geolocation; microphone; camera; fullscreen"
                />
              </CardContent>
            </Card>
            <div className="text-center mt-4 bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm border border-white border-opacity-20">
              <p className="text-[#D4AF37] font-medium">
                Zara is still under development, please train Zara through a chat or voice interview.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Add TypeScript declaration for JotForm embed handler
declare global {
  interface Window {
    jotformEmbedHandler: (selector: string, domain: string) => void;
  }
}