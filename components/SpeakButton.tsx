import { useState, useEffect } from 'react';
import { isSpeechSynthesisSupported, speak, stopSpeaking, languageToSpeechCode } from '../utils/textToSpeech';
import LanguageStore from '../stores/LanguageStore';
import { observer } from 'mobx-react-lite';
import translations from '../translations';

interface SpeakButtonProps {
  text: string;
  className?: string;
}

const SpeakButton = observer(({ text, className = '' }: SpeakButtonProps) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  
  // Check if speech synthesis is supported when component mounts
  useEffect(() => {
    setIsSupported(isSpeechSynthesisSupported());
  }, []);
  
  // If speech synthesis is not supported, don't render the button
  if (!isSupported) {
    return null;
  }
  
  const handleClick = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      const languageCode = LanguageStore.currentLanguage;
      const speechCode = languageToSpeechCode[languageCode] || 'en-US';
      
      const utterance = speak(text, speechCode);
      
      if (utterance) {
        setIsSpeaking(true);
        
        // Reset speaking state when speech ends
        utterance.onend = () => {
          setIsSpeaking(false);
        };
      }
    }
  };
  
  const t = translations[LanguageStore.currentLanguage];
  
  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        isSpeaking ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
      } ${className}`}
      aria-label={isSpeaking ? t.accessibility.stopSpeaking : t.accessibility.speak}
      title={isSpeaking ? t.accessibility.stopSpeaking : t.accessibility.speak}
    >
      {isSpeaking ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      )}
    </button>
  );
});

export default SpeakButton;