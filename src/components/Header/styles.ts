import {StyleSheet} from 'react-native';
import {useTheme} from '../../assets/themes/ThemeContext';

export const useStyles = () => {
  const {theme} = useTheme();

  return StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      width: '100%',
      backgroundColor: theme.colors.backgroundHeader,
    },
    logo: {
      width: 100,
      height: 40,
      resizeMode: 'contain',
    },
    menuButton: {},
    menuIcon: {
      fontSize: 24,
      color: theme.colors.textColor,
    },
    placeholder: {
      padding: 10,
      opacity: 0,
    },
  });
};
