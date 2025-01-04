package backend;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class WordleGuessRater {
    private static final double VOWEL_WEIGHT = 1.5;
    private static final double COMMON_CONSONANT_WEIGHT = 1.2;
    private static final Set<Character> VOWELS = Set.of('A', 'E', 'I', 'O', 'U');
    private static final Set<Character> COMMON_CONSONANTS = Set.of('R', 'S', 'T', 'L', 'N', 'D');
    
    public String ratePlayerGuess(String guess, 
                                Map<Character, String> knownLetters, 
                                int guessNumber) {
        double score = 0.0;
        Set<Character> guessLetters = guess.chars()
                                         .mapToObj(c -> (char) c)
                                         .collect(Collectors.toSet());

        // Early game scoring (guesses 1-2)
        if (guessNumber <= 2) {
            score += rateEarlyGameStrategy(guessLetters);
        } 
        // Mid game scoring (guesses 3-4)
        else if (guessNumber <= 4) {
            score += rateMidGameStrategy(guess, knownLetters);
        } 
        // Late game scoring (guesses 5-6)
        else {
            score += rateLateGameStrategy(guess, knownLetters);
        }

        // Apply general penalties
        score -= rateGeneralPenalties(guess, knownLetters);

        return getRatingLabel(score);
    }

    private double rateEarlyGameStrategy(Set<Character> guessLetters) {
        double score = 0.0;
        
        // Reward using vowels in early game
        long vowelCount = guessLetters.stream()
                                    .filter(VOWELS::contains)
                                    .count();
        score += vowelCount * VOWEL_WEIGHT;

        // Reward using common consonants
        long commonConsonantCount = guessLetters.stream()
                                              .filter(COMMON_CONSONANTS::contains)
                                              .count();
        score += commonConsonantCount * COMMON_CONSONANT_WEIGHT;

        // Reward for letter diversity (no duplicates)
        if (guessLetters.size() == 5) {
            score += 2.0;
        }

        return score;
    }

    private double rateMidGameStrategy(String guess, Map<Character, String> knownLetters) {
        double score = 0.0;

        // Reward proper use of known information
        for (Map.Entry<Character, String> entry : knownLetters.entrySet()) {
            char letter = entry.getKey();
            String status = entry.getValue();

            if (status.equals("GREEN")) {
                // Check if green letters are used in correct positions
                int knownPosition = status.indexOf('G');
                if (knownPosition >= 0 && guess.charAt(knownPosition) == letter) {
                    score += 2.0;
                }
            } else if (status.equals("YELLOW")) {
                // Reward using yellow letters in new positions
                if (guess.indexOf(letter) != -1) {
                    score += 1.5;
                }
            }
        }

        return score;
    }

    private double rateLateGameStrategy(String guess, Map<Character, String> knownLetters) {
        double score = 0.0;

        // In late game, heavily reward using all known information
        int correctlyUsedGreens = 0;
        int correctlyUsedYellows = 0;

        for (Map.Entry<Character, String> entry : knownLetters.entrySet()) {
            char letter = entry.getKey();
            String status = entry.getValue();

            if (status.equals("GREEN")) {
                int knownPosition = status.indexOf('G');
                if (knownPosition >= 0 && guess.charAt(knownPosition) == letter) {
                    correctlyUsedGreens++;
                }
            } else if (status.equals("YELLOW")) {
                if (guess.indexOf(letter) != -1) {
                    correctlyUsedYellows++;
                }
            }
        }

        score += (correctlyUsedGreens * 3.0);
        score += (correctlyUsedYellows * 2.0);

        return score;
    }

    private double rateGeneralPenalties(String guess, Map<Character, String> knownLetters) {
        double penalties = 0.0;

        // Penalty for reusing known incorrect letters
        for (char c : guess.toCharArray()) {
            if (knownLetters.containsKey(c) && knownLetters.get(c).equals("BLACK")) {
                penalties += 2.0;
            }
        }

        // Penalty for duplicate letters (context-dependent)
        Set<Character> uniqueLetters = new HashSet<>();
        for (char c : guess.toCharArray()) {
            if (!uniqueLetters.add(c)) {
                // Only penalize if we don't know it's a duplicate from previous feedback
                if (!isKnownDuplicate(c, knownLetters)) {
                    penalties += 1.0;
                }
            }
        }

        return penalties;
    }

    private boolean isKnownDuplicate(char letter, Map<Character, String> knownLetters) {
        if (!knownLetters.containsKey(letter)) {
            return false;
        }
        String status = knownLetters.get(letter);
        return status.chars().filter(ch -> ch == 'G' || ch == 'Y').count() > 1;
    }

    private String getRatingLabel(double score) {
        if (score >= 8.0) return "GREEN";   // Excellent guess
        if (score >= 5.0) return "YELLOW";  // Good guess
        if (score >= 3.0) return "ORANGE";  // Decent guess
        return "RED";                       // Poor guess
    }
}
