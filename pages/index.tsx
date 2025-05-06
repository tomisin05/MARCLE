import { observer } from 'mobx-react-lite'
import { reaction } from 'mobx'
import { useEffect, useState, useRef } from 'react'
import Guess, { GameGrid } from '../components/Guess'
import Querty from '../components/Qwerty'
import PuzzleStore, { Difficulty } from '../stores/PuzzleStore'
import DifficultySelector from '../components/DifficultySelector'
import { toJS } from 'mobx'
import dynamic from 'next/dynamic'

// Import react-confetti dynamically to avoid SSR issues
const ReactConfetti = dynamic(() => import('react-confetti'), { ssr: false })

export default observer(function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [confettiRecycle, setConfettiRecycle] = useState(true);
  const [theme, setTheme] = useState<'default' | 'dark' | 'fun'>('fun');
  const confettiRef = useRef<HTMLDivElement>(null);
  const store = PuzzleStore;
  
  useEffect(() => {
    store.init();
    
    // Set up reaction to log changes to guesses
    const disposer = reaction(
      () => toJS(store.guesses),
      (guesses) => console.log('Guesses updated:', guesses)
    );
    
    // Initialize first guess slot using action
    store.initializeFirstGuess();
    const handleKeyup = (e: KeyboardEvent) => {
      console.log('Keyup event:', e.key);
      store.handleKeyup(e);
    };
    window.addEventListener('keyup', handleKeyup);

    // Add touch event listeners for mobile devices
    const handleTouchMove = (e: TouchEvent) => {
      // Allow scrolling on mobile devices
    };
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Add viewport meta tag for better mobile rendering
    const viewportMeta = document.createElement('meta');
    viewportMeta.name = "viewport";
    viewportMeta.content = "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes";
    document.getElementsByTagName('head')[0].appendChild(viewportMeta);

    return () => {
      window.removeEventListener('keyup', handleKeyup);
      window.removeEventListener('touchmove', handleTouchMove);
      disposer();
    };
  }, []);

  // Window size state for confetti
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  // Update window size for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check for win/loss and trigger celebration
  useEffect(() => {
    if (store.won) {
      // Start with recycling on for initial burst
      setConfettiRecycle(true);
      setShowCelebration(true);
      
      // After 2 seconds, stop recycling so confetti can fall and disappear
      setTimeout(() => {
        setConfettiRecycle(false);
      }, 2000);
      
      // After 5 seconds, hide the confetti component completely
      setTimeout(() => {
        setShowCelebration(false);
      }, 7000);
    }
  }, [store.won]);

  const startGame = (difficulty: Difficulty) => {
    store.setDifficulty(difficulty);
    store.resetGame();
    setGameStarted(true);
  };

  const changeDifficulty = () => {
    store.resetGame();
    setGameStarted(false);
  };

  useEffect(() => {
    // Remove the check for stored difficulty to always start with the selection page
    setGameStarted(false);
  }, []);

  const handleDifficultyChange = () => {
    // The difficulty is already set in PuzzleStore by DifficultySelector
    startGame(PuzzleStore.difficulty);
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
    <>
      {!gameStarted ? (
        <DifficultySelector onDifficultySet={handleDifficultyChange} />
      ) : (
        <div className="game-background flex min-h-screen w-full flex-col items-center justify-between overflow-y-auto mobile-friendly-container space-y-4 px-2 sm:px-4 relative">
          {/* Animated background elements */}
          {stars.map(star => (
            <div
              key={star.id}
              className="absolute rounded-full bg-white "
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
          
          {/* Game title with animation */}
          <h1 className="game-title bg-gradient-to-br from-purple-400 via-blue-400 to-green-400 bg-clip-text text-3xl sm:text-4xl md:text-6xl font-bold uppercase text-transparent mb-4 mt-4 animate-float">
            M.A.R.C.(LE)
          </h1>
          
          {/* Game info section */}
          <div className="text-white mb-4 text-center backdrop-blur-sm bg-black/30 p-4 rounded-lg">
            <h2 className="mb-2 mobile-friendly-text font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-red-500">
                Difficulty: {store.difficulty}
              </span>
            </h2>
            <p className="mobile-friendly-text">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-500">
                Max Guesses: {store.maxGuesses}
              </span>
            </p>
            <button 
              onClick={changeDifficulty} 
              className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Change Difficulty
            </button>
          </div>

          {/* Game grid */}
          <div className={`mb-4 w-full max-w-xs sm:max-w-sm md:max-w-md backdrop-blur-sm bg-black/20 p-4 rounded-lg ${store.lost || store.won ? 'game-over' : ''}`}>
            <GameGrid
              guesses={store.guesses}
              currentGuess={store.currentGuess}
              word={store.word}
              ratings={store.guesses.map((_, index) => 
                // For completed guesses, use stored ratings
                index < store.currentGuess - 1 ? store.guessRatings[index] :
                // For current guess, use lastGuessRating
                index === store.currentGuess - 1 ? store.lastGuessRating :
                // For future guesses, use undefined
                undefined
              )}
              scores={store.guesses.map((_, index) => 
                // For completed guesses, use stored scores
                index < store.currentGuess - 1 ? store.guessScores[index] :
                // For current guess, use lastGuessScore
                index === store.currentGuess - 1 ? store.lastGuessScore :
                // For future guesses, use undefined
                undefined
              )}
            />
          </div>

          {/* Win/Loss messages with animations */}
          {store.won && (
            <div className="text-center animate-celebrate">
              <h1 className="text-4xl font-bold mb-4 animate-glow text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-500">
                You won! 🎉
              </h1>
              
              {/* React Confetti for realistic celebration */}
              {showCelebration && (
                <ReactConfetti
                  width={windowSize.width}
                  height={windowSize.height}
                  recycle={confettiRecycle}
                  numberOfPieces={500}
                  gravity={0.25}
                  friction={0.99}
                  initialVelocityX={{ min: -15, max: 15 }}
                  initialVelocityY={{ min: -5, max: 25 }}
                  wind={0.01}
                  colors={[
                    '#FF5252', '#FF4081', '#E040FB', '#7C4DFF', 
                    '#536DFE', '#448AFF', '#40C4FF', '#18FFFF', 
                    '#64FFDA', '#69F0AE', '#B2FF59', '#EEFF41', 
                    '#FFFF00', '#FFD740', '#FFAB40', '#FF6E40'
                  ]}
                  tweenDuration={5000}
                  
                  run={true}
                />
              )}
            </div>
          )}
          
          {store.lost && (
            <h1 className="text-red-400 text-2xl mb-4 ">
              You lost! The word was: <span className="font-bold">{store.word}</span>
            </h1>
          )}
          
          {(store.won || store.lost) && (
            <button 
              onClick={changeDifficulty} 
              className="mb-4 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full hover:from-indigo-600 hover:to-purple-700 text-sm sm:text-base font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Play Again
            </button>
          )}
          
          <p className="text-white mb-4 text-center mobile-friendly-text backdrop-blur-sm bg-black/30 p-3 rounded-lg">
            Tap or click the letters below to make your guess. Use 'Enter' to submit and '⌫' to delete.
          </p>
          
          {/* Keyboard */}
          <Querty store={store} />
        </div>
      )}
    </>
  );
});