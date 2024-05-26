import React, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {useStyles} from './styles';
import {
  getTotalProjects,
  getTotalInvestments,
  getTotalSellers,
  getTotalCompanies,
  getAllInvestment,
  getTotalInvestedByCompany,
  getInvestorsCountByCompanyId,
  getActiveProjectsCountByCompanyId,
  getInvestorById,
} from '../../settings/api';
import Header from '../../components/Header';
import {useAuth} from '../../context/AuthContext/AuthContext';
import {HomeScreenProps} from '../../types/navigation';

export function HomeScreen({navigation}: HomeScreenProps) {
  const styles = useStyles();
  const [data, setData] = useState<any>({
    projects: 0,
    investments: 0,
    sellers: 0,
    companies: 0,
    totalInvested: 0,
    totalYield: 0,
    investors: 0,
  });
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const {userRole, companyId, userId, loading: authLoading} = useAuth();

  const fetchData = async () => {
    if (!userRole || (!companyId && userRole === 'COMPANY') || !userId) return;

    setRefreshing(true);
    try {
      if (userRole === 'COMPANY' && companyId) {
        const totalInvested = await getTotalInvestedByCompany(companyId);
        const companyInvestors = await getInvestorsCountByCompanyId(companyId);
        const companyProjects = await getActiveProjectsCountByCompanyId(
          companyId,
        );

        setData({
          totalInvested: totalInvested || 0,
          totalYield: 0,
          projects: companyProjects.projectsCount || 0,
          investments: 0,
          sellers: 0,
          companies: 0,
          investors: companyInvestors.investorsCount || 0,
        });
      } else if (userRole === 'INVESTOR' && userId) {
        const investorData = await getInvestorById(userId);
        setData({
          totalInvested: investorData.response.totalInvested || 0,
          totalYield: investorData.response.totalMonthlyYield || 0,
          investments: investorData.response.investments || [],
        });
      } else {
        const projectsTotal = await getTotalProjects();
        const investmentsTotal = await getTotalInvestments();
        const sellersTotal = await getTotalSellers();
        const companiesTotal = await getTotalCompanies();
        const {totalInvested, totalYield} = await getAllInvestment();

        setData({
          totalInvested: totalInvested || 0,
          totalYield: totalYield || 0,
          projects: projectsTotal || 0,
          investments: investmentsTotal || 0,
          sellers: sellersTotal || 0,
          companies: companiesTotal || 0,
          investors: 0,
        });
      }
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
    if (!authLoading && userRole) {
      fetchData();
    }
  }, [authLoading, companyId, userRole, userId]);

  if (authLoading || !userRole) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const handleNavigation = (
    type: 'projects' | 'investments' | 'sellers' | 'companies',
  ) => {
    navigation.navigate('DataList', {type});
  };

  const handleProjectNavigation = (projectId: string) => {
    navigation.navigate('Details', {id: projectId, type: 'projects'});
  };

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
        ) : userRole === 'INVESTOR' ? (
          <>
            <Text style={styles.labelText}>Valor Total Investido</Text>
            <View style={styles.highlightBox}>
              <Text style={styles.valueText}>
                R${' '}
                {data.totalInvested?.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) || '0,00'}
              </Text>
            </View>
            <Text style={styles.labelText}>Estimativa da retirada mensal</Text>
            <View style={styles.highlightBox}>
              <Text style={styles.valueText}>
                R${' '}
                {data.totalYield?.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) || '0,00'}
              </Text>
            </View>
            <Text style={styles.labelText}>
              Investimentos por empreendimento
            </Text>
            {Array.isArray(data.investments) && data.investments.length > 0 ? (
              data.investments.map((investment: any, index: number) => (
                <TouchableOpacity
                  key={index}
                  style={styles.highlightBox}
                  onPress={() => handleProjectNavigation(investment.projectId)}>
                  <Text style={styles.projectName}>
                    {investment.project.name}
                  </Text>
                  <View style={styles.investmentRow}>
                    <Text style={styles.projectValue}>
                      R${' '}
                      {investment.amountInvested?.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }) || '0,00'}
                    </Text>
                    <Text style={styles.percentageText}>
                      ({investment.percentageOfTotal?.toFixed(2) || '0.00'}%)
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.labelText}>
                Nenhum investimento encontrado.
              </Text>
            )}
          </>
        ) : (
          <>
            <Text style={styles.labelText}>Total Captado</Text>
            <View style={styles.fullWidthBox}>
              <Text style={styles.valueText}>
                R${' '}
                {data.totalInvested?.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) || '0,00'}
              </Text>
            </View>
            {userRole !== 'COMPANY' && (
              <View>
                <Text style={styles.labelText}>
                  Valor Total a Pagar aos Investidores
                </Text>
                <View style={styles.fullWidthBox}>
                  <Text style={styles.valueText}>
                    R${' '}
                    {data.totalYield?.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) || '0,00'}
                  </Text>
                </View>
              </View>
            )}
            <View style={styles.gridContainer}>
              {userRole === 'COMPANY' ? (
                <>
                  <TouchableOpacity
                    style={styles.gridItemContainer}
                    onPress={() => handleNavigation('projects')}>
                    <Text style={styles.labelText}>
                      Empreendimentos Cadastrados
                    </Text>
                    <View style={styles.gridItem}>
                      <Text style={styles.valueText}>{data.projects || 0}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.gridItemContainer}
                    onPress={() => handleNavigation('investments')}>
                    <Text style={styles.labelText}>
                      Investidores Cadastrados
                    </Text>
                    <View style={styles.gridItem}>
                      <Text style={styles.valueText}>
                        {data.investors || 0}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.gridItemContainer}
                    onPress={() => handleNavigation('companies')}>
                    <Text style={styles.labelText}>
                      Construtoras Cadastradas
                    </Text>
                    <View style={styles.gridItem}>
                      <Text style={styles.valueText}>
                        {data.companies || 0}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.gridItemContainer}
                    onPress={() => handleNavigation('sellers')}>
                    <Text style={styles.labelText}>Vendedores Cadastrados</Text>
                    <View style={styles.gridItem}>
                      <Text style={styles.valueText}>{data.sellers || 0}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.gridItemContainer}
                    onPress={() => handleNavigation('investments')}>
                    <Text style={styles.labelText}>
                      Investidores Cadastrados
                    </Text>
                    <View style={styles.gridItem}>
                      <Text style={styles.valueText}>
                        {data.investments || 0}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.gridItemContainer}
                    onPress={() => handleNavigation('projects')}>
                    <Text style={styles.labelText}>
                      Empreendimentos Cadastrados
                    </Text>
                    <View style={styles.gridItem}>
                      <Text style={styles.valueText}>{data.projects || 0}</Text>
                    </View>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}

export default HomeScreen;
