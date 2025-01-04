// export function calculateGuessScore(
//   guess: string,
//   previousGuesses: string[],
//   targetWord: string,
//   gamePhase: 'early' | 'mid' | 'late'
// ): number {
//   const knownLetters = buildKnownLettersMap(previousGuesses, targetWord);
  
//   let score = 0;
  
//   // Base score from letter quality
//   score += calculateLetterQualityScore(guess);
  
//   // Phase-specific scoring
//   switch (gamePhase) {
//     case 'early':
//       score += calculateEarlyGameScore(guess);
//       break;
//     case 'mid':
//       score += calculateMidGameScore(guess, knownLetters);
//       break;
//     case 'late':
//       score += calculateLateGameScore(guess, knownLetters);
//       break;
//   }
  
//   // Penalty for known wrong letters
//   score -= calculatePenalties(guess, knownLetters);
  
//   return score;
// }

// export function getRating(score: number): 'GREEN' | 'YELLOW' | 'ORANGE' | 'RED' {
//   if (score >= 8) return 'GREEN';
//   if (score >= 5) return 'YELLOW';
//   if (score >= 3) return 'ORANGE';
//   return 'RED';
// }



interface LetterInfo {
  status: 'green' | 'yellow' | 'black';
  position?: number;
}

interface KnownLettersMap {
  [key: string]: LetterInfo;
}

const VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);
const COMMON_CONSONANTS = new Set(['R', 'S', 'T', 'L', 'N', 'D']);

export function buildKnownLettersMap(
  previousGuesses: string[],
  targetWord: string
): KnownLettersMap {
  const knownLetters: KnownLettersMap = {};

  previousGuesses.forEach((guess) => {
    for (let i = 0; i < guess.length; i++) {
      const letter = guess[i].toUpperCase();
      
      if (targetWord[i].toUpperCase() === letter) {
        knownLetters[letter] = { status: 'green', position: i };
      } else if (targetWord.toUpperCase().includes(letter)) {
        if (!knownLetters[letter] || knownLetters[letter].status !== 'green') {
          knownLetters[letter] = { status: 'yellow' };
        }
      } else {
        if (!knownLetters[letter]) {
          knownLetters[letter] = { status: 'black' };
        }
      }
    }
  });

  return knownLetters;
}

export function calculateLetterQualityScore(guess: string): number {
  let score = 0;
  const uniqueLetters = new Set(guess.toUpperCase());

  uniqueLetters.forEach(letter => {
    if (VOWELS.has(letter)) {
      score += 1.5; // Vowel weight
    } else if (COMMON_CONSONANTS.has(letter)) {
      score += 1.2; // Common consonant weight
    } else {
      score += 1.0; // Regular consonant weight
    }
  });

  // Bonus for using unique letters
  if (uniqueLetters.size === guess.length) {
    score += 2.0;
  }

  return score;
}

export function calculateEarlyGameScore(guess: string): number {
  let score = 0;
  const uniqueLetters = new Set(guess.toUpperCase());

  // Early game focuses on letter diversity and common letters
  score += uniqueLetters.size * 0.5; // Reward unique letters
  
  // Additional bonus for balanced vowel/consonant ratio
  const vowelCount = [...guess].filter(letter => VOWELS.has(letter.toUpperCase())).length;
  if (vowelCount >= 2 && vowelCount <= 3) {
    score += 1.5;
  }

  return score;
}

export function calculateMidGameScore(
  guess: string,
  knownLetters: KnownLettersMap
): number {
  let score = 0;

  // Mid game rewards using known information
  for (let i = 0; i < guess.length; i++) {
    const letter = guess[i].toUpperCase();
    const knownInfo = knownLetters[letter];

    if (knownInfo) {
      if (knownInfo.status === 'green' && knownInfo.position === i) {
        score += 2.0; // Reward for using green letters in correct position
      } else if (knownInfo.status === 'yellow') {
        score += 1.5; // Reward for using yellow letters in new positions
      }
    }
  }

  return score;
}

export function calculateLateGameScore(
  guess: string,
  knownLetters: KnownLettersMap
): number {
  let score = 0;

  // Late game heavily weights using known information
  for (let i = 0; i < guess.length; i++) {
    const letter = guess[i].toUpperCase();
    const knownInfo = knownLetters[letter];

    if (knownInfo) {
      if (knownInfo.status === 'green' && knownInfo.position === i) {
        score += 3.0; // Higher reward for green letters
      } else if (knownInfo.status === 'yellow') {
        score += 2.0; // Higher reward for yellow letters
      }
    }
  }

  return score;
}

export function calculatePenalties(
  guess: string,
  knownLetters: KnownLettersMap
): number {
  let penalties = 0;

  // Penalize using known wrong letters
  for (const letter of guess.toUpperCase()) {
    const knownInfo = knownLetters[letter];
    if (knownInfo && knownInfo.status === 'black') {
      penalties += 2.0;
    }
  }

  // Penalize duplicate letters unless they're known to be correct
  const letterCounts = new Map<string, number>();
  for (const letter of guess.toUpperCase()) {
    letterCounts.set(letter, (letterCounts.get(letter) || 0) + 1);
  }

  letterCounts.forEach((count, letter) => {
    if (count > 1) {
      const knownInfo = knownLetters[letter];
      if (!knownInfo || knownInfo.status !== 'green') {
        penalties += (count - 1) * 1.0;
      }
    }
  });

  return penalties;
}

export function calculateGuessScore(
  guess: string,
  previousGuesses: string[],
  targetWord: string,
  gamePhase: 'early' | 'mid' | 'late'
): number {
  const knownLetters = buildKnownLettersMap(previousGuesses, targetWord);
  
  let score = 0;
  
  // Base score from letter quality
  score += calculateLetterQualityScore(guess);
  
  // Phase-specific scoring
  switch (gamePhase) {
    case 'early':
      score += calculateEarlyGameScore(guess);
      break;
    case 'mid':
      score += calculateMidGameScore(guess, knownLetters);
      break;
    case 'late':
      score += calculateLateGameScore(guess, knownLetters);
      break;
  }
  
  // Penalty for known wrong letters
  score -= calculatePenalties(guess, knownLetters);
  
  return score;
}

export function getRating(score: number): 'GREEN' | 'YELLOW' | 'ORANGE' | 'RED' {
  if (score >= 8) return 'GREEN';
  if (score >= 5) return 'YELLOW';
  if (score >= 3) return 'ORANGE';
  return 'RED';
}
