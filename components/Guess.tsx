import { observer } from 'mobx-react-lite';
import PuzzleStore from '../stores/PuzzleStore';
import { useEffect, useState } from 'react';

const store = PuzzleStore;

interface GuessProps {
  isGuessed: boolean;
  guess?: string;
  word: string;
  rating?: string;
  score?: number;
}

function getRatingColor(rating: string): string {
  switch (rating?.toUpperCase()) {
    case 'GREEN':
      return 'bg-gradient-to-br from-green-400 to-green-600';
    case 'YELLOW':
      return 'bg-gradient-to-br from-yellow-300 to-yellow-500';
    case 'ORANGE':
      return 'bg-gradient-to-br from-orange-300 to-orange-500';
    case 'RED':
      return 'bg-gradient-to-br from-red-400 to-red-600';
    default:
      // Default is gray
      return 'bg-gradient-to-br from-gray-400 to-gray-600';
  }
}

// New component for the ratings column without animations or emojis
interface RatingsColumnProps {
  ratings: (string | undefined)[];
  scores: (number | undefined)[];
  currentGuess: number;
}

function RatingsColumn({ ratings, scores, currentGuess }: RatingsColumnProps) {
  // Check if the game is over (lost or won) to disable animations
  const isGameOver = currentGuess >= store.maxGuesses || (currentGuess > 0 && store.guesses[currentGuess - 1] === store.word);
  const isWon = currentGuess > 0 && store.guesses[currentGuess - 1] === store.word;
  const isLost = currentGuess >= store.maxGuesses && !isWon;

  return (
    <div className="ml-4 sm:ml-6 md:ml-8 grid grid-rows-6 gap-2 sm:gap-3 md:gap-4">
      {Array(store.maxGuesses).fill(0).map((_, i) => {
        // Determine the color of the circle based on game state and current row
        let circleColor = 'bg-gradient-to-br from-gray-400 to-gray-600'; // Default gray
        
        if (i < currentGuess) {
          // All completed rows stay yellow
          circleColor = 'bg-gradient-to-br from-yellow-300 to-yellow-500'; // Yellow
        }
        
        // Override colors for game end states
        if (isWon) {
          circleColor = 'bg-gradient-to-br from-green-400 to-green-600'; // All green when won
        } else if (isLost) {
          circleColor = 'bg-gradient-to-br from-red-400 to-red-600'; // All red when lost
        }
        
        return (
          <div
            key={`rating-${i}`}
            className="flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center"
          >
            <div 
              className={`h-full w-full rounded-full ${circleColor} border-2 border-gray-300 shadow-lg flex items-center justify-center ${i < currentGuess ? 'opacity-100' : 'opacity-70'}`}
              title={i < currentGuess && ratings[i] ? `Rating: ${ratings[i]} (${scores[i]?.toFixed(1)})` : ''}
              style={{ transition: isGameOver ? 'none' : undefined }}
            >
              <>   </>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Main game component
interface GameGridProps {
  guesses: string[];
  currentGuess: number;
  word: string;
  ratings: (string | undefined)[];
  scores: (number | undefined)[];
}

export function GameGrid({ guesses, currentGuess, word, ratings, scores }: GameGridProps) {
  // Check if the game is over (lost or won) to disable animations globally
  const isGameOver = currentGuess >= store.maxGuesses || guesses[currentGuess - 1] === word;
  const isWon = guesses[currentGuess - 1] === word;
  const isLost = currentGuess >= store.maxGuesses && !isWon;
  
  return (
    <div className="flex items-start">
        <div className="grid grid-rows-6 gap-3 sm:gap-4">
          {Array(store.maxGuesses).fill(0).map((_, row) => (
            <div key={`row-${row}`} className="grid grid-cols-6 gap-2 sm:gap-3 md:gap-4">
              {Array(6).fill(0).map((_, col) => {
                const guess = guesses[row] || '';
                const isGuessed = row < currentGuess;
                
                // Handle duplicate letters properly
                let bgColor = 'bg-gray-800';
                let textColor = 'text-white';
                
                if (isGuessed) {
                  // First, mark exact matches (green)
                  if (guess[col] === word[col]) {
                    bgColor = 'bg-gradient-to-br from-green-400 to-green-600';
                    textColor = 'text-white';
                  } else {
                    // For non-exact matches, check if it's a yellow
                    // Count occurrences of this letter in the word
                    const letterCount = word.split('').filter(c => c === guess[col]).length;
                    
                    if (letterCount > 0) {
                      // Count how many of this letter are exact matches
                      const exactMatches = guess.split('').filter((c, i) => c === guess[col] && c === word[i]).length;
                      
                      // Count how many yellows we've already assigned for this letter
                      // (letters before the current position)
                      let yellowsAssigned = 0;
                      for (let i = 0; i < col; i++) {
                        if (guess[i] === guess[col] && guess[i] !== word[i] && 
                            word.includes(guess[i])) {
                          yellowsAssigned++;
                        }
                      }
                      
                      // If we haven't exceeded the count in the target word, mark as yellow
                      if (exactMatches + yellowsAssigned < letterCount) {
                        bgColor = 'bg-gradient-to-br from-yellow-300 to-yellow-500';
                        textColor = 'text-gray-900';
                      }
                    }
                  }
                }

                // Simple styling without animations or transforms
                const cellStyle = isGuessed 
                  ? `${bgColor} ${textColor} shadow-md` 
                  : `${bgColor} ${textColor} shadow-inner`;

                return (
                  <div
                    key={`cell-${row}-${col}`}
                    className={`flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center 
                      border-2 border-gray-600 rounded-md font-bold text-2xl uppercase ${cellStyle}`}
                    style={{ transition: isGameOver ? 'none' : undefined }}
                  >
                    {guess[col] || ''}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <RatingsColumn 
          ratings={ratings}
          scores={scores}
          currentGuess={currentGuess}
        />
    </div>
  );
}

export default observer(GameGrid);

