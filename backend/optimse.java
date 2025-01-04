package backend;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;

// class WordleSolver {
//     private final String targetWord;
//     private final List<String> wordList;
//     private final Map<Character, String> letterStatus;
    
//     // Constants for scoring
//     private static final double GREEN_SCORE = 2.0;
//     private static final double YELLOW_SCORE = 1.5;
//     private static final double BASE_SCORE = 1.0;

//     public WordleSolver(String targetWord, List<String> wordList) {
//         this.targetWord = targetWord;
//         this.wordList = wordList;
//         this.letterStatus = new HashMap<>();
//     }

//     /**
//      * Gets partitions of possible words based on feedback patterns
//      */
//     private Map<String, List<String>> getPartitions(String guess) {
//         Map<String, List<String>> partitions = new HashMap<>();
        
//         for (String possibleTarget : wordList) {
//             String feedback = computeFeedback(guess, possibleTarget);
//             partitions.computeIfAbsent(feedback, k -> new ArrayList<>())
//                         .add(possibleTarget);
//         }
        
//         return partitions;
//     }

//     /**
//      * Computes entropy for a given partition of words
//      */
//     private double computeEntropy(Map<String, List<String>> partitions) {
//         double entropy = 0.0;
//         int totalWords = partitions.values().stream()
//                 .mapToInt(List::size)
//                 .sum();

//         for (List<String> partition : partitions.values()) {
//             if (partition.isEmpty()) continue;
//             double probability = (double) partition.size() / totalWords;
//             entropy -= probability * (Math.log(probability) / Math.log(2));
//         }

//         return entropy;
//     }

//     /**
//      * Checks if a letter is in the correct position compared to the target word
//      */
//     private boolean isCorrectPosition(char letter, int position) {
//         return targetWord.charAt(position) == letter;
//     }

//     /**
//      * Computes the maximum possible entropy for a given partition
//      */
//     private double maxPossibleEntropy(Map<String, List<String>> partitions) {
//         int totalWords = partitions.values().stream()
//                 .mapToInt(List::size)
//                 .sum();
        
//         // Maximum entropy occurs with equal-sized partitions
//         int maxPartitions = Math.min(totalWords, 243); // 3^5 possible feedback patterns
//         double idealProbability = 1.0 / maxPartitions;
//         return -Math.log(idealProbability) / Math.log(2);
//     }

//     /**
//      * Computes feedback for a guess compared to the target word
//      */
//     private String computeFeedback(String guess, String target) {
//         char[] feedback = new char[5];
//         boolean[] usedInTarget = new boolean[5];
//         boolean[] usedInGuess = new boolean[5];

//         // First pass: mark correct positions (green)
//         for (int i = 0; i < 5; i++) {
//             if (guess.charAt(i) == target.charAt(i)) {
//                 feedback[i] = 'G';
//                 usedInTarget[i] = true;
//                 usedInGuess[i] = true;
//             }
//         }

//         // Second pass: mark correct letters in wrong positions (yellow)
//         for (int i = 0; i < 5; i++) {
//             if (usedInGuess[i]) continue;
            
//             char guessChar = guess.charAt(i);
//             boolean found = false;
            
//             for (int j = 0; j < 5; j++) {
//                 if (!usedInTarget[j] && target.charAt(j) == guessChar) {
//                     feedback[i] = 'Y';
//                     usedInTarget[j] = true;
//                     found = true;
//                     break;
//                 }
//             }
            
//             if (!found) {
//                 feedback[i] = 'B';
//             }
//         }

//         return new String(feedback);
//     }

//     /**
//      * Calculates the score for a guess
//      */
//     public double calculateScore(String guess) {
//         double entropy = computeEntropy(getPartitions(guess));
//         double maxEntropy = maxPossibleEntropy(getPartitions(guess));
//         double normalizedEntropy = entropy / maxEntropy;
        
//         // Count greens and yellows
//         String feedback = computeFeedback(guess, targetWord);
//         long greenCount = feedback.chars().filter(ch -> ch == 'G').count();
//         long yellowCount = feedback.chars().filter(ch -> ch == 'Y').count();

//         // Calculate final score
//         return (normalizedEntropy * 10.0) + 
//                 (greenCount * GREEN_SCORE) + 
//                 (yellowCount * YELLOW_SCORE) + 
//                 BASE_SCORE;
//     }

//     /**
//      * Gets the rating based on the score
//      */
//     public String getRating(double score) {
//         if (score >= 8.0) return "GREEN";
//         if (score >= 5.0) return "YELLOW";
//         if (score >= 3.0) return "ORANGE";
//         return "RED";
//     }

//     /**
//      * Evaluates a guess and returns both score and rating
//      */
//     public Map<String, Object> evaluateGuess(String guess) {
//         double score = calculateScore(guess);
//         String rating = getRating(score);
        
//         Map<String, Object> result = new HashMap<>();
//         result.put("score", score);
//         result.put("rating", rating);
//         result.put("feedback", computeFeedback(guess, targetWord));
        
//         return result;
//     } 

class WordleSolver {
    private final String targetWord;
    private final List<String> wordList;
    
    // Constants for scoring
    private static final double GREEN_SCORE = 2.0;
    private static final double YELLOW_SCORE = 1.5;
    private static final double BASE_SCORE = 1.0;
    private static final double ENTROPY_WEIGHT = 10.0;

    // Thresholds for ratings
    private static final double GREEN_THRESHOLD = 8.0;
    private static final double YELLOW_THRESHOLD = 5.0;
    private static final double ORANGE_THRESHOLD = 3.0;

    public WordleSolver(String targetWord, List<String> wordList) {
        this.targetWord = targetWord;
        this.wordList = wordList;
    }

    /**
     * Gets partitions of possible words based on feedback patterns
     */
    private Map<String, List<String>> getPartitions(String guess) {
        Map<String, List<String>> partitions = new HashMap<>();
        
        for (String possibleTarget : wordList) {
            String feedback = computeFeedback(guess, possibleTarget);
            partitions.computeIfAbsent(feedback, _ -> new ArrayList<>())
                     .add(possibleTarget);
        }
        
        return partitions;
    }

    /**
     * Computes entropy for a given partition of words
     */
    private double computeEntropy(Map<String, List<String>> partitions) {
        double entropy = 0.0;
        int totalWords = partitions.values().stream()
                .mapToInt(List::size)
                .sum();

        for (List<String> partition : partitions.values()) {
            if (partition.isEmpty()) continue;
            double probability = (double) partition.size() / totalWords;
            entropy -= probability * (Math.log(probability) / Math.log(2));
        }

        return entropy;
    }

    /**
     * Checks if a letter is in the correct position compared to the target word
     */
    private boolean isCorrectPosition(char letter, int position) {
        return targetWord.charAt(position) == letter;
    }

    /**
     * Computes the maximum possible entropy for a given partition
     */
    private double maxPossibleEntropy(Map<String, List<String>> partitions) {
        int totalWords = partitions.values().stream()
                .mapToInt(List::size)
                .sum();
        
        // Maximum entropy occurs with equal-sized partitions
        int maxPartitions = Math.min(totalWords, 243); // 3^5 possible feedback patterns
        double idealProbability = 1.0 / maxPartitions;
        return -Math.log(idealProbability) / Math.log(2);
    }

    /**
     * Computes feedback for a guess compared to the target word
     */
    private String computeFeedback(String guess, String target) {
        char[] feedback = new char[5];
        boolean[] usedInTarget = new boolean[5];
        boolean[] usedInGuess = new boolean[5];

        // First pass: mark correct positions (green)
        for (int i = 0; i < 5; i++) {
            if (guess.charAt(i) == target.charAt(i)) {
                feedback[i] = 'G';
                usedInTarget[i] = true;
                usedInGuess[i] = true;
            }
        }

        // Second pass: mark correct letters in wrong positions (yellow)
        for (int i = 0; i < 5; i++) {
            if (usedInGuess[i]) continue;
            
            char guessChar = guess.charAt(i);
            boolean found = false;
            
            for (int j = 0; j < 5; j++) {
                if (!usedInTarget[j] && target.charAt(j) == guessChar) {
                    feedback[i] = 'Y';
                    usedInTarget[j] = true;
                    found = true;
                    break;
                }
            }
            
            if (!found) {
                feedback[i] = 'B';
            }
        }

        return new String(feedback);
    }

    /**
     * Calculates the score for a guess
     */
    public double calculateScore(String guess) {
        // Calculate entropy-based score
        double entropy = computeEntropy(getPartitions(guess));
        double maxEntropy = maxPossibleEntropy(getPartitions(guess));
        double normalizedEntropy = entropy / maxEntropy;
        
        // Calculate pattern-based score
        String feedback = computeFeedback(guess, targetWord);
        long greenCount = feedback.chars().filter(ch -> ch == 'G').count();
        long yellowCount = feedback.chars().filter(ch -> ch == 'Y').count();

        // Combine scores with weights
        return (normalizedEntropy * ENTROPY_WEIGHT) + 
               (greenCount * GREEN_SCORE) + 
               (yellowCount * YELLOW_SCORE) + 
               BASE_SCORE;
    }

    /**
     * Gets the rating based on the score
     */
    public String getRating(double score) {
        if (score >= GREEN_THRESHOLD) return "GREEN";
        if (score >= YELLOW_THRESHOLD) return "YELLOW";
        if (score >= ORANGE_THRESHOLD) return "ORANGE";
        return "RED";
    }

    /**
     * Evaluates a guess and returns both score and rating
     */
    public Map<String, Object> evaluateGuess(String guess) {
        double score = calculateScore(guess);
        String rating = getRating(score);
        String feedback = computeFeedback(guess, targetWord);
        
        Map<String, Object> result = new HashMap<>();
        result.put("score", score);
        result.put("rating", rating);
        result.put("feedback", feedback);
        
        return result;
    }


    public static String getFeedback(String guess, String target) {
        char[] feedback = new char[guess.length()];
        boolean[] used = new boolean[target.length()];

        // First pass: check for greens
        for (int i = 0; i < guess.length(); i++) {
            if (guess.charAt(i) == target.charAt(i)) {
                feedback[i] = 'G'; // Green
                used[i] = true;
            } else {
                feedback[i] = 'B'; // Default to Black (Gray)
            }
        }

        // Second pass: check for yellows
        for (int i = 0; i < guess.length(); i++) {
            if (feedback[i] == 'B') {
                for (int j = 0; j < target.length(); j++) {
                    if (!used[j] && guess.charAt(i) == target.charAt(j)) {
                        feedback[i] = 'Y'; // Yellow
                        used[j] = true;
                        break;
                    }
                }
            }
        }
        return new String(feedback); // e.g., "GYYBGB"
    }



    public static double calculateEntropy(String guess, String[] targetWords) {
        HashMap<String, Integer> patternCounts = new HashMap<>();

        for (String target : targetWords) {
            String pattern = getFeedback(guess, target);
            patternCounts.put(pattern, patternCounts.getOrDefault(pattern, 0) + 1);
        }

        double entropy = 0.0;
        int totalTargets = targetWords.length;

        for (int count : patternCounts.values()) {
            double probability = (double) count / totalTargets;
            entropy -= probability * (Math.log(probability) / Math.log(2)); // H = -p * log2(p)
        }

        return entropy;
    }

    public static String findOptimalGuess(String[] allWords, String[] targetWords) {
        String bestGuess = "";
        double maxEntropy = -1;

        for (String guess : allWords) {
            double entropy = calculateEntropy(guess, targetWords);
            if (entropy > maxEntropy) {
                maxEntropy = entropy;
                bestGuess = guess;
            }
        }

        return bestGuess;
    }

    public static void playWordle(String[] allWords, String[] targetWords) {
        // Randomly choose a target word
        String target = targetWords[(int) (Math.random() * targetWords.length)];
        ArrayList<String> remainingTargets = new ArrayList<>(List.of(targetWords));

        int maxGuesses = 7;
        for (int round = 1; round <= maxGuesses; round++) {
            System.out.println("Round " + round);

            // Find the best guess
            String guess = findOptimalGuess(allWords, remainingTargets.toArray(new String[0]));
            System.out.println("Guess: " + guess);

            // Get feedback and print it
            String feedback = getFeedback(guess, target);
            System.out.println("Feedback: " + feedback);

            if (feedback.equals("GGGGGG")) {
                System.out.println("You found the word: " + target + " in " + round + " guesses!");
                return;
            }

            // Narrow down the remaining targets based on feedback
            remainingTargets.removeIf(word -> !getFeedback(guess, word).equals(feedback));
        }

        System.out.println("Failed to guess the word: " + target);
    }


    // Map for tracking letter statuses
    Map<Character, String> usedLetters = new HashMap<>();

    // Function to compute penalty
    double computePenalty(String guess) {
        double penalty = 0.0;
        for (char letter : guess.toCharArray()) {
            String status = usedLetters.getOrDefault(letter, "Unused");
            if (status.equals("Black")) penalty += 1.0;
            else if (status.equals("Yellow")) penalty += 0.1;
            // Green has no penalty
        }
        return penalty;
    }

    // /**
    //  * Computes entropy for a given partition of words
    //  */
    // private double computeEntropy(Map<String, List<String>> partitions) {
    //     double entropy = 0.0;
    //     int totalWords = partitions.values().stream()
    //             .mapToInt(List::size)
    //             .sum();

    //     for (List<String> partition : partitions.values()) {
    //         if (partition.isEmpty()) continue;
    //         double probability = (double) partition.size() / totalWords;
    //         entropy -= probability * (Math.log(probability) / Math.log(2));
    //     }

    //     return entropy;
    // }

    // /**
    //  * Checks if a letter is in the correct position compared to the target word
    //  */
    // private boolean isCorrectPosition(char letter, int position) {
    //     return targetWord.charAt(position) == letter;
    // }

    // /**
    //  * Computes the maximum possible entropy for a given partition
    //  */
    // private double maxPossibleEntropy(Map<String, List<String>> partitions) {
    //     int totalWords = partitions.values().stream()
    //             .mapToInt(List::size)
    //             .sum();
        
    //     // Maximum entropy occurs with equal-sized partitions
    //     int maxPartitions = Math.min(totalWords, 243); // 3^5 possible feedback patterns
    //     double idealProbability = 1.0 / maxPartitions;
    //     return -Math.log(idealProbability) / Math.log(2);
    // }

    // /**
    //  * Computes feedback for a guess compared to the target word
    //  */
    // private String computeFeedback(String guess, String target) {
    //     char[] feedback = new char[5];
    //     boolean[] usedInTarget = new boolean[5];
    //     boolean[] usedInGuess = new boolean[5];

    //     // First pass: mark correct positions (green)
    //     for (int i = 0; i < 5; i++) {
    //         if (guess.charAt(i) == target.charAt(i)) {
    //             feedback[i] = 'G';
    //             usedInTarget[i] = true;
    //             usedInGuess[i] = true;
    //         }
    //     }

    //     // Second pass: mark correct letters in wrong positions (yellow)
    //     for (int i = 0; i < 5; i++) {
    //         if (usedInGuess[i]) continue;
            
    //         char guessChar = guess.charAt(i);
    //         boolean found = false;
            
    //         for (int j = 0; j < 5; j++) {
    //             if (!usedInTarget[j] && target.charAt(j) == guessChar) {
    //                 feedback[i] = 'Y';
    //                 usedInTarget[j] = true;
    //                 found = true;
    //                 break;
    //             }
    //         }
            
    //         if (!found) {
    //             feedback[i] = 'B';
    //         }
    //     }

    //     return new String(feedback);
    // }


    // // Update the scoring method to use double values
    // private double calculateScore(String guess) {
    //     double entropy = computeEntropy(getPartitions(guess));
    //     double maxEntropy = maxPossibleEntropy(getPartitions(guess));
    //     double normalizedEntropy = entropy / maxEntropy;
        
    //     // Convert string scores to doubles using parseScore
    //     double greenScore = parseScore("GREEN");
    //     double yellowScore = parseScore("YELLOW");
    //     double score = parseScore("score");

    //     // Apply weights and normalize
    //     return (normalizedEntropy * 10.0) + 
    //            (greenScore * 2.0) + 
    //            (yellowScore * 1.5);
    // }

    // Adjusted entropy calculation
    double adjustedEntropy(String guess, Map<String, List<String>> partitions) {
        double baseEntropy = computeEntropy(partitions); // Original entropy
        double penalty = computePenalty(guess);
        return baseEntropy + penalty;
    }

    // Optimal guess selection
    String selectOptimalGuess(List<String> possibleGuesses, Map<String, List<String>> partitions) {
        String bestGuess = "";
        double minEntropy = Double.MAX_VALUE;
        for (String guess : possibleGuesses) {
            double entropy = adjustedEntropy(guess, partitions);
            if (entropy < minEntropy) {
                minEntropy = entropy;
                bestGuess = guess;
            }
        }
        return bestGuess;
    }

    double rateGuess(String guess, Map<Character, String> usedLetters, Map<String, List<String>> partitions) {
        // Criteria variables
        int newLetters = 0, penalizedLetters = 0, correctlyPlacedGreen = 0;
        int totalLetters = guess.length();
        int greenCount = 0;
    
        // Analyze the guess
        for (int i = 0; i < totalLetters; i++) {
            char letter = guess.charAt(i);
            String status = usedLetters.getOrDefault(letter, "Unused");
    
            if (status.equals("Unused")) newLetters++;
            else if (status.equals("Black") || status.equals("Yellow")) penalizedLetters++;
            if (status.equals("Green") && isCorrectPosition(letter, i)) correctlyPlacedGreen++;
            if (status.equals("Green")) greenCount++;
        }
    
        // Compute scores
        double newInfoScore = (double) newLetters / totalLetters;
        double penaltyScore = (double) penalizedLetters / totalLetters;
        double greenAccuracyScore = greenCount == 0 ? 1 : (double) correctlyPlacedGreen / greenCount;
    
        // Compute partition diversity score
        double diversityScore = computeEntropy(partitions) / maxPossibleEntropy(partitions);
    
        // Total weighted score
        double totalScore = (3 * newInfoScore) + (4 * diversityScore) + (2 * greenAccuracyScore) - (2 * penaltyScore);
    
        // Assign rating
        // if (totalScore >= 7) return "GREEN";
        // if (totalScore >= 4) return "ORANGE";
        // return "RED";
        return totalScore;
    }


    double computePartitionDiversity(String guess, List<String> remainingWords) {
        Map<String, Integer> feedbackGroups = new HashMap<>();
    
        // Group words by feedback pattern
        for (String target : remainingWords) {
            String feedback = computeFeedback(guess, target);
            feedbackGroups.put(feedback, feedbackGroups.getOrDefault(feedback, 0) + 1);
        }
    
        // Compute entropy
        double totalWords = remainingWords.size();
        double entropy = 0.0;
    
        for (int groupSize : feedbackGroups.values()) {
            double probability = groupSize / totalWords;
            entropy -= probability * Math.log(probability) / Math.log(2); // Base 2 logarithm
        }
    
        // Normalize entropy
        double maxEntropy = Math.log(totalWords) / Math.log(2); // Max possible entropy
        return entropy / maxEntropy; // Normalized entropy
    }
    
    

}


class Main {
    public static void main(String[] args) {
        String[] allWords = loadWords("allWords.txt"); // Load from a file
        String[] targetWords = loadWords("targetWords.txt");

        WordleSolver.playWordle(allWords, targetWords);
    }

    private static String[] loadWords(String fileName) {
        // Example of loading words from a file (not implemented)
        return new String[] {}; // Placeholder
    }
}
