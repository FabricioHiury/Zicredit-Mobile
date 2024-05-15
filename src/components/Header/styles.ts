import {useTheme} from '../../assets/themes/ThemeContext';
import {StyleSheet} from 'react-native';

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
      height: 50,
      resizeMode: 'contain',
    },
    menuButton: {
      fontSize: 20,
    },
    menuIcon: {
      fontSize: 20,
      color: theme.colors.textColor,
    },
    arrowIcon: {
      paddingLeft: 5, 
    },
    placeholder: {
      padding: 10,
      opacity: 0,
    },
  });
};
