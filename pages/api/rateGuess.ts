// import type { NextApiRequest, NextApiResponse } from 'next';

// interface RateGuessRequest {
//   guess: string;
//   currentGuess: number;
//   previousGuesses: string[];
//   word: string;
// }

// interface RateGuessResponse {
//   rating: 'GREEN' | 'YELLOW' | 'ORANGE' | 'RED';
//   score: number;
//   feedback: string;
// }

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<RateGuessResponse>
// ) {
//   if (req.method !== 'POST') {
//     return res.status(405).end();
//   }

//   const { guess, currentGuess, previousGuesses, word } = req.body as RateGuessRequest;

//   // Calculate rating based on game phase
//   const gamePhase = getGamePhase(currentGuess);
//   const score = calculateGuessScore(guess, previousGuesses, word, gamePhase);
//   const rating = getRating(score);

//   return res.status(200).json({
//     rating,
//     score,
//     feedback: getFeedbackMessage(rating, score)
//   });
// }


import type { NextApiRequest, NextApiResponse } from 'next';
import { calculateGuessScore, getRating } from '../../utils/guessRater';

interface RateGuessRequest {
  guess: string;
  currentGuess: number;
  previousGuesses: string[];
  word: string;
}

interface RateGuessResponse {
  rating: 'GREEN' | 'YELLOW' | 'ORANGE' | 'RED';
  score: number;
  feedback: string;
}

// Helper function to determine game phase
function getGamePhase(currentGuess: number): 'early' | 'mid' | 'late' {
  if (currentGuess <= 1) return 'early';
  if (currentGuess <= 3) return 'mid';
  return 'late';
}

// Helper function to generate feedback messages
function getFeedbackMessage(rating: string, score: number): string {
  switch (rating) {
    case 'GREEN':
      return `Excellent guess! (Score: ${score.toFixed(1)})`;
    case 'YELLOW':
      return `Good guess! (Score: ${score.toFixed(1)})`;
    case 'ORANGE':
      return `Decent guess. (Score: ${score.toFixed(1)})`;
    case 'RED':
      return `Try a different approach. (Score: ${score.toFixed(1)})`;
    default:
      return `Score: ${score.toFixed(1)}`;
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<RateGuessResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { guess, currentGuess, previousGuesses, word } = req.body as RateGuessRequest;

  // Calculate rating based on game phase
  const gamePhase = getGamePhase(currentGuess);
  const score = calculateGuessScore(guess, previousGuesses, word, gamePhase);
  const rating = getRating(score);

  return res.status(200).json({
    rating,
    score,
    feedback: getFeedbackMessage(rating, score)
  });
}
