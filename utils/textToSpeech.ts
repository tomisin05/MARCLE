/**
 * Utility functions for text-to-speech functionality
 */

// Check if the browser supports speech synthesis
export const isSpeechSynthesisSupported = (): boolean => {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
};

// Get available voices for the specified language
export const getVoicesForLanguage = (languageCode: string): SpeechSynthesisVoice[] => {
  if (!isSpeechSynthesisSupported()) {
    return [];
  }
  
  // Get all available voices
  const voices = window.speechSynthesis.getVoices();
  
  // Filter voices by language code (e.g., 'en', 'es', etc.)
  return voices.filter(voice => voice.lang.startsWith(languageCode));
};

// Speak the provided text
export const speak = (text: string, languageCode: string = 'en-US'): SpeechSynthesisUtterance | null => {
  if (!isSpeechSynthesisSupported()) {
    console.warn('Speech synthesis is not supported in this browser');
    return null;
  }
  
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  
  // Create a new utterance
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Get voices for the specified language
  const voices = getVoicesForLanguage(languageCode.split('-')[0]);
  
  // Set the voice if available, otherwise use the default voice
  if (voices.length > 0) {
    utterance.voice = voices[0];
  }
  
  // Set the language
  utterance.lang = languageCode;
  
  // Speak the text
  window.speechSynthesis.speak(utterance);
  
  return utterance;
};

// Stop speaking
export const stopSpeaking = (): void => {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel();
  }
};

// Language code mapping for text-to-speech
export const languageToSpeechCode: Record<string, string> = {
  en: 'en-US',
  es: 'es-ES',
  zh: 'zh-CN',
  tl: 'fil-PH', // Tagalog
  vi: 'vi-VN',
  fr: 'fr-FR',
  ar: 'ar-SA',
  ko: 'ko-KR',
  ru: 'ru-RU',
  de: 'de-DE'
};