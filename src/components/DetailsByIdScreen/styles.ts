import {useTheme} from '../../assets/themes/ThemeContext';
import {StyleSheet} from 'react-native';

export const useStyles = () => {
  const {theme} = useTheme();
  return StyleSheet.create({
    scrollViewContent: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      padding: 10,
    },
    detailsContainer: {
      width: '90%',
      padding: 20,
      borderRadius: 10,
      borderColor: '#FFCC00',
      borderWidth: 1,
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    itemTextPrimary: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.colors.textColor,
    },
    itemTextSecondary: {
      fontSize: 16,
      fontWeight: '400',
      color: theme.colors.textColor,
    },
    errorText: {
      fontSize: 18,
      color: theme.colors.textColor,
      textAlign: 'center',
      marginVertical: 16,
    },
    labelText: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.textColor,
      marginBottom: 8,
    },
  });
};
