import {StyleSheet} from 'react-native';
import {useTheme} from '../../assets/themes/ThemeContext';

export const useStyles = () => {
  const {theme} = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    profileContainer: {
      padding: 20,
      borderWidth: 1,
      borderColor: '#FFCC00',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    },
    labelText: {
      fontSize: 20,
      color: theme.colors.textColor,
      marginBottom: 10,
      fontWeight: '400',
    },
    editButton: {
      backgroundColor: '#FFCC00',
      padding: 10,
      borderRadius: 5,
      marginVertical: 10,
      marginHorizontal: 5,
      alignItems: 'center',
    },
    editButtonText: {
      color: theme.colors.input,
      fontWeight: 'bold',
      fontSize: 16,
    },
    errorText: {
      color: 'red',
      fontSize: 16,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      padding: 20,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      color: theme.colors.textColor,
    },
    input: {
      width: '100%',
      padding: 10,
      marginVertical: 10,
      borderRadius: 10,
      backgroundColor: theme.colors.input,
      color: theme.colors.textColor,
      fontSize: 16,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 10,
    },
  });
};
