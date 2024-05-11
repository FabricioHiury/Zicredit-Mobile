import {Dimensions, StyleSheet} from 'react-native';

import {horizontalScale, moderateScale, verticalScale} from '@src/common/utils';

import {DefaultTheme} from 'styled-components/native';

export function createStyles(colors: DefaultTheme['colors']) {
  return StyleSheet.create({
    container: {
      paddingHorizontal: horizontalScale(20),
      width: Dimensions.get('window').width,
    },

    containerInput: {
      borderColor: colors.gray,
      flexDirection: 'row',
      alignItems: 'center',
      borderStyle: 'solid',
      borderWidth: horizontalScale(1),
      marginTop: verticalScale(15),
      borderRadius: moderateScale(30),
      paddingLeft: horizontalScale(15),
      fontFamily: 'Poppins-Bold',
      color: colors.white,
      height: moderateScale(50),
    },

    input: {
      fontFamily: 'Poppins-Bold',
      color: colors.white,
      width: '100%',
    },

    button: {
      marginTop: verticalScale(20),
      backgroundColor: colors.pink,
      alignItems: 'center',
      justifyContent: 'center',
      height: verticalScale(50),
      borderRadius: moderateScale(30),
    },

    textButton: {
      fontFamily: 'Poppins-Bold',
      color: colors.white,
    },
  });
}
