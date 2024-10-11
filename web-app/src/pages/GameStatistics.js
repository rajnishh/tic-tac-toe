import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';

const GameStatistics = () => {
  const { wins, losses, draws } = useSelector((state) => state.stats);  // Get stats from Redux store

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      <Typography variant="h4">Game Statistics</Typography>

      <Box mt={3}>
        <Typography variant="h6">Wins: {wins}</Typography>
        <Typography variant="h6">Losses: {losses}</Typography>
        <Typography variant="h6">Draws: {draws}</Typography>
      </Box>
    </Box>
  );
};

export default GameStatistics;
