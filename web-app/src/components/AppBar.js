import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home'; // Home icon from MUI
import { useNavigate } from 'react-router-dom'; // Navigation for Home
import ProfileMenu from './ProfileMenu';  // Import the ProfileMenu component

const AppHeader = () => {

    const navigate = useNavigate();

  // Navigate to Home page
  const goHome = () => {
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Home Button */}
      <IconButton onClick={goHome} sx={{ position: 'absolute', left: 10, top: 10 }} >
        <HomeIcon />
      </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: '25px', textAlign: 'left'}}>
          Tic Tac Toe
        </Typography>
        
        {/* Place ProfileMenu on the right side */}
        <Box>
          <ProfileMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
