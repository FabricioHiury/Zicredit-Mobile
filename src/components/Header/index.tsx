import React, {useState} from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import Logo from '../../assets/icons/Logo.png';
import LogoLightMode from '../../assets/icons/Logo-LightMode.png';
import Menu from '../Menu';
import {useStyles} from './styles';
import { useTheme } from '../../assets/themes/ThemeContext';

interface HeaderProps {
  isMenu: boolean;
  userRole: string;
}

const Header: React.FC<HeaderProps> = ({isMenu, userRole}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const styles = useStyles();
  const {darkMode} = useTheme();

  return (
    <View style={styles.headerContainer}>
      {isMenu && (
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setMenuVisible(true)}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      )}
      <Image source={darkMode ? Logo : LogoLightMode} style={styles.logo} />
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
