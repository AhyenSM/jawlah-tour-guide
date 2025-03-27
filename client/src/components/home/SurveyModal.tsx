import { Button } from '@/components/ui/button';
import { useSurvey } from '@/context/SurveyContext';
import { JOTFORM_SURVEY_URL } from '@/lib/constants';

const SurveyModal = () => {
  const { isModalOpen, closeSurveyModal } = useSurvey();

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 modal"
        onClick={closeSurveyModal}
      ></div>
      <div className="relative bg-white rounded-xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8">
        <button 
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
          onClick={closeSurveyModal}
        >
          <i className="fas fa-times text-xl"></i>
        </button>
        <div className="text-center mb-6">
          <div className="inline-block p-3 rounded-full bg-[#1A365D] text-white mb-3">
            <i className="fas fa-clipboard-list text-2xl"></i>
          </div>
          <h3 className="font-poppins font-bold text-2xl text-[#1A365D] mb-2">Help Shape Jawlah</h3>
          <p className="text-slate-600">
            Your feedback will directly influence our platform. Complete our survey for exclusive early access benefits!
          </p>
        </div>
        <div className="text-center">
          <p className="mb-6">
            We're redirecting you to our brief survey. It takes less than 5 minutes to complete.
          </p>
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
            <Button 
              variant="secondary" 
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
                variant="qatarBlue" 
                className="w-full"
                onClick={closeSurveyModal}
              >
                Take Survey
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyModal;
