import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, RefreshControl, Text, View} from 'react-native';
import {styles} from './styles';
import {
  getProjects,
  getInvestments,
  getSellers,
  getCompanies,
  getAllInvestment,
} from '../../settings/api';
import Header from '../../components/Header';
import {useAuth} from '../../context/AuthContext/AuthContext';

export function HomeScreen() {
  const [data, setData] = useState({
    projects: 0,
    investments: 0,
    sellers: 0,
    companies: 0,
    totalInvested: 0,
    totalYield: 0,
  });
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const {userRole} = useAuth();

  const fetchData = async () => {
    setRefreshing(true);
    try {
      const projectsTotal = await getProjects();
      const investmentsTotal = await getInvestments();
      const sellersTotal = await getSellers();
      const companiesTotal = await getCompanies();
      const {totalInvested, totalYield} = await getAllInvestment();

      setData({
        totalInvested: totalInvested,
        totalYield: totalYield,
        projects: projectsTotal,
        investments: investmentsTotal,
        sellers: sellersTotal,
        companies: companiesTotal,
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
      contentContainerStyle={styles.scrollViewContent}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
      }>
      {userRole && <Header isMenu={true} userRole={userRole} />}
      <View style={styles.container}>
        {error ? (
          <Text style={styles.labelText}>
            Não foi possível carregar os dados.
          </Text>
        ) : (
          <>
            <Text style={styles.labelText}>Total Captado</Text>
            <View style={styles.fullWidthBox}>
              <Text style={styles.valueText}>{data.totalInvested}</Text>
            </View>
            <Text style={styles.labelText}>
              Valor Total a Pagar aos Investidores
            </Text>
            <View style={styles.fullWidthBox}>
              <Text style={styles.valueText}>{data.totalYield}</Text>
            </View>
            <View style={styles.gridContainer}>
              <View style={styles.gridItemContainer}>
                <Text style={styles.labelText}>
                  Empreendimentos Cadastrados
                </Text>
                <View style={styles.gridItem}>
                  <Text style={styles.valueText}>{data.projects}</Text>
                </View>
              </View>
              <View style={styles.gridItemContainer}>
                <Text style={styles.labelText}>Investidores Cadastrados</Text>
                <View style={styles.gridItem}>
                  <Text style={styles.valueText}>{data.investments}</Text>
                </View>
              </View>
              <View style={styles.gridItemContainer}>
                <Text style={styles.labelText}>Vendedores Cadastrados</Text>
                <View style={styles.gridItem}>
                  <Text style={styles.valueText}>{data.sellers}</Text>
                </View>
              </View>
              <View style={styles.gridItemContainer}>
                <Text style={styles.labelText}>Construtoras Cadastradas</Text>
                <View style={styles.gridItem}>
                  <Text style={styles.valueText}>{data.companies}</Text>
                </View>
              </View>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}

export default HomeScreen;
