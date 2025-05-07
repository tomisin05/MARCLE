import { observer } from 'mobx-react-lite';
import LanguageStore, { languageOptions } from '../stores/LanguageStore';

interface LanguageSelectorProps {
  className?: string;
}

const LanguageSelector = observer(({ className = '' }: LanguageSelectorProps) => {
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    LanguageStore.setLanguage(e.target.value as any);
  };

  return (
    <div className={`flex items-center ${className}`}>
      <label htmlFor="language-selector" className="mr-2 text-white">
        <span className="sr-only">Select Language</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" 
          />
        </svg>
      </label>
      <select
        id="language-selector"
        value={LanguageStore.currentLanguage}
        onChange={handleLanguageChange}
        className="bg-gray-700 text-white border border-gray-600 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Select language"
      >
        {languageOptions.map((option) => (
          <option key={option.code} value={option.code}>
            {option.nativeName}
          </option>
        ))}
      </select>
    </div>
  );
});

export default LanguageSelector;