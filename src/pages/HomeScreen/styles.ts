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
      padding: 10,
    },
    labelText: {
      color: theme.colors.textColor,
      fontSize: 18,
      fontWeight: 'bold',
      paddingVertical: 5,
    },
    valueText: {
      color: theme.colors.textColor,
      fontSize: 40,
      fontWeight: '700',
    },
    highlightBox: {
      borderColor: '#FFCC00',
      borderWidth: 2,
      padding: 15,
      marginVertical: 10,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    },
    fullWidthBox: {
      borderColor: '#FFCC00',
      borderWidth: 2,
      marginVertical: 10,
      width: '100%',
      justifyContent: 'center',
      borderRadius: 10,
      height: 115,
      padding: 20,
    },
    gridItem: {
      borderColor: '#FFCC00',
      borderRadius: 10,
      borderWidth: 2,
      padding: 20,
      marginVertical: 5,
      alignItems: 'flex-start',
      justifyContent: 'center',
      width: '100%',
      height: 115,
    },
    gridContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: '100%',
      marginTop: 10,
      justifyContent: 'space-between',
    },
    gridItemContainer: {
      width: '45%',
      marginVertical: 5,
    },
    projectName: {
      color: theme.colors.textColor,
      fontSize: 18,
      fontWeight: 'bold',
    },
    projectValue: {
      color: '#ffcc00',
      fontSize: 20,
      fontWeight: 'bold',
    },
    investmentRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    percentageText: {
      color: '#FFCC00',
      fontSize: 16,
      marginLeft: 10,
    },
  });
};
