import React, { useState } from 'react';
import { Avatar, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/authSlice';  // Import your logout action
import { useNavigate } from 'react-router-dom';

const ProfileMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);  // Get user and token from Redux store

  // State to handle menu open/close
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Handle opening the menu
  const handleMenuOpen = (event) => {
    if (token) {
      setAnchorEl(event.currentTarget);  // Only open the menu if the user is logged in
    }
  };

  // Handle closing the menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle logging out
  const handleLogout = () => {
    dispatch(logoutUser());  // Dispatch the logout action
    navigate('/login');  // Navigate back to login page after logout
    handleMenuClose();  // Close the menu after logout
  };

  // Function to generate initials from the user's name
  const getUserInitials = () => {
    if (!user || !user.name) return '';

    const nameParts = user.name.split(' ');

    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();  // Single initial from first name
    } else {
      return (
        nameParts[0].charAt(0).toUpperCase() + nameParts[1].charAt(0).toUpperCase()  // Initials from first and last name
      );
    }
  };

  return (
    <div>
      {/* Avatar button */}
      <IconButton onClick={handleMenuOpen}>
        <Avatar>{token ? getUserInitials() : ''}</Avatar>  {/* Show initials if logged in, else empty */}
      </IconButton>

      {/* Show menu only if the user has a valid token */}
      {token && (
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              mt: 1.5,
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={() => navigate('/statistics')}>
            <Typography>Game Statistics</Typography>  {/* Navigate to Game Statistics page */}
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Typography>Log out</Typography>
          </MenuItem>
        </Menu>
      )}
    </div>
  );
};

export default ProfileMenu;
