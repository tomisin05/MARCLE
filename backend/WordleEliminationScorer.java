import java.nio.file.*;
import java.util.*;
import com.fasterxml.jackson.databind.ObjectMapper;

public class WordleEliminationScorer {

    private static boolean verbose = true;

    private static List<String> solutionList;
    private static List<String> dictionary;

    public static void main(String[] args) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        solutionList = Arrays.asList(mapper.readValue(
                Paths.get("C:\\Users\\tomis\\Downloads\\Marcle - Copy\\wordlist.json").toFile(), String[].class));
        dictionary = Arrays.asList(mapper.readValue(
                Paths.get("C:\\Users\\tomis\\Downloads\\Marcle - Copy\\words.json").toFile(), String[].class));

        // Score all guesses
        // for (String guess : dictionary) {
        // double avgEliminated = calculateExpectedEliminations(guess, solutionList);
        // System.out.printf("%s eliminates %.2f words on average\n", guess,
        // avgEliminated);
        // }

        String guess = "aaaaaa";
        String target = "clicks";
        String feedback = getFeedback(guess, target);

        int eliminated = eliminateByLetterLogic(guess, feedback, solutionList);
        System.out.printf("%s eliminates %d words using logic-based filtering against target %s\n", guess, eliminated,
                target);

        // double avgEliminated = calculateExpectedEliminations(guess, solutionList);
        int eliminatedActual = countEliminatedWords(guess, target, solutionList);

        // System.out.printf("%s eliminates %.2f words on average\n", guess,
        // avgEliminated);
        System.out.printf("%s eliminates %d words when target is %s\n", guess, eliminatedActual, target);
    }

    public static double calculateExpectedEliminations(String guess, List<String> possibleSolutions) {
        Map<String, Integer> feedbackCounts = new HashMap<>();

        for (String solution : possibleSolutions) {
            String feedback = getFeedback(guess, solution);
            feedbackCounts.put(feedback, feedbackCounts.getOrDefault(feedback, 0) + 1);
        }

        int total = possibleSolutions.size();
        double expectedRemaining = 0;

        for (int count : feedbackCounts.values()) {
            double p = (double) count / total;
            expectedRemaining += p * count; // Expected size of remaining solution list
        }

        return total - expectedRemaining; // Expected number of words eliminated
    }

    public static int countEliminatedWords(String guess, String target, List<String> currentSolutions) {
        String actualFeedback = getFeedback(guess, target);

        int eliminated = 0;
        for (String word : currentSolutions) {
            if (!getFeedback(guess, word).equals(actualFeedback)) {
                eliminated++;
            }
        }
        return eliminated;
    }

    // public static int eliminateByLetterLogic(String guess, String feedback,
    // List<String> wordlist) {
    // Set<Integer> greenPositions = new HashSet<>();
    // Map<Character, Set<Integer>> yellowPositions = new HashMap<>();
    // Map<Character, Integer> letterCounts = new HashMap<>();
    // Set<Character> confirmedLetters = new HashSet<>();
    // Map<Character, Integer> maxAllowed = new HashMap<>();

    // // Analyze feedback
    // for (int i = 0; i < 6; i++) {
    // char gChar = guess.charAt(i);
    // char fChar = feedback.charAt(i);

    // letterCounts.put(gChar, letterCounts.getOrDefault(gChar, 0) + 1);

    // if (fChar == 'g') {
    // greenPositions.add(i);
    // confirmedLetters.add(gChar);
    // } else if (fChar == 'y') {
    // yellowPositions.computeIfAbsent(gChar, k -> new HashSet<>()).add(i);
    // confirmedLetters.add(gChar);
    // }
    // }

    // // Count how many times each letter is confirmed (yellow or green)
    // for (char c : confirmedLetters) {
    // int count = 0;
    // for (int i = 0; i < 6; i++) {
    // if (guess.charAt(i) == c && (feedback.charAt(i) == 'g' || feedback.charAt(i)
    // == 'y')) {
    // count++;
    // }
    // }
    // maxAllowed.put(c, count);
    // }

    // int eliminated = 0;

    // for (String word : wordlist) {
    // boolean eliminate = false;
    // Map<Character, Integer> wordFreq = new HashMap<>();

    // // Count letter frequencies
    // for (char ch : word.toCharArray()) {
    // wordFreq.put(ch, wordFreq.getOrDefault(ch, 0) + 1);
    // }

    // // Green: must match exact positions
    // for (int i = 0; i < 6; i++) {
    // if (feedback.charAt(i) == 'g' && word.charAt(i) != guess.charAt(i)) {
    // eliminate = true;
    // break;
    // }
    // }

    // if (eliminate) {
    // eliminated++;
    // continue;
    // }

    // // Yellow: must contain the letter, but not in that position
    // for (Map.Entry<Character, Set<Integer>> entry : yellowPositions.entrySet()) {
    // char ch = entry.getKey();
    // if (!word.contains("" + ch)) {
    // eliminate = true;
    // break;
    // }
    // for (int pos : entry.getValue()) {
    // if (word.charAt(pos) == ch) {
    // eliminate = true;
    // break;
    // }
    // }
    // if (eliminate)
    // break;
    // }

    // if (eliminate) {
    // eliminated++;
    // continue;
    // }

    // // Gray: letters not in confirmed set should not appear in word
    // for (int i = 0; i < 6; i++) {
    // if (feedback.charAt(i) == 'b') {
    // char ch = guess.charAt(i);
    // if (!confirmedLetters.contains(ch) && word.contains("" + ch)) {
    // eliminate = true;
    // break;
    // }

    // // Handle overguessing letters (e.g. 2 e's when only 1 allowed)
    // int allowed = maxAllowed.getOrDefault(ch, 0);
    // if (wordFreq.getOrDefault(ch, 0) > allowed) {
    // eliminate = true;
    // break;
    // }
    // }
    // }

    // if (eliminate) {
    // eliminated++;
    // }
    // }

    // return eliminated;
    // }

    public static int eliminateByLetterLogic(String guess, String feedback, List<String> wordlist) {
        Set<Integer> greenPositions = new HashSet<>();
        Map<Character, Set<Integer>> yellowPositions = new HashMap<>();
        Map<Character, Integer> minLetterCount = new HashMap<>();
        Map<Character, Integer> exactGreenCount = new HashMap<>();
        Set<Character> grayLetters = new HashSet<>();

        // Step 1: Parse Feedback
        for (int i = 0; i < 6; i++) {
            char g = guess.charAt(i);
            char f = feedback.charAt(i);

            if (f == 'g') {
                greenPositions.add(i);
                exactGreenCount.put(g, exactGreenCount.getOrDefault(g, 0) + 1);
                minLetterCount.put(g, minLetterCount.getOrDefault(g, 0) + 1);
            } else if (f == 'y') {
                yellowPositions.computeIfAbsent(g, k -> new HashSet<>()).add(i);
                minLetterCount.put(g, minLetterCount.getOrDefault(g, 0) + 1);
            } else if (f == 'b') {
                grayLetters.add(g);
            }
        }

        int eliminated = 0;

        for (String word : wordlist) {
            boolean eliminate = false;
            Map<Character, Integer> wordFreq = new HashMap<>();

            for (char c : word.toCharArray()) {
                wordFreq.put(c, wordFreq.getOrDefault(c, 0) + 1);
            }

            // Check green positions
            // for (int i : greenPositions) {
            // if (word.charAt(i) != guess.charAt(i)) {
            // if (verbose) {
            // System.out.printf("[GREEN MISMATCH] %s rejected: expected '%c' at pos %d,
            // found '%c'\n", word,
            // guess.charAt(i), i, word.charAt(i));
            // }
            // eliminate = true;
            // break;
            // }
            // }

            // if (eliminate) {
            // eliminated++;
            // continue;
            // }

            // Check yellow constraints
            // for (Map.Entry<Character, Set<Integer>> entry : yellowPositions.entrySet()) {
            // char ch = entry.getKey();
            // if (!word.contains("" + ch)) {
            // if (verbose) {
            // System.out.printf("[YELLOW MISSING] %s rejected: expected '%c' somewhere\n",
            // word, ch);
            // }
            // eliminate = true;
            // break;
            // }
            // for (int i : entry.getValue()) {
            // if (word.charAt(i) == ch) {
            // if (verbose) {
            // System.out.printf("[YELLOW POSITION VIOLATION] %s rejected: '%c' found at pos
            // %d\n", word,
            // ch, i);
            // }
            // eliminate = true;
            // break;
            // }
            // }
            // if (eliminate)
            // break;
            // }

            // if (eliminate) {
            // eliminated++;
            // continue;
            // }

            // Check letter count minimums
            // for (Map.Entry<Character, Integer> e : minLetterCount.entrySet()) {
            // if (wordFreq.getOrDefault(e.getKey(), 0) < e.getValue()) {
            // if (verbose) {
            // System.out.printf("[LETTER COUNT TOO LOW] %s rejected: needs at least %d of
            // '%c'\n", word,
            // e.getValue(), e.getKey());
            // }
            // eliminate = true;
            // break;
            // }
            // }

            // if (eliminate) {
            // eliminated++;
            // continue;
            // }

            // Check gray letters (only if they aren't green/yellow)
            for (char gray : grayLetters) {
                if (!minLetterCount.containsKey(gray)) {
                    if (word.contains("" + gray)) {
                        if (verbose) {
                            System.out.printf("[GRAY LETTER EXISTS] %s rejected: contains disallowed letter '%c'\n",
                                    word, gray);
                        }
                        eliminate = true;
                        break;
                    }
                } else {
                    // If gray occurs more times than allowed
                    int allowed = minLetterCount.getOrDefault(gray, 0);
                    if (wordFreq.getOrDefault(gray, 0) > minLetterCount.getOrDefault(gray, 0)) {
                        if (verbose) {
                            System.out.printf("[GRAY OVERUSE] %s rejected: '%c' appears %d times, allowed %d\n", word,
                                    gray, wordFreq.get(gray), allowed);
                        }
                        eliminate = true;
                        break;
                    }
                }
            }

            if (eliminate) {
                eliminated++;
            }
        }

        return eliminated;
    }

    public static String getFeedback(String guess, String solution) {
        char[] result = new char[6];
        boolean[] taken = new boolean[6];

        // Green pass
        for (int i = 0; i < 6; i++) {
            if (guess.charAt(i) == solution.charAt(i)) {
                result[i] = 'g';
                taken[i] = true;
            }
        }

        // Yellow and gray pass
        for (int i = 0; i < 6; i++) {
            if (result[i] == 'g')
                continue;
            boolean found = false;
            for (int j = 0; j < 6; j++) {
                if (!taken[j] && guess.charAt(i) == solution.charAt(j)) {
                    result[i] = 'y';
                    taken[j] = true;
                    found = true;
                    break;
                }
            }
            if (!found)
                result[i] = 'b';
        }

        // System.out.printf("Guess: %s -> %s, Solution: %s\n", guess, new
        // String(result), solution);
        return new String(result);
    }
}
