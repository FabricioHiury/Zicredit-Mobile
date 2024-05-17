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
      padding: 20,
    },
    container: {
      width: '100%',
      padding: 20,
      borderRadius: 10,
    },
    input: {
      width: '100%',
      padding: 10,
      marginVertical: 10,
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: '#E1E1E1',
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
    },
    itemTextSecondary: {
      color: '#555',
    },
  });
};
