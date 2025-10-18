# Pendumulo — Esperanto Hangman

A modern, accessible hangman game built specifically for the Esperanto language, featuring all 28 Esperanto letters including the special diacritics (ĉ, ĝ, ĥ, ĵ, ŝ, ŭ).

## Features

- ✅ **Full Esperanto Support**: All 28 Esperanto letters including diacritics
- ⌨️ **X-Notation Input**: Type `cx`, `gx`, `hx`, `jx`, `sx`, `ux` to input diacritics
- 🎮 **Dual Input**: Click on-screen keyboard or use physical keyboard
- ♿ **Accessible**: WCAG compliant with ARIA labels, keyboard navigation, and screen reader support
- 📊 **Statistics**: Track games played, wins, and current streak (localStorage)
- 🎨 **Material Design**: Clean, modern UI with Material-UI components
- 🌐 **Pure Client-Side**: No backend required, works offline
- 📱 **Responsive**: Works on desktop, tablet, and mobile

## Getting Started

### Prerequisites

- Node.js 20+ (specified in `.nvmrc`)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## How to Play

1. A random Esperanto word is selected and shown as underscores
2. Guess letters by:
   - Clicking buttons on the virtual keyboard
   - Typing on your physical keyboard
   - Using x-notation: `cx` → `ĉ`, `gx` → `ĝ`, `hx` → `ĥ`, `jx` → `ĵ`, `sx` → `ŝ`, `ux` → `ŭ`
3. Each wrong guess adds a body part to the hangman figure
4. Win by guessing all letters before 6 mistakes
5. Click "Nova ludo" to start a new game

## Technology Stack

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite 7 (with experimental Rolldown)
- **UI Library**: Material-UI (MUI) v6
- **State Management**: Zustand
- **Styling**: Emotion (CSS-in-JS)
- **Validation**: Zod
- **Code Quality**: ESLint + Prettier + TypeScript strict mode

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AppShell.tsx    # Main layout wrapper
│   ├── Controls.tsx    # New game button and stats
│   ├── HangmanFigure.tsx # SVG hangman drawing (7 states)
│   ├── KeyboardEO.tsx  # Virtual Esperanto keyboard
│   ├── StatusBar.tsx   # Win/lose/playing status
│   └── WordSlots.tsx   # Letter slots display
├── data/
│   └── words-eo.json   # 250+ Esperanto words
├── pages/
│   └── GamePage.tsx    # Main game page
├── store/
│   └── game.ts         # Zustand game state
├── utils/
│   └── eo.ts           # Esperanto language utilities
├── types.ts            # TypeScript type definitions
├── App.tsx             # Root component with theme
└── main.tsx            # Entry point
```

## Esperanto Alphabet

The game uses the complete 28-letter Esperanto alphabet:

```
a b c ĉ d e f g ĝ h ĥ i j ĵ k l m n o p r s ŝ t u ŭ v z
```

Note: Esperanto does not use q, w, x, y (except in x-notation).

## Accessibility Features

- ✅ **ARIA Labels**: All interactive elements have descriptive labels
- ✅ **Keyboard Navigation**: Full keyboard support with visible focus indicators
- ✅ **Screen Readers**: Game state announcements via `aria-live`
- ✅ **High Contrast**: Clear focus rings and color contrasts
- ✅ **Semantic HTML**: Proper heading hierarchy and landmarks

## Configuration

### LocalStorage Keys

- `ehm-stats`: Game statistics (games, wins, streak)
- `ehm-settings`: Game settings (maxMistakes, allowHints)

### Customization

Edit `src/App.tsx` to customize the theme:

```typescript
const theme = createTheme({
  palette: {
    primary: { main: '#2e7d32' }, // Deep green
    error: { main: '#c62828' },   // Brick red
  },
});
```

## Development

### Code Quality Tools

```bash
# Run ESLint
npx eslint src

# Format code with Prettier
npx prettier --write src

# Type check
npx tsc --noEmit
```

### Adding Words

Edit `src/data/words-eo.json` to add or modify words:

```json
[
  "hundo",
  "kato",
  "domo"
]
```

All words should be:
- Lowercase
- NFC normalized
- Valid Esperanto words
- Without spaces or hyphens

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 14+, Chrome Mobile

## License

MIT

## Acknowledgments

- Word list curated from common Esperanto vocabulary
- Inspired by the classic Hangman game
- Built with ❤️ for the Esperanto community

