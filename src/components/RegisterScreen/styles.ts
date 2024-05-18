import {StyleSheet} from 'react-native';
import {useTheme} from '../../assets/themes/ThemeContext';

export const useStyles = () => {
  const {theme} = useTheme();
  return StyleSheet.create({
    keyboardAvoidingView: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollViewContent: {
      flexGrow: 1,
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    container: {
      width: '100%',
      padding: 20,
    },
    input: {
      width: '100%',
      padding: 10,
      marginVertical: 10,
      borderRadius: 10,
      backgroundColor: theme.colors.input,
      fontSize: 16,
    },
    button: {
      backgroundColor: '#FFCC00',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginVertical: 10,
    },
    buttonText: {
      color: '#000',
      fontWeight: 'bold',
    },
    errorText: {
      backgroundColor: '#960018',
      padding: 10,
      color: 'white',
      textAlign: 'center',
    },
    itemContainer: {
      padding: 10,
      marginVertical: 5,
      borderWidth: 1,
      borderColor: '#CCC',
      borderRadius: 5,
    },
    itemTextPrimary: {
      fontWeight: 'bold',
      color: 'white',
    },
    itemTextSecondary: {
      color: '#555',
    },
  });
};
