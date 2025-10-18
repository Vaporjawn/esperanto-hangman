import { useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import GamePage from './pages/GamePage';
import { useGame } from './store/game';
import { fromXNotation } from './utils/eo';

// Create MUI theme with Esperanto color scheme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32', // Deep green
    },
    secondary: {
      main: '#1976d2',
    },
    error: {
      main: '#c62828', // Brick red
    },
    success: {
      main: '#388e3c',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Noto Sans", "Segoe UI", sans-serif',
  },
});

function App() {
  const guess = useGame(state => state.guess);

  // Global keyboard handler with x-notation support
  useEffect(() => {
    let prev: string | null = null;

    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();

      // Direct letter input (including diacritics if typed directly)
      if (k.length === 1 && /[a-zĉĝĥĵŝŭ]/i.test(k)) {
        guess(k);
        prev = k;
        return;
      }

      // X-notation: previous base letter + 'x'
      if (prev && k === 'x') {
        const diac = fromXNotation(prev, 'x');
        if (diac) {
          guess(diac);
        }
        prev = null;
        return;
      }

      // Update prev for potential x-notation sequence
      if (k.length === 1) {
        prev = k;
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [guess]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GamePage />
    </ThemeProvider>
  );
}

export default App;

