// components/Tutorial.tsx
import { useState } from 'react';

interface TutorialProps {
  onClose: () => void;
}

interface TutorialStep {
  title: string;
  content: React.ReactNode;
  image?: string;
}

export default function Tutorial({ onClose }: TutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps: TutorialStep[] = [
    {
      title: "Welcome to M.A.R.C.(LE)!",
      content: (
        <div>
          <p className="mb-4">This tutorial will guide you through how to play the game and understand its features.</p>
          <p>Click "Next" to continue or "Skip" to exit the tutorial at any time.</p>
        </div>
      ),
      image: "/Welcome.png"
    },
    {
      title: "Basic Gameplay",
      content: (
        <div>
          <p className="mb-2">The goal is to guess a 6-letter MARC-Related word in limited attempts.</p>
          <p className="mb-2">Type your guess using the keyboard at the bottom of the screen and press Enter to submit.</p>
          <p>The number of attempts you get depends on your chosen difficulty level.</p>
        </div>
      ),
      image: "/BasicGameplay.png"
    },
    {
      title: "Color Feedback",
      content: (
        <div>
          <div className="mb-4">
            <span className="inline-block w-6 h-6 bg-green-400 mr-2"></span>
            <span><strong>Green</strong>: The letter is correct and in the right position</span>
          </div>
          <div className="mb-4">
            <span className="inline-block w-6 h-6 bg-yellow-400 mr-2"></span>
            <span><strong>Yellow</strong>: The letter is in the word but in the wrong position</span>
          </div>
          <div>
            <span className="inline-block w-6 h-6 bg-gray-700 mr-2"></span>
            <span><strong>Gray</strong>: The letter is not in the word</span>
          </div>
        </div>
      ),
      image: "/ColorFeedback.png"
    },
    {
      title: "Rating System",
      content: (
        <div>
          <p className="mb-4">Each guess is rated based on its strategic value:</p>
          <div className="mb-2">
            <span className="inline-block w-4 h-4 rounded-full bg-gradient-to-br from-green-400 to-green-600 mr-2"></span>
            <span><strong>Green Rating</strong>: Excellent guess</span>
          </div>
          <div className="mb-2">
            <span className="inline-block w-4 h-4 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 mr-2"></span>
            <span><strong>Yellow Rating</strong>: Good guess</span>
          </div>
          <div className="mb-2">
            <span className="inline-block w-4 h-4 rounded-full bg-gradient-to-br from-orange-300 to-orange-500 mr-2"></span>
            <span><strong>Orange Rating</strong>: Decent guess</span>
          </div>
          <div>
            <span className="inline-block w-4 h-4 rounded-full bg-gradient-to-br from-red-400 to-red-600 mr-2"></span>
            <span><strong>Red Rating</strong>: Poor guess</span>
          </div>
        </div>
      ),
      image: "/RatingSystem.png"
    },
    {
      title: "Early Game Strategy (Guesses 1-2)",
      content: (
        <div>
          <p className="mb-2">In the early game, focus on discovering as many letters as possible:</p>
          <ul className="list-disc pl-5 mb-4">
            <li>Use vowels (A, E, I, O, U) - they're highly valued</li>
            <li>Include common consonants (R, S, T, L, N, D)</li>
            <li>Avoid repeating letters to maximize information</li>
          </ul>
          <p>Example: "EDITOR" is a good first guess with 3 vowels and 3 common consonants.</p>
        </div>
      ),
      image: "/EarlyGameStrategy.png"
    },
    {
      title: "Mid Game Strategy (Guesses 3-4)",
      content: (
        <div>
          <p className="mb-2">In the mid game, use the information you've gathered:</p>
          <ul className="list-disc pl-5 mb-4">
            <li>Place green letters (correct position) in the same spots</li>
            <li>Try yellow letters (correct letter, wrong position) in new positions</li>
            <li>Avoid using gray letters (not in the word)</li>
          </ul>
          <p>Your rating will improve if you effectively use the information from previous guesses.</p>
        </div>
      ),
      image: "/MidGameStrategy.png"
    },
    {
      title: "Late Game Strategy (Guesses 5+)",
      content: (
        <div>
          <p className="mb-2">In the late game, focus on finding the exact word:</p>
          <ul className="list-disc pl-5 mb-4">
            <li>Use all known information (green and yellow letters)</li>
            <li>Try different combinations of the letters you know are in the word</li>
            <li>Reusing letters marked as incorrect will lower your score</li>
          </ul>
          <p>The highest ratings go to guesses that make the best use of all available information.</p>
        </div>
      ),
      image: "/LateGameStrategy.png"
    },
    {
      title: "You're Ready to Play!",
      content: (
        <div>
          <p className="mb-4">Now you understand how to play M.A.R.C.(LE) and how your guesses are rated.</p>
          <p className="mb-4">Remember, the goal is to guess the word in as few attempts as possible.</p>
          <p>Good luck and have fun!</p>
        </div>
      ),
      image: "/ReadyToPlay.png"
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">
              {tutorialSteps[currentStep].title}
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white"
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
          
          <div className="text-white mb-6">
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
              >
                Back
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 ml-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Skip
              </button>
            </div>
            <button
              onClick={goToNextStep}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:from-blue-600 hover:to-purple-700"
            >
              {currentStep === tutorialSteps.length - 1 ? 'Finish' : 'Next'}
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
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
