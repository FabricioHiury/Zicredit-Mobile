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
      color: theme.colors.textColor,
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
    modalContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 20,
    },
    searchInput: {
      width: '100%',
      padding: 10,
      marginVertical: 10,
      borderRadius: 10,
      backgroundColor: theme.colors.input,
      color: theme.colors.textColor,
    },
    closeButton: {
      backgroundColor: '#FFCC00',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginVertical: 10,
    },
    closeButtonText: {
      color: '#000',
      fontWeight: 'bold',
    },
    companyInputText: {
      color: theme.colors.textColor,
    },
    companyItemText: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#CCC',
    },
    dataResults: {
      width: '100%',
      padding: 10,
      color: theme.colors.textColor,
      borderWidth: 1,
      borderColor: '#FFCC00',
      borderRadius: 10,
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 10,
    },
    placeholderText: {
      color: theme.colors.placeholder,
    },
    selectInput: {
      width: '100%',
      padding: 10,
      marginVertical: 10,
      borderRadius: 10,
      backgroundColor: theme.colors.input,
      fontSize: 20,
      color: theme.colors.textColor,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: theme.colors.textColor,
    },
    uploadButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      marginVertical: 10,
      backgroundColor: theme.colors.background,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.placeholder,
      borderStyle: 'dashed',
    },
    uploadButtonText: {
      marginLeft: 10,
      fontSize: 16,
      color: theme.colors.textColor,
    },
  });
};
