// components/Tutorial.tsx
import { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import LanguageStore from '../stores/LanguageStore';
import translations from '../translations';
import SpeakButton from './SpeakButton';

interface TutorialProps {
  onClose: () => void;
}

interface TutorialStep {
  title: string;
  content: React.ReactNode;
  image?: string;
  rawText?: string; // For text-to-speech
}

const Tutorial = observer(({ onClose }: TutorialProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Get translations based on current language
  const t = translations[LanguageStore.currentLanguage];
  
  // Generate tutorial steps based on current language
  const tutorialSteps: TutorialStep[] = [
    {
      title: t.tutorial.welcome.title,
      content: (
        <div>
          {t.tutorial.welcome.content.map((paragraph, index) => (
            <p key={index} className={index < t.tutorial.welcome.content.length - 1 ? "mb-4" : ""}>
              {paragraph}
            </p>
          ))}
        </div>
      ),
      image: "/Welcome.png",
      rawText: t.tutorial.welcome.content.join(' ')
    },
    {
      title: t.tutorial.basicGameplay.title,
      content: (
        <div>
          {t.tutorial.basicGameplay.content.map((paragraph, index) => (
            <p key={index} className={index < t.tutorial.basicGameplay.content.length - 1 ? "mb-2" : ""}>
              {paragraph}
            </p>
          ))}
        </div>
      ),
      image: "/BasicGameplay.png",
      rawText: t.tutorial.basicGameplay.content.join(' ')
    },
    {
      title: t.tutorial.colorFeedback.title,
      content: (
        <div>
          <div className="mb-4">
            <span className="inline-block w-6 h-6 bg-green-400 mr-2"></span>
            <span><strong>Green</strong>: {t.tutorial.colorFeedback.green.split(':')[1]}</span>
          </div>
          <div className="mb-4">
            <span className="inline-block w-6 h-6 bg-yellow-400 mr-2"></span>
            <span><strong>Yellow</strong>: {t.tutorial.colorFeedback.yellow.split(':')[1]}</span>
          </div>
          <div>
            <span className="inline-block w-6 h-6 bg-gray-700 mr-2"></span>
            <span><strong>Gray</strong>: {t.tutorial.colorFeedback.gray.split(':')[1]}</span>
          </div>
        </div>
      ),
      image: "/ColorFeedback.png",
      rawText: `${t.tutorial.colorFeedback.green} ${t.tutorial.colorFeedback.yellow} ${t.tutorial.colorFeedback.gray}`
    },
    {
      title: t.tutorial.ratingSystem.title,
      content: (
        <div>
          <p className="mb-4">{t.tutorial.ratingSystem.content}</p>
          <div className="mb-2">
            <span className="inline-block w-4 h-4 rounded-full bg-gradient-to-br from-green-400 to-green-600 mr-2"></span>
            <span><strong>{t.tutorial.ratingSystem.green.split(':')[0]}</strong>: {t.tutorial.ratingSystem.green.split(':')[1]}</span>
          </div>
          <div className="mb-2">
            <span className="inline-block w-4 h-4 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 mr-2"></span>
            <span><strong>{t.tutorial.ratingSystem.yellow.split(':')[0]}</strong>: {t.tutorial.ratingSystem.yellow.split(':')[1]}</span>
          </div>
          <div className="mb-2">
            <span className="inline-block w-4 h-4 rounded-full bg-gradient-to-br from-orange-300 to-orange-500 mr-2"></span>
            <span><strong>{t.tutorial.ratingSystem.orange.split(':')[0]}</strong>: {t.tutorial.ratingSystem.orange.split(':')[1]}</span>
          </div>
          <div>
            <span className="inline-block w-4 h-4 rounded-full bg-gradient-to-br from-red-400 to-red-600 mr-2"></span>
            <span><strong>{t.tutorial.ratingSystem.red.split(':')[0]}</strong>: {t.tutorial.ratingSystem.red.split(':')[1]}</span>
          </div>
        </div>
      ),
      image: "/RatingSystem.png",
      rawText: `${t.tutorial.ratingSystem.content} ${t.tutorial.ratingSystem.green} ${t.tutorial.ratingSystem.yellow} ${t.tutorial.ratingSystem.orange} ${t.tutorial.ratingSystem.red}`
    },
    {
      title: t.tutorial.earlyGameStrategy.title,
      content: (
        <div>
          <p className="mb-2">{t.tutorial.earlyGameStrategy.intro}</p>
          <ul className="list-disc pl-5 mb-4">
            {t.tutorial.earlyGameStrategy.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
          <p>{t.tutorial.earlyGameStrategy.example}</p>
        </div>
      ),
      image: "/EarlyGameStrategy.png",
      rawText: `${t.tutorial.earlyGameStrategy.intro} ${t.tutorial.earlyGameStrategy.tips.join('. ')}. ${t.tutorial.earlyGameStrategy.example}`
    },
    {
      title: t.tutorial.midGameStrategy.title,
      content: (
        <div>
          <p className="mb-2">{t.tutorial.midGameStrategy.intro}</p>
          <ul className="list-disc pl-5 mb-4">
            {t.tutorial.midGameStrategy.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
          <p>{t.tutorial.midGameStrategy.conclusion}</p>
        </div>
      ),
      image: "/MidGameStrategy.png",
      rawText: `${t.tutorial.midGameStrategy.intro} ${t.tutorial.midGameStrategy.tips.join('. ')}. ${t.tutorial.midGameStrategy.conclusion}`
    },
    {
      title: t.tutorial.lateGameStrategy.title,
      content: (
        <div>
          <p className="mb-2">{t.tutorial.lateGameStrategy.intro}</p>
          <ul className="list-disc pl-5 mb-4">
            {t.tutorial.lateGameStrategy.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
          <p>{t.tutorial.lateGameStrategy.conclusion}</p>
        </div>
      ),
      image: "/LateGameStrategy.png",
      rawText: `${t.tutorial.lateGameStrategy.intro} ${t.tutorial.lateGameStrategy.tips.join('. ')}. ${t.tutorial.lateGameStrategy.conclusion}`
    },
    {
      title: t.tutorial.readyToPlay.title,
      content: (
        <div>
          {t.tutorial.readyToPlay.content.map((paragraph, index) => (
            <p key={index} className={index < t.tutorial.readyToPlay.content.length - 1 ? "mb-4" : ""}>
              {paragraph}
            </p>
          ))}
        </div>
      ),
      image: "/ReadyToPlay.png",
      rawText: t.tutorial.readyToPlay.content.join(' ')
    }
  ];

  const goToNextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Get the text to be read aloud for the current step
  const getCurrentStepText = (): string => {
    const step = tutorialSteps[currentStep];
    let text = `${step.title}. `;
    
    if (step.rawText) {
      text += step.rawText;
    }
    
    return text;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold text-white mr-2">
                {tutorialSteps[currentStep].title}
              </h2>
              <SpeakButton 
                text={getCurrentStepText()} 
                className="ml-2"
              />
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white"
              aria-label="Close tutorial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {tutorialSteps[currentStep].image && (
            <div className="mb-4 flex justify-center">
              <img 
                src={tutorialSteps[currentStep].image} 
                alt={`Tutorial step ${currentStep + 1}`}
                className="rounded-lg max-h-64 object-contain"
              />
            </div>
          )}
          
          <div className="text-white mb-6" ref={contentRef}>
            {tutorialSteps[currentStep].content}
          </div>
          
          <div className="flex justify-between">
            <div>
              <button
                onClick={goToPreviousStep}
                disabled={currentStep === 0}
                className={`px-4 py-2 rounded-md ${
                  currentStep === 0 
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
                aria-label="Go to previous step"
              >
                {t.tutorial.buttons.back}
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 ml-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                aria-label="Skip tutorial"
              >
                {t.tutorial.buttons.skip}
              </button>
            </div>
            <button
              onClick={goToNextStep}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:from-blue-600 hover:to-purple-700"
              aria-label={currentStep === tutorialSteps.length - 1 ? "Finish tutorial" : "Go to next step"}
            >
              {currentStep === tutorialSteps.length - 1 ? t.tutorial.buttons.finish : t.tutorial.buttons.next}
            </button>
          </div>
          
          <div className="mt-4 flex justify-center">
            <div className="flex space-x-2">
              {tutorialSteps.map((_, index) => (
                <div 
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    index === currentStep ? 'bg-blue-500' : 'bg-gray-600'
                  }`}
                  role="presentation"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Tutorial;