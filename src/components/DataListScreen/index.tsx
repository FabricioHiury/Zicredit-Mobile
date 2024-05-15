import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import {useStyles} from './styles';
import {
  getProjects,
  getInvestments,
  getSellers,
  getCompanies,
} from '../../settings/api';
import {useAuth} from '../../context/AuthContext/AuthContext';
import Header from '../Header';

const fetchDataFunctionMap = {
  projects: getProjects,
  investments: getInvestments,
  sellers: getSellers,
  companies: getCompanies,
};

type DataListScreenProps = {
  route: {
    params: {
      type: 'projects' | 'investments' | 'sellers' | 'companies';
    };
  };
};

const renderItem = (item: any, type: string, styles: any) => {
  let primaryText = '';
  let secondaryText = '';

  switch (type) {
    case 'companies':
      primaryText = item.name;
      secondaryText = item.address;
      break;
    case 'projects':
      primaryText = item.name;
      secondaryText = item.location;
      break;
    case 'investments':
      primaryText = item.name;
      secondaryText = item.cpf;
      break;
    case 'sellers':
      primaryText = item.name;
      secondaryText = item.cpf;
      break;
    default:
      primaryText = 'Unknown';
      secondaryText = 'Unknown';
  }

  return (
    <View key={item.id} style={styles.itemContainer}>
      <Text style={styles.itemTextPrimary}>{primaryText}</Text>
      <Text style={styles.itemTextSecondary}>{secondaryText}</Text>
    </View>
  );
};

export function DataListScreen({route}: DataListScreenProps) {
  const {type} = route.params;
  const styles = useStyles();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const {userRole} = useAuth();

  const fetchData = async () => {
    setLoading(true);
    try {
      const fetchFunction = fetchDataFunctionMap[type];
      if (fetchFunction) {
        const result = await fetchFunction();
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
          data.map(item => renderItem(item, type, styles))
        )}
      </View>
    </ScrollView>
  );
}

export default DataListScreen;
