import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { Close as XIcon, Circle as OIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const handlePlayWithAI = () => {
    if (!token) {
      navigate('/login');
    } else {
      navigate('/game/ai');
    }
  };

  const handlePlayWithFriend = () => {
    if (!token) {
      navigate('/login');
    } else {
      navigate('/game/friend');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      textAlign="center"
    >
      <Box>
        <Typography variant="h3" color="primary" gutterBottom>
          Tic Tac Toe
        </Typography>

        <Box display="flex" justifyContent="center" mb={3}>
          <XIcon sx={{ fontSize: 75, color: '#0066b8'}} />
          <OIcon sx={{ fontSize: 75, color: '#00bfa5'}} />
        </Box>

        <Typography variant="h6" gutterBottom>
          Choose your play mode
        </Typography>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handlePlayWithAI}
        >
          With AI
        </Button>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          //onClick={handlePlayWithFriend}
        >
          With a Friend
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
