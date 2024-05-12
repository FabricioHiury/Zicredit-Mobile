import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {styles} from './styles';
import Logo from '../../assets/icons/Logo.png';
import {
  getProjects,
  getInvestments,
  getSellers,
  getCompanies,
} from '../../settings/api';

export function HomeScreen() {
  const [data, setData] = useState({
    projects: 0,
    investments: 0,
    sellers: 0,
    companies: 0,
  });
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    setRefreshing(true);
    try {
      const projectsResponse = await getProjects();
      const investmentsResponse = await getInvestments();
      const sellersResponse = await getSellers();
      const companiesResponse = await getCompanies();

      setData({
        projects: projectsResponse.data?.length || 0,
        investments: investmentsResponse.data?.length || 0,
        sellers: sellersResponse.data?.length || 0,
        companies: companiesResponse.data?.length || 0,
      });
      setError(false);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setError(true);
      Alert.alert(
        'Erro',
        'Nossos servidores estão fora do ar nesse momento, por favor, tente novamente mais tarde',
      );
    }
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
      }>
      <Image source={Logo} style={styles.logo} />
      <View style={styles.section}>
        {error ? (
          <Text style={styles.text}>Não foi possível carregar os dados.</Text>
        ) : (
          <>
            <Text style={styles.text}>Projetos: {data.projects}</Text>
            <Text style={styles.text}>Investimentos: {data.investments}</Text>
            <Text style={styles.text}>Vendedores: {data.sellers}</Text>
            <Text style={styles.text}>Empresas: {data.companies}</Text>
          </>
        )}
      </View>
    </ScrollView>
  );
}

export default HomeScreen;
