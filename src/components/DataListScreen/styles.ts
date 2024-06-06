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
      width: '100%',
      padding: 10,
      backgroundColor: theme.colors.background,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      borderRadius: 10,
      borderColor: '#FFCC00',
      borderWidth: 1,
      justifyContent: 'flex-start',
      marginBottom: 10,
      alignSelf: 'stretch',
      minHeight: 115,
    },
    itemContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    itemImage: {
      width: 50,
      height: 50,
      marginRight: 10,
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      resizeMode: 'cover',
    },
    textContainer: {
      flex: 1,
      flexShrink: 1,
    },
    itemTextPrimary: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.colors.textColor,
      flexWrap: 'wrap',
    },
    itemTextSecondary: {
      fontSize: 16,
      fontWeight: '400',
      color: theme.colors.textColor,
      flexWrap: 'wrap',
    },
    errorText: {
      fontSize: 18,
      color: theme.colors.textColor,
      textAlign: 'center',
      marginVertical: 16,
    },
  });
};
