# M.A.R.C.(LE): A Wordle-Inspired Word Guessing Game with AI-Powered Guess Rating

M.A.R.C.(LE) is an advanced word guessing game inspired by Wordle, featuring AI-powered guess rating and customizable difficulty levels. This Next.js application combines the classic word puzzle gameplay with innovative features to enhance the player experience.

The game challenges players to guess a hidden word within a limited number of attempts. What sets M.A.R.C.(LE) apart is its intelligent guess rating system, which provides feedback on the quality of each guess, helping players improve their strategy as they play.

Key features include:
- AI-powered guess rating system
- Customizable difficulty levels (easy, medium, hard, impossible)
- Responsive design for both desktop and mobile devices
- Real-time feedback on guess quality
- Integration with Supabase for data persistence
- State management using MobX

## Repository Structure

```
.
├── backend/
│   ├── optimse.java
│   └── WordleGuessRater.java
├── components/
│   ├── DifficultySelector.tsx
│   ├── Guess.tsx
│   └── Qwerty.tsx
├── lib/
│   └── supabaseClient.ts
├── pages/
│   ├── _app.tsx
│   ├── api/
│   │   ├── arduino-colors.ts
│   │   ├── getGuessColors.ts
│   │   ├── hello.ts
│   │   └── rateGuess.ts
│   └── index.tsx
├── stores/
│   ├── GuessRaterStore.ts
│   └── PuzzleStore.tsx
├── styles/
│   └── globals.css
├── utils/
│   └── guessRater.ts
├── next.config.js
├── package.json
├── postcss.config.js
├── prettier.config.js
├── tailwind.config.js
├── tsconfig.json
├── wordlist.json
├── words.json
└── words2.json
```

Key Files:
- `pages/index.tsx`: Main game component
- `stores/PuzzleStore.tsx`: MobX store for game state management
- `backend/WordleGuessRater.java`: Java implementation of the guess rating algorithm
- `pages/api/`: API routes for game logic and data fetching
- `components/`: React components for game UI elements
- `lib/supabaseClient.ts`: Supabase client configuration

## Usage Instructions

### Installation

Prerequisites:
- Node.js (v14 or later)
- Yarn package manager (v1.22.22 or later)

Steps:
1. Clone the repository
2. Run `yarn install` to install dependencies
3. Set up a Supabase project and add the credentials to a `.env.local` file
4. Run `yarn dev` to start the development server

### Getting Started

1. Open the application in a web browser
2. Select a difficulty level
3. Start guessing words!

### Configuration Options

- Difficulty levels can be adjusted in `stores/PuzzleStore.tsx`
- Word lists can be modified in `words.json` and `wordlist.json`

### Common Use Cases

1. Playing a game:
   - Input: User selects "medium" difficulty and starts a new game
   - Output: Game initializes with 5 guesses allowed and a random word selected

2. Rating a guess:
   - Input: User submits the guess "HELLO"
   - Output: AI rates the guess and provides feedback (e.g., "YELLOW" for a good guess)

### Integration Patterns

- The game can be easily integrated into other web applications by importing the main game component from `pages/index.tsx`
- The guess rating algorithm (`backend/WordleGuessRater.java`) can be used independently in other Java projects

### Testing & Quality

- Run `yarn test` to execute the test suite
- Ensure all API endpoints are functioning correctly by testing with Postman or similar tools

### Troubleshooting

Common Issue: Guess not being accepted
- Problem: User's guess is not registered when pressing Enter
- Error Message: None (silent failure)
- Diagnostic Process:
  1. Check browser console for any JavaScript errors
  2. Verify that the guess is exactly 6 letters long
  3. Ensure the word exists in the `words.json` file
- Solution: If the word is valid and 6 letters long, try refreshing the page or restarting the development server

Debugging:
- To enable verbose logging, set `DEBUG=true` in your `.env.local` file
- Log files are located in `/logs/app.log` (ensure write permissions)
- Use browser developer tools to inspect network requests and component state

Performance Optimization:
- Monitor API response times, especially for the guess rating endpoint
- Use React DevTools profiler to identify any performance bottlenecks in rendering
- Consider implementing server-side rendering for initial page load if needed

## Data Flow

The M.A.R.C.(LE) game follows a unidirectional data flow:

1. User inputs a guess via the UI (Qwerty component)
2. The guess is processed by the PuzzleStore (MobX store)
3. If valid, the guess is sent to the backend API for rating
4. The API processes the guess using the WordleGuessRater
5. The rating is returned to the frontend and updated in the PuzzleStore
6. The UI re-renders to reflect the new game state and guess rating

```
[User Input] -> [PuzzleStore] -> [API] -> [WordleGuessRater]
                     ^                           |
                     |                           |
                     +---------------------------+
                     (Rating & State Update)
```

Note: The Supabase integration allows for data persistence and potential multi-player features in future iterations.