import React, {useState} from 'react';
import {View, Image, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Logo from '../../assets/icons/Logo.png';
import {styles} from './styles';
import Menu from '../Menu';

interface HeaderProps {
  isMenu: boolean;
  userRole: string;
}

const Header = ({isMenu, userRole}: HeaderProps) => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.headerContainer}>
      {isMenu && (
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setMenuVisible(true)}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      )}
      <Image source={Logo} style={styles.logo} />
      <View style={styles.placeholder} />
      {userRole && (
        <Menu
          isVisible={menuVisible}
          onClose={() => setMenuVisible(false)}
          userRole={userRole}
        />
      )}
    </View>
  );
};

export default Header;
