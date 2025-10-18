import { Box, Typography } from '@mui/material';
import { useGame } from '../store/game';
import { useMemo } from 'react';

const WordSlots = () => {
  const secret = useGame(state => state.secret);
  const guessed = useGame(state => state.guessed);
  const phase = useGame(state => state.phase);

  // Compute masked word with useMemo to prevent unnecessary recalculations
  const maskedWord = useMemo(() => {
    return [...secret].map(letter => (guessed.has(letter) ? letter : '_'));
  }, [secret, guessed]);

  // Show full word if game is lost
  const displayWord = phase === 'lost' ? [...secret] : maskedWord;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: 1,
        my: 3,
        flexWrap: 'wrap',
      }}
      role="region"
      aria-label="Vorto divenenda"
    >
      {displayWord.map((letter, index) => (
        <Box
          key={index}
          sx={{
            width: 40,
            height: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: '3px solid',
            borderColor: 'primary.main',
          }}
          aria-label={letter === '_' ? 'nekonata litero' : `litero ${letter}`}
        >
          <Typography
            variant="h4"
            component="span"
            sx={{
              fontWeight: 'bold',
              color: phase === 'lost' && maskedWord[index] === '_' ? 'error.main' : 'text.primary',
            }}
          >
            {letter === '_' ? '' : letter}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default WordSlots;
