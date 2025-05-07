import { makeAutoObservable } from 'mobx';

export type Language = 
  | 'en' // English
  | 'es' // Spanish
  | 'zh' // Chinese
  | 'tl' // Tagalog
  | 'vi' // Vietnamese
  | 'fr' // French
  | 'ar' // Arabic
  | 'ko' // Korean
  | 'ru' // Russian
  | 'de'; // German

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
}

export const languageOptions: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'tl', name: 'Tagalog', nativeName: 'Tagalog' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
];

class LanguageStore {
  currentLanguage: Language = 'en';
  
  constructor() {
    makeAutoObservable(this);
    
    // Load saved language preference from localStorage if available
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && languageOptions.some(option => option.code === savedLanguage)) {
        this.currentLanguage = savedLanguage;
      }
    }
  }
  
  setLanguage(language: Language) {
    this.currentLanguage = language;
    
    // Save language preference to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language);
    }
  }
  
  get currentLanguageOption(): LanguageOption {
    return languageOptions.find(option => option.code === this.currentLanguage) || languageOptions[0];
  }
}

export default new LanguageStore();