import 'styled-components/native';

import { CustomDefaultTheme } from './themeTypes';

declare module 'styled-components/native' {
  export interface DefaultTheme extends CustomDefaultTheme {}
}
