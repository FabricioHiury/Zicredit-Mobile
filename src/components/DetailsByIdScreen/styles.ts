import {useTheme} from '../../assets/themes/ThemeContext';
import {StyleSheet} from 'react-native';

export const useStyles = () => {
  const {theme} = useTheme();
  return StyleSheet.create({
    scrollViewContent: {
      flexGrow: 1,
      backgroundColor: theme.colors.background,
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    detailsContainer: {
      width: '100%',
      alignItems: 'flex-start',
      backgroundColor: theme.colors.background,
      padding: 10,
      gap: 10,
    },
    projectTitle: {
      fontSize: 22,
      fontWeight: '500',
      color: '#FFFFFF',
      marginBottom: 20,
      alignSelf: 'center',
    },
    highlightBox: {
      borderColor: '#FFCC00',
      borderWidth: 2,
      padding: 15,
      marginVertical: 10,
      width: '100%',
      alignItems: 'flex-start',
      justifyContent: 'center',
      borderRadius: 10,
    },
    labelText: {
      color: theme.colors.textColor,
      fontSize: 18,
      fontWeight: 'bold',
      paddingVertical: 5,
      alignSelf: 'flex-start',
      paddingHorizontal: 5,
    },
    valueText: {
      color: theme.colors.textColor,
      fontSize: 40,
      fontWeight: '700',
      alignSelf: 'flex-start',
    },
    addressText: {
      color: theme.colors.textColor,
      fontSize: 22,
      fontWeight: '500',
    },
    errorText: {
      fontSize: 18,
      color: theme.colors.textColor,
      textAlign: 'center',
      marginVertical: 16,
    },
    projectName: {
      color: theme.colors.textColor,
      fontSize: 18,
      fontWeight: 'bold',
    },
    projectValue: {
      color: theme.colors.textColor,
      fontSize: 16,
      fontWeight: '400',
    },
  });
};
