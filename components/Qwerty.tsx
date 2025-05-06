// components/Qwerty.tsx
import { observer } from 'mobx-react-lite';
import { useState, useEffect } from 'react';

interface QwertyProps {
  store: any;
}

export default observer(function Qwerty({ store }: QwertyProps) {
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Create keyboard layout
  const keyboard = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'],
  ];

  // Handle key press animation
  useEffect(() => {
    if (pressedKey) {
      const timer = setTimeout(() => {
        setPressedKey(null);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [pressedKey]);

  // Show confetti when a correct guess is made
  useEffect(() => {
    if (store.guesses.length > 0) {
      const lastGuess = store.guesses[store.currentGuess - 1];
      if (lastGuess) {
        const correctLetters = lastGuess.split('').filter((letter: string, i: number) => letter === store.word[i]).length;
        if (correctLetters >= 3) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 2000);
        }
      }
    }
  }, [store.guesses, store.currentGuess]);

  // Get the status of a key (used, correct, present, absent)
  const getKeyStatus = (key: string) => {
    if (!store.allGuesses.includes(key.toLowerCase())) {
      return 'unused';
    }
    
    if (store.exactGuesses.includes(key.toLowerCase())) {
      return 'correct';
    }
    
    if (store.inexactGuesses.includes(key.toLowerCase())) {
      return 'present';
    }
    
    return 'absent';
  };

  // Get the appropriate style for a key based on its status
  const getKeyStyle = (key: string) => {
    const status = getKeyStatus(key);
    const isPressed = key === pressedKey;
    
    let baseStyle = 'flex items-center justify-center rounded-lg font-bold transition-all duration-200 shadow-md';
    
    // Add size classes based on key
    if (key === 'Enter' || key === 'Backspace') {
      baseStyle += ' text-xs sm:text-sm px-1 py-3 sm:px-2 sm:py-4';
    } else {
      baseStyle += ' text-lg sm:text-xl px-2 py-3 sm:px-3 sm:py-4';
    }
    
    // Add status-based styling
    switch (status) {
      case 'correct':
        return `${baseStyle} ${isPressed ? 'scale-90' : ''} bg-gradient-to-br from-green-400 to-green-600 text-white border-2 border-green-300`;
      case 'present':
        return `${baseStyle} ${isPressed ? 'scale-90' : ''} bg-gradient-to-br from-yellow-300 to-yellow-500 text-gray-900 border-2 border-yellow-200`;
      case 'absent':
        return `${baseStyle} ${isPressed ? 'scale-90' : ''} bg-gradient-to-br from-gray-600 to-gray-800 text-gray-300 border-2 border-gray-500`;
      default:
        return `${baseStyle} ${isPressed ? 'scale-90' : ''} bg-gradient-to-br from-blue-400 to-blue-600 text-white hover:from-blue-500 hover:to-blue-700 border-2 border-blue-300`;
    }
  };

  // Handle key click
  const handleKeyClick = (key: string) => {
    setPressedKey(key);
    
    // Create a synthetic keyboard event
    const event = {
      key: key === 'Backspace' ? 'Backspace' : key === 'Enter' ? 'Enter' : key.toLowerCase(),
      preventDefault: () => {},
    } as KeyboardEvent;
    
    store.handleKeyup(event);
  };

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      {/* Confetti effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 50 }).map((_, i) => {
            const size = Math.random() * 10 + 5;
            const left = Math.random() * 100;
            const animationDuration = Math.random() * 3 + 2;
            const color = [
              '#FF5252', '#FF4081', '#E040FB', '#7C4DFF', 
              '#536DFE', '#448AFF', '#40C4FF', '#18FFFF', 
              '#64FFDA', '#69F0AE', '#B2FF59', '#EEFF41', 
              '#FFFF00', '#FFD740', '#FFAB40', '#FF6E40'
            ][Math.floor(Math.random() * 16)];
            
            return (
              <div
                key={i}
                className="absolute animate-confetti"
                style={{
                  left: `${left}%`,
                  top: '-20px',
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: color,
                  borderRadius: '50%',
                  animation: `fall ${animationDuration}s linear forwards`,
                }}
              />
            );
          })}
        </div>
      )}
      
      {/* Keyboard */}
      <div className="flex flex-col gap-1 sm:gap-2">
        {keyboard.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex justify-center gap-1 sm:gap-2">
            {row.map((key) => (
              <button
                key={key}
                className={getKeyStyle(key)}
                onClick={() => handleKeyClick(key)}
                style={{
                  width: key === 'Enter' || key === 'Backspace' ? '4.5rem' : '2.2rem',
                  height: '3.5rem',
                }}
              >
                {key === 'Backspace' ? '⌫' : key}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});