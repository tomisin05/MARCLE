// components/DifficultySelector.tsx
import { useState } from 'react';
import PuzzleStore from '../stores/PuzzleStore';
import Tutorial from './Tutorial';
export interface DifficultyProps {
  onDifficultySet: () => void;
}

export default function DifficultySelector({ onDifficultySet }: DifficultyProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('default');
  const [isHovering, setIsHovering] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false); 


  const difficulties = [
    { 
      name: 'easy', 
      label: 'Easy', 
      description: '7 guesses to find the word',
      color: 'from-green-400 to-green-600',
      icon: '😊'
    },
    { 
      name: 'medium', 
      label: 'Medium', 
      description: '5 guesses to find the word',
      color: 'from-yellow-400 to-yellow-600',
      icon: '🤔'
    },
    { 
      name: 'hard', 
      label: 'Hard', 
      description: '3 guesses to find the word',
      color: 'from-orange-400 to-orange-600',
      icon: '😬'
    },
    { 
      name: 'impossible', 
      label: 'Impossible', 
      description: 'Just 1 guess to find the word!',
      color: 'from-red-500 to-red-700',
      icon: '🤯'
    }
  ];

  const handleDifficultySelect = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
    PuzzleStore.setDifficulty(difficulty as any);
  };

  const handleStartGame = () => {
    onDifficultySet();
  };

  // Generate random stars for the background
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 50; i++) {
      const size = Math.random() * 3 + 1;
      stars.push({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${size}px`,
        opacity: Math.random() * 0.8 + 0.2,
        animationDelay: `${Math.random() * 5}s`
      });
    }
    return stars;
  };

  const stars = generateStars();

  return (
    <div className="game-background min-h-screen flex flex-col items-center justify-center p-4 relative">
              {/* Tutorial modal */}
      {showTutorial && <Tutorial onClose={() => setShowTutorial(false)} />}
      
      {/* Animated background elements */}
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            animationDelay: star.animationDelay
          }}
        />
      ))}
      
      {/* Game title */}
      <h1 className="game-title text-4xl md:text-6xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 animate-float">
        M.A.R.C.(LE)
      </h1>
      
      {/* Game description */}
      <div className="mb-8 text-center backdrop-blur-sm bg-black/30 p-6 rounded-lg max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-red-500">
          Choose Your Challenge
        </h2>
        <p className="text-white mb-4">
          Test your word-guessing skills with different difficulty levels!
        </p>
        <button 
          onClick={() => setShowInfo(!showInfo)}
          className="text-sm text-blue-300 hover:text-blue-200 underline"
        >
          {showInfo ? 'Hide Info' : 'How to Play'}
        </button>
        

        {showInfo && (
        <div className="mt-4 text-left text-gray-200 text-sm border-t border-gray-600 pt-4">
            <p className="mb-2">• Guess the 5-letter word in limited attempts</p>
            <p className="mb-2">• Green tiles mean the letter is correct and in the right position</p>
            <p className="mb-2">• Yellow tiles mean the letter is in the word but in the wrong position</p>
            <p className="mb-2">• Gray tiles mean the letter is not in the word</p>
            <p className="mb-2">• Choose your difficulty level to adjust the number of guesses you get</p>
            
            <div className="mt-4 border-t border-gray-600 pt-4">
            <p className="font-bold mb-2">How Guesses Are Rated:</p>
            <p className="mb-2">Each guess receives a score and rating based on its strategic value:</p>
            
            <p className="mb-1"><span className="font-bold text-green-400">Early Game (Guesses 1-2):</span></p>
            <p className="mb-2 pl-3">• Vowels and common consonants (R, S, T, L, N, D) are highly valued</p>
            <p className="mb-2 pl-3">• Using unique letters (no duplicates) earns bonus points</p>
            
            <p className="mb-1"><span className="font-bold text-yellow-400">Mid Game (Guesses 3-4):</span></p>
            <p className="mb-2 pl-3">• Using information from previous guesses is important</p>
            <p className="mb-2 pl-3">• Green letters should be placed in correct positions</p>
            <p className="mb-2 pl-3">• Yellow letters should be used in new positions</p>
            
            <p className="mb-1"><span className="font-bold text-orange-400">Late Game (Guesses 5+):</span></p>
            <p className="mb-2 pl-3">• Maximizing use of all known information is critical</p>
            <p className="mb-2 pl-3">• Reusing letters marked as incorrect will lower your score</p>
            
            <p className="mt-2">Ratings range from <span className="text-green-400">GREEN</span> (excellent) to <span className="text-yellow-400">YELLOW</span> (good) to <span className="text-orange-400">ORANGE</span> (decent) to <span className="text-red-400">RED</span> (poor)</p>
            </div>
        </div>
        )}

      </div>
      
      {/* Difficulty selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 w-full max-w-3xl">
        {difficulties.map((difficulty) => (
          <div
            key={difficulty.name}
            className={`relative overflow-hidden rounded-lg transition-all duration-300 transform ${
              selectedDifficulty === difficulty.name 
                ? 'scale-105 shadow-glow' 
                : 'hover:scale-102'
            }`}
            onMouseEnter={() => setIsHovering(difficulty.name)}
            onMouseLeave={() => setIsHovering(null)}
          >
            <button
              onClick={() => handleDifficultySelect(difficulty.name)}
              className={`w-full h-full p-6 text-left bg-gradient-to-br ${difficulty.color} backdrop-blur-sm bg-opacity-80 border-2 ${
                selectedDifficulty === difficulty.name 
                  ? 'border-white' 
                  : 'border-transparent hover:border-gray-300'
              } rounded-lg transition-all duration-300`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">{difficulty.label}</h3>
                <span className="text-2xl">{difficulty.icon}</span>
              </div>
              <p className="mt-2 text-sm text-white opacity-90">{difficulty.description}</p>
              
              {/* Animated selection indicator */}
              {selectedDifficulty === difficulty.name && (
                <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-white flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              
              {/* Hover animation */}
              {isHovering === difficulty.name && (
                <div className="absolute inset-0 bg-white opacity-10 animate-pulse"></div>
              )}
            </button>
          </div>
        ))}
      </div>
      
      
      {/* Start game button and Tutorial button */}
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={handleStartGame}
          className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-lg font-bold rounded-full hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Start Game
        </button>
        
        <button
          onClick={() => setShowTutorial(true)}
          className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-600 text-white text-lg font-bold rounded-full hover:from-green-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          How to Play
        </button>
      </div>
    </div>
  );
}