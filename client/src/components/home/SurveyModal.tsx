import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useSurvey } from '@/context/SurveyContext';
import { JOTFORM_SURVEY_URL } from '@/lib/constants';
import { X, ClipboardList, Award, PenTool } from 'lucide-react';

const SurveyModal = () => {
  const { isModalOpen, closeSurveyModal } = useSurvey();

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn">
      {/* Backdrop with blur effect */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={closeSurveyModal}
      ></div>
      
      {/* Modal container */}
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Background pattern */}
        <div className="absolute top-0 right-0 w-full h-48 bg-[#1A365D] opacity-10 
                      bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]">
        </div>
        
        {/* Content area */}
        <div className="relative z-10 p-6 md:p-8">
          {/* Close button */}
          <button 
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={closeSurveyModal}
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-3 rounded-full bg-[#1A365D] text-white mb-4">
              <ClipboardList className="h-6 w-6" />
            </div>
            <div className="text-[#D4AF37] font-bold text-lg mb-2">
              ✦ Your Opinion Matters ✦
            </div>
            <h3 className="font-bold text-2xl md:text-3xl text-[#1A365D] dark:text-[#D4AF37] mb-3">Help Shape Jawlah</h3>
            <p className="text-slate-800 dark:text-white text-lg max-w-md mx-auto font-medium">
              Your feedback will directly influence our platform and Qatar's tourism experience.
            </p>
          </div>
          
          {/* Benefits */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 mb-6">
            <h4 className="font-bold text-lg text-[#1A365D] dark:text-white mb-3">Survey Benefits:</h4>
            <ul className="space-y-2.5">
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mt-0.5 mr-2">
                  <Award className="h-3 w-3 text-[#D4AF37]" />
                </div>
                <span className="text-base font-medium text-slate-800 dark:text-white">Exclusive early access to Jawlah features</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mt-0.5 mr-2">
                  <PenTool className="h-3 w-3 text-[#D4AF37]" />
                </div>
                <span className="text-base font-medium text-slate-800 dark:text-white">Help design the future of Qatar tourism</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mt-0.5 mr-2">
                  <Award className="h-3 w-3 text-[#D4AF37]" />
                </div>
                <span className="text-base font-medium text-slate-800 dark:text-white">Special discount code for future Jawlah services</span>
              </li>
            </ul>
          </div>
          
          {/* Action buttons */}
          <div className="text-center">
            <p className="mb-6 text-md font-medium text-slate-800 dark:text-white">
              The survey takes less than 5 minutes to complete.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={closeSurveyModal}
              >
                Not Now
              </Button>
              <a 
                href={JOTFORM_SURVEY_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button 
                  className="w-full bg-[#1A365D] hover:bg-[#122A4A] text-white py-6 text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all" 
                  onClick={closeSurveyModal}
                >
                  Take Survey
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyModal;
