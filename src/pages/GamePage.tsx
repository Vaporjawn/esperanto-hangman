import { Stack } from '@mui/material';
import AppShell from '../components/AppShell';
import HangmanFigure from '../components/HangmanFigure';
import WordSlots from '../components/WordSlots';
import KeyboardEO from '../components/KeyboardEO';
import StatusBar from '../components/StatusBar';
import Controls from '../components/Controls';
import { useGame } from '../store/game';

const GamePage = () => {
  const mistakeCount = useGame(state => state.wrong.size);

  return (
    <AppShell>
      <Stack spacing={2}>
        <StatusBar />
        <HangmanFigure mistakeCount={mistakeCount} />
        <WordSlots />
        <Controls />
        <KeyboardEO />
      </Stack>
    </AppShell>
  );
};

export default GamePage;
