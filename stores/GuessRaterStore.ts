class GuessRaterStore {
    knownLetters: Map<string, string> = new Map();
    currentGuessNumber: number = 1;
  
    rateGuess(guess: string): string {
      // Early game (first 2 guesses)
      if (this.currentGuessNumber <= 2) {
        return this.rateEarlyGameGuess(guess);
      }
      // Mid game (guesses 3-4)
      else if (this.currentGuessNumber <= 4) {
        return this.rateMidGameGuess(guess);
      }
      // Late game (guesses 5-6)
      else {
        return this.rateLateGameGuess(guess);
      }
    }
  
    private rateEarlyGameGuess(guess: string): string {
      const vowels = new Set(['A', 'E', 'I', 'O', 'U']);
      const commonConsonants = new Set(['R', 'S', 'T', 'L', 'N', 'D']);
      
      let score = 0;
      const uniqueLetters = new Set(guess.toUpperCase().split(''));
  
      // Reward vowels
      const vowelCount = [...uniqueLetters].filter(letter => vowels.has(letter)).length;
      score += vowelCount * 1.5;
  
      // Reward common consonants
      const consonantCount = [...uniqueLetters].filter(letter => commonConsonants.has(letter)).length;
      score += consonantCount * 1.2;
  
      // Reward unique letters
      if (uniqueLetters.size === 5) score += 2;
  
      return this.getScoreLabel(score);
    }
  
    private rateMidGameGuess(guess: string): string {
      let score = 0;
      const upperGuess = guess.toUpperCase();
  
      // Check use of known information
      this.knownLetters.forEach((status, letter) => {
        if (status === 'GREEN' && upperGuess.includes(letter)) score += 2;
        if (status === 'YELLOW' && upperGuess.includes(letter)) score += 1.5;
        if (status === 'BLACK' && upperGuess.includes(letter)) score -= 2;
      });
  
      return this.getScoreLabel(score);
    }
  
    private rateLateGameGuess(guess: string): string {
      let score = 0;
      const upperGuess = guess.toUpperCase();
  
      this.knownLetters.forEach((status, letter) => {
        if (status === 'GREEN' && upperGuess.includes(letter)) score += 3;
        if (status === 'YELLOW' && upperGuess.includes(letter)) score += 2;
        if (status === 'BLACK' && upperGuess.includes(letter)) score -= 3;
      });
  
      return this.getScoreLabel(score);
    }
  
    private getScoreLabel(score: number): string {
      if (score >= 8) return 'GREEN';
      if (score >= 5) return 'YELLOW';
      if (score >= 3) return 'ORANGE';
      return 'RED';
    }
  
    updateKnownLetters(guess: string, feedback: string[]) {
      guess.split('').forEach((letter, index) => {
        const upperLetter = letter.toUpperCase();
        const currentStatus = feedback[index];
        
        if (!this.knownLetters.has(upperLetter) || 
            (this.knownLetters.get(upperLetter) === 'BLACK' && currentStatus !== 'BLACK')) {
          this.knownLetters.set(upperLetter, currentStatus);
        }
      });
      this.currentGuessNumber++;
    }
  
    reset() {
      this.knownLetters.clear();
      this.currentGuessNumber = 1;
    }
  }
  
  export default new GuessRaterStore();
  