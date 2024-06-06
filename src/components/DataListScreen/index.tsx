import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  Alert,
  RefreshControl,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useStyles} from './styles';
import {
  getProjectsByCompanyId,
  getSellers,
  getCompanies,
  getProjects,
  getInvestments,
  getInvestorsByCompanyAndUserId,
} from '../../settings/api';
import {useAuth} from '../../context/AuthContext/AuthContext';
import Header from '../Header';
import {useNavigation} from '@react-navigation/native';

const fetchDataFunctionMap = {
  projects: getProjects,
  investments: getInvestments,
  sellers: getSellers,
  companies: getCompanies,
  projectsByCompany: getProjectsByCompanyId,
  investmentsByCompany: getInvestorsByCompanyAndUserId,
};

type DataListScreenProps = {
  route: {
    params: {
      type: 'projects' | 'investments' | 'sellers' | 'companies';
    };
  };
};

const renderItem = (
  item: any,
  type: string,
  styles: any,
  navigation: any,
  userRole: string,
) => {
  let primaryText = '';
  let secondaryText = '';
  let id = item.id;
  let itemType = type;
  let imageUrl = '';

  if (userRole === 'COMPANY') {
    switch (type) {
      case 'investments':
        primaryText = item.name;
        secondaryText = item.cpf;
        break;
      case 'projects':
        primaryText = item.name;
        secondaryText = item.location;
        break;
      default:
        primaryText = 'Unknown';
        secondaryText = 'Unknown';
    }
  } else {
    switch (type) {
      case 'companies':
        primaryText = item.name;
        secondaryText = item.address;
        imageUrl = item.logo;
        break;
      case 'projects':
        primaryText = item.name;
        secondaryText = item.location;
        break;
      case 'investments':
        primaryText = item.user?.name || 'Unknown Investor';
        secondaryText = item.user?.cpf || 'No CPF';
        id = item.userId;
        itemType = 'user';
        break;
      case 'sellers':
        primaryText = item.name;
        secondaryText = item.cpf;
        break;
      default:
        primaryText = 'Unknown';
        secondaryText = 'Unknown';
    }
  }

  return (
    <TouchableOpacity
      key={item.id}
      style={styles.itemContainer}
      onPress={() => {
        if (userRole === 'COMPANY' && type === 'investments') {
          navigation.navigate('Details', {id, type: itemType, data: item});
        } else {
          navigation.navigate('Details', {id, type: itemType});
        }
      }}>
      <View style={styles.itemContent}>
        {type === 'companies' && imageUrl ? (
          <Image source={{uri: imageUrl}} style={styles.itemImage} />
        ) : null}
        <View style={styles.textContainer}>
          <Text style={styles.itemTextPrimary}>{primaryText}</Text>
          <Text style={styles.itemTextSecondary}>{secondaryText}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export function DataListScreen({route}: DataListScreenProps) {
  const {type} = route.params;
  const styles = useStyles();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const {userRole, companyId} = useAuth();
  const navigation = useNavigation();

  const fetchData = async () => {
    setLoading(true);
    setRefreshing(true);
    try {
      let fetchFunction;

      console.log('UserRole:', userRole);
      console.log('CompanyId:', companyId);

      if (userRole === 'COMPANY') {
        fetchFunction =
          type === 'projects'
            ? fetchDataFunctionMap.projectsByCompany
            : fetchDataFunctionMap.investmentsByCompany;
      } else {
        fetchFunction = fetchDataFunctionMap[type];
      }

      if (fetchFunction) {
        const result =
          userRole === 'COMPANY'
            ? await fetchFunction(companyId)
            : await fetchFunction();
        setData(Array.isArray(result) ? result : []);
        setError(false);
      } else {
        throw new Error('Tipo de dado inválido');
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setError(true);
      Alert.alert(
        'Erro',
        'Não foi possível carregar os dados. Por favor, tente novamente mais tarde.',
      );
    }
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, [type]);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
      }>
      {userRole && <Header isMenu={true} userRole={userRole} />}
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : error ? (
          <Text style={styles.errorText}>
            Não foi possível carregar os dados.
          </Text>
        ) : data.length === 0 ? (
          <Text style={styles.errorText}>Nenhum dado disponível.</Text>
        ) : (
          data.map(item => renderItem(item, type, styles, navigation, userRole))
        )}
      </View>
    </ScrollView>
  );
}

export default DataListScreen;
