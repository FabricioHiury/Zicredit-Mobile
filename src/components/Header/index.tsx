import React, {useEffect, useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Logo from '../../assets/icons/Logo.png';
import LogoLightMode from '../../assets/icons/Logo-LightMode.png';
import Menu from '../Menu';
import {useStyles} from './styles';
import {useTheme} from '../../assets/themes/ThemeContext';

interface HeaderProps {
  isMenu: boolean;
  userRole: string;
}

const Header: React.FC<HeaderProps> = ({isMenu, userRole}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const styles = useStyles();
  const {darkMode} = useTheme();
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // Hook to detect if the screen is focused

  useEffect(() => {
    if (!isFocused) {
      setMenuVisible(false); // Close menu when the screen is not focused
    }
  }, [isFocused]);

  const handlePress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      setMenuVisible(true);
    }
  };

  const iconName = navigation.canGoBack() ? 'arrow-back-ios' : 'menu';
  const iconStyle = navigation.canGoBack() ? styles.arrowIcon : {};

  return (
    <View style={styles.headerContainer}>
      {isMenu && (
        <TouchableOpacity
          style={[styles.menuButton, iconStyle]}
          onPress={handlePress}>
          <Icon name={iconName} size={24} color={darkMode ? '#fff' : '#000'} />
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
