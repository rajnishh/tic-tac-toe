import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Menu, Button, Provider } from 'react-native-paper';
import { logoutUser } from '../redux/slices/authSlice';
import { useNavigation } from '@react-navigation/native';

const ProfileMenu = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user, token } = useSelector((state) => state.auth);

  // State to handle menu open/close
  const [visible, setVisible] = useState(false);

  // Handle opening the menu
  const openMenu = () => {
    if (token) {
      setVisible(true);
    }
  };

  // Handle closing the menu
  const closeMenu = () => {
    setVisible(false);
  };

  // Handle logging out
  const handleLogout = () => {
    dispatch(logoutUser());  // Dispatch the logout action
    navigation.navigate('LoginScreen');  // Navigate back to login screen
    closeMenu();  // Close the menu after logout
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
    <Provider>
      <View style={styles.container}>
        {/* Avatar button */}
        <TouchableOpacity onPress={openMenu}>
          <Avatar.Text size={40} label={token ? getUserInitials() : ''} />
        </TouchableOpacity>

        {/* Menu */}
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Button onPress={openMenu}>Open Menu</Button>
          }
        >
          <Menu.Item
            onPress={() => {
              navigation.navigate('GameStats');  // Navigate to Game Stats screen
              closeMenu();
            }}
            title="Game Statistics"
          />
          <Menu.Item onPress={handleLogout} title="Log out" />
        </Menu>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
});

export default ProfileMenu;
