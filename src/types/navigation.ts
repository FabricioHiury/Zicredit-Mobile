import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  DataList: {type: 'projects' | 'investments' | 'sellers' | 'companies'};
  Profile: undefined;
  Details: {id: string; type: 'projects' | 'user' | 'sellers' | 'companies'};
  RegisterCompany: undefined;
  RegisterProject: undefined;
  RegisterSeller: undefined;
  RegisterInvestorScreen: undefined;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

export type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};
