// import { observer } from 'mobx-react-lite'

// interface GuessProps {
//   isGuessed: boolean;
//   guess?: string;
//   word: string;
//   rating?: string;
//   score?: number;
// }


// export default observer(function Guess({ isGuessed, guess = '', word, rating, score }: GuessProps) {
//   // Deep debugging of component props and state
//   console.log('Guess component rendering with:', {
//     isGuessed,
//     guess,
//     word,
//     rating,
//     score,
//     guessLength: guess?.length,
//     guessChars: Array.from(guess || '').join(',')
//   });
  
//   // Create a padded array to ensure we always show 6 cells
//   const displayChars = Array(6).fill('').map((_, i) => guess?.[i] || '');
  
//   return (
//     <div>
//     <div className="mb-2 grid grid-cols-6 gap-1 sm:gap-2">
//       {new Array(6).fill(0).map((_, i) => {
//         const bgColor = !isGuessed
//           ? 'bg-black'
//           : guess[i] === word[i]
//           ? 'bg-green-400'
//           : word.includes(guess[i])
//           ? 'bg-yellow-400'
//           : 'bg-black'

//         return (
//           <div
//             key={`grid-cell-${i}`}
//             className={`flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center border border-gray-400 font-bold text-2xl uppercase ${bgColor} ${bgColor === 'bg-black' ? 'text-white' : 'text-black'}`}
//           >
//             {displayChars[i]}
//           </div>
//         )
        
//       })}
//     </div>

//     {isGuessed && rating && (
//         <div className={`mt-1 text-sm ${getRatingColor(rating)}`}>
//           Guess Rating: {rating} ({score?.toFixed(1)})
//         </div>
//       )}
//     </div>
//   )
// })





// // components/Guess.tsx
// import { observer } from 'mobx-react-lite';

// interface GuessProps {
//   isGuessed: boolean;
//   guess?: string;
//   word: string;
//   rating?: string;
//   score?: number;
// }

// // Helper function to get the appropriate color class based on rating
// function getRatingColor(rating: string): string {
//   switch (rating.toUpperCase()) {
//     case 'GREEN':
//       return 'text-green-500';
//     case 'YELLOW':
//       return 'text-yellow-500';
//     case 'ORANGE':
//       return 'text-orange-500';
//     case 'RED':
//       return 'text-red-500';
//     default:
//       return 'text-gray-500';
//   }
// }

// export default observer(function Guess({ 
//   isGuessed, 
//   guess = '', 
//   word, 
//   rating, 
//   score 
// }: GuessProps) {
//   // Deep debugging of component props and state
//   console.log('Guess component rendering with:', {
//     isGuessed,
//     guess,
//     word,
//     rating,
//     score,
//     guessLength: guess?.length,
//     guessChars: Array.from(guess || '').join(',')
//   });
  
//   // Create a padded array to ensure we always show 6 cells
//   const displayChars = Array(6).fill('').map((_, i) => guess?.[i] || '');
  
//   return (
//     <div>
//       <div className="mb-2 grid grid-cols-6 gap-1 sm:gap-2">
//         {new Array(6).fill(0).map((_, i) => {
//           const bgColor = !isGuessed
//             ? 'bg-black'
//             : guess[i] === word[i]
//             ? 'bg-green-400'
//             : word.includes(guess[i])
//             ? 'bg-yellow-400'
//             : 'bg-black';

//           return (
//             <div
//               key={`grid-cell-${i}`}
//               className={`flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center border border-gray-400 font-bold text-2xl uppercase ${bgColor} ${bgColor === 'bg-black' ? 'text-white' : 'text-black'}`}
//             >
//               {displayChars[i]}
//             </div>
//           );
//         })}
//       </div>

//       {isGuessed && rating && (
//         <div className={`mt-1 text-sm ${getRatingColor(rating)}`}>
//           Guess Rating: {rating} ({score?.toFixed(1)})
//         </div>
//       )}
//     </div>
//   );
// });



// components/Guess.tsx
import { observer } from 'mobx-react-lite';
import PuzzleStore from '../stores/PuzzleStore'

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
      return 'bg-green-500';
    case 'YELLOW':
      return 'bg-yellow-500';
    case 'ORANGE':
      return 'bg-orange-500';
    case 'RED':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
}

// New component for the ratings column
interface RatingsColumnProps {
  ratings: (string | undefined)[];
  scores: (number | undefined)[];
  currentGuess: number;
}

function RatingsColumn({ ratings, scores, currentGuess }: RatingsColumnProps) {
  return (
    <div className="ml-8 grid grid-rows-6 gap-2 sm:gap-3 md:gap-4">
      {Array(store.maxGuesses).fill(0).map((_, i) => (
        <div
          key={`rating-${i}`}
          className={`flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center`}
        >
          {i < currentGuess && ratings[i] && (
            <div 
              className={`h-full w-full rounded-full ${getRatingColor(ratings[i]!)} border-2 border-gray-400`}
              title={`Rating: ${ratings[i]} (${scores[i]?.toFixed(1)})`}
            />
          )}

            {/* Score Display */}
            {/* {i < currentGuess && scores[i] && (
              <div className="text-white font-mono text-lg sm:text-xl md:text-2xl">
                {scores[i]?.toFixed(1)}
              </div>
            )} */}
        </div>
      ))}
    </div>
  );
}



// function RatingsColumn({ ratings, scores, currentGuess }: RatingsColumnProps) {
//     return (
//       <div className="ml-8 grid grid-rows-6 gap-1 sm:gap-2">
//         {Array(6).fill(0).map((_, i) => (
//           <div
//             key={`rating-${i}`}
//             className="flex items-center gap-2" // Added flex container for circle and score
//           >
//             <div
//               className={`flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center`}
//             >
//               {i < currentGuess && ratings[i] && (
//                 <div 
//                   className={`h-full w-full rounded-full ${getRatingColor(ratings[i]!)} border-2 border-gray-400`}
//                   title={`Rating: ${ratings[i]}`}
//                 />
//               )}
//             </div>
//             {/* Score display */}
//             {i < currentGuess && scores[i] && (
//               <div className="text-white font-mono text-lg sm:text-xl md:text-2xl">
//                 {scores[i]?.toFixed(1)}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   }
  
  

// Main game component
interface GameGridProps {
  guesses: string[];
  currentGuess: number;
  word: string;
  ratings: (string | undefined)[];
  scores: (number | undefined)[];
}

export function GameGrid({ guesses, currentGuess, word, ratings, scores }: GameGridProps) {
  return (
    <div className="flex items-start">
      <div className="grid grid-rows-6 gap-3 sm:gap-4">
        {Array(store.maxGuesses).fill(0).map((_, row) => (
          <div key={`row-${row}`} className="grid grid-cols-6 gap-2 sm:gap-3 md:gap-4">
            {Array(6).fill(0).map((_, col) => {
              const guess = guesses[row] || '';
              const isGuessed = row < currentGuess;
              const bgColor = !isGuessed
                ? 'bg-black'
                : guess[col] === word[col]
                ? 'bg-green-400'
                : word.includes(guess[col])
                ? 'bg-yellow-400'
                : 'bg-black';

              return (
                <div
                  key={`cell-${row}-${col}`}
                  className={`flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center border border-gray-400 font-bold text-2xl uppercase ${bgColor} ${bgColor === 'bg-black' ? 'text-white' : 'text-black'}`}
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
        // className="ml-8"
      />
    </div>
  );
}

export default observer(GameGrid);
