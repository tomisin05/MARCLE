
const fs = require('fs');
const path = require('path');

let verbose = true;
let solutionList = [];
let dictionary = [];

function loadWordLists() {
    const wordlistPath = path.join(__dirname, 'wordlist.json');
    const dictionaryPath = path.join(__dirname, 'words.json');

    solutionList = JSON.parse(fs.readFileSync(wordlistPath));
    dictionary = JSON.parse(fs.readFileSync(dictionaryPath));
}

function getFeedback(guess, solution) {
    const result = Array(6).fill('b');
    const taken = Array(6).fill(false);

    for (let i = 0; i < 6; i++) {
        if (guess[i] === solution[i]) {
            result[i] = 'g';
            taken[i] = true;
        }
    }

    for (let i = 0; i < 6; i++) {
        if (result[i] === 'g') continue;
        for (let j = 0; j < 6; j++) {
            if (!taken[j] && guess[i] === solution[j]) {
                result[i] = 'y';
                taken[j] = true;
                break;
            }
        }
    }

    return result.join('');
}

function countEliminatedWords(guess, target, wordlist) {
    const feedback = getFeedback(guess, target);
    let eliminated = 0;
    for (const word of wordlist) {
        if (getFeedback(guess, word) !== feedback) {
            eliminated++;
        }
    }
    return eliminated;
}

function eliminateByLetterLogic(guess, feedback, wordlist) {
    const greenPositions = new Set();
    const yellowPositions = {};
    const minLetterCount = {};
    const grayLetters = new Set();

    for (let i = 0; i < 6; i++) {
        const g = guess[i];
        const f = feedback[i];

        if (f === 'g') {
            greenPositions.add(i);
            minLetterCount[g] = (minLetterCount[g] || 0) + 1;
        } else if (f === 'y') {
            yellowPositions[g] = yellowPositions[g] || new Set();
            yellowPositions[g].add(i);
            minLetterCount[g] = (minLetterCount[g] || 0) + 1;
        } else if (f === 'b') {
            grayLetters.add(g);
        }
    }

    let eliminated = 0;

    for (const word of wordlist) {
        const wordFreq = {};
        for (const ch of word) {
            wordFreq[ch] = (wordFreq[ch] || 0) + 1;
        }

        let eliminate = false;

        for (const gray of grayLetters) {
            const allowed = minLetterCount[gray] || 0;
            if (!minLetterCount.hasOwnProperty(gray) && word.includes(gray)) {
                if (verbose) console.log(`[GRAY LETTER EXISTS] ${word} rejected: contains disallowed letter '${gray}'`);
                eliminate = true;
                break;
            }
            if (wordFreq[gray] > allowed) {
                if (verbose) console.log(`[GRAY OVERUSE] ${word} rejected: '${gray}' appears ${wordFreq[gray]} times, allowed ${allowed}`);
                eliminate = true;
                break;
            }
        }

        if (eliminate) eliminated++;
    }

    return eliminated;
}

function main() {
    loadWordLists();

    const guess = "aaaaaa";
    const target = "clicks";
    const feedback = getFeedback(guess, target);

    const eliminatedByLogic = eliminateByLetterLogic(guess, feedback, solutionList);
    console.log(`${guess} eliminates ${eliminatedByLogic} words using logic-based filtering against target ${target}`);

    const eliminatedActual = countEliminatedWords(guess, target, solutionList);
    console.log(`${guess} eliminates ${eliminatedActual} words when target is ${target}`);
}

main();
