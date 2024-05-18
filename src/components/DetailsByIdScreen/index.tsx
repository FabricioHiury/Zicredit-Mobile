import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, ScrollView} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useStyles} from './styles';
import {
  getCompanyById,
  getProjectById,
  getInvestorById,
  getSellerById,
} from '../../settings/api';
import {useAuth} from '../../context/AuthContext/AuthContext';
import Header from '../../components/Header';
import {RootStackParamList} from '../../types/navigation';
import {TextInputMask} from 'react-native-masked-text';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

const DetailsScreen: React.FC = () => {
  const styles = useStyles();
  const {userRole} = useAuth();
  const route = useRoute<DetailsScreenRouteProp>();
  const {id, type} = route.params;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let fetchFunction;
        switch (type) {
          case 'sellers':
            fetchFunction = getSellerById;
            break;
          case 'user':
            fetchFunction = getInvestorById;
            break;
          case 'projects':
            fetchFunction = getProjectById;
            break;
          case 'companies':
            fetchFunction = getCompanyById;
            break;
          default:
            throw new Error('Invalid type');
        }
        const data = await fetchFunction(id);
        setData(data.response || data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, type]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const renderProjectDetails = () => {
    if (!data) return null;
    return (
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.detailsContainer}>
          <Text style={styles.projectTitle}>{data.name}</Text>
          <Text style={styles.labelText}>Valor total do empreendimento</Text>
          <View style={styles.highlightBox}>
            <Text style={styles.valueText}>
              ${data.totalValue?.toLocaleString('pt-BR')}
            </Text>
          </View>
          <Text style={styles.labelText}>Valor total do investimento</Text>
          <View style={styles.highlightBox}>
            <Text style={styles.valueText}>
              ${data.totalInvested?.toLocaleString('pt-BR')}
            </Text>
          </View>
          <Text style={styles.labelText}>Saldo de cotas disponíveis</Text>
          <View style={styles.highlightBox}>
            <Text style={styles.valueText}>
              ${(data.totalValue - data.totalInvested)?.toLocaleString('pt-BR')}
            </Text>
          </View>
          <Text style={styles.labelText}>
            Estimativa da distribuição rendimento Mensal (3%)
          </Text>
          <View style={styles.highlightBox}>
            <Text style={styles.valueText}>
              ${data.monthlyDistribution?.toLocaleString('pt-BR')}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  };

  const renderInvestorDetails = () => {
    const totalInvested = data?.totalInvested || 0;
    const userName =
      data?.investments && data?.investments.length > 0
        ? data.investments[0].user.name
        : 'Investidor';

    return (
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.detailsContainer}>
          <Text style={styles.projectTitle}>{userName}</Text>
          <Text style={styles.labelText}>Valor total investido</Text>
          <View style={styles.highlightBox}>
            <Text style={styles.valueText}>
              ${totalInvested.toLocaleString('pt-BR')}
            </Text>
          </View>
          <Text style={styles.labelText}>Captação por empreendimento</Text>
          {data?.investments &&
            data.investments.map(
              (
                investment: {project: {name: string}; amountInvested: number},
                index: number,
              ) => (
                <View key={index} style={styles.highlightBox}>
                  <Text style={styles.projectName}>
                    {investment.project.name}
                  </Text>
                  <Text style={styles.projectValue}>
                    R${investment.amountInvested.toLocaleString('pt-BR')} (
                    {(
                      (investment.amountInvested / totalInvested) *
                      100
                    ).toFixed(2)}
                    %)
                  </Text>
                </View>
              ),
            )}
        </View>
      </ScrollView>
    );
  };

  const renderCompanyDetails = () => {
    if (!data) return null;
    return (
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.detailsContainer}>
          <Text style={styles.projectTitle}>{data.name}</Text>
          <Text style={styles.labelText}>CNPJ</Text>
          <View style={styles.highlightBox}>
            <TextInputMask
              type={'cnpj'}
              value={data.cnpj}
              editable={false}
              style={styles.addressText}
            />
          </View>
          <Text style={styles.labelText}>Valor total investido</Text>
          <View style={styles.highlightBox}>
            <Text style={styles.valueText}>
              R$ {data.totalInvested.toLocaleString('pt-BR')}
            </Text>
          </View>
          <Text style={styles.labelText}>Saldo de cotas disponíveis</Text>
          <View style={styles.highlightBox}>
            <Text style={styles.valueText}>
              R$ {data.totalRemaining.toLocaleString('pt-BR')}
            </Text>
          </View>
          <Text style={styles.labelText}>
            Estimativa de distribuição do rendimento mensal (3%)
          </Text>
          <View style={styles.highlightBox}>
            <Text style={styles.valueText}>
              R$ {data.totalYield.toLocaleString('pt-BR')}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  };

  const renderSellerDetails = () => {
    if (!data) return null;

    return (
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.detailsContainer}>
          <Text style={styles.projectTitle}>{data.name}</Text>
          <Text style={styles.labelText}>Total do investimento captado</Text>
          <View style={styles.highlightBox}>
            <Text style={styles.valueText}>
              ${data.totalInvestment?.toLocaleString('pt-BR')}
            </Text>
          </View>
          <Text style={styles.labelText}>Total da comissão recebida</Text>
          <View style={styles.highlightBox}>
            <Text style={styles.valueText}>
              ${data.totalCommission?.toLocaleString('pt-BR')}
            </Text>
          </View>
          <Text style={styles.labelText}>Captação por empreendimento</Text>
          {data.projectInvestments &&
            data.projectInvestments.map(
              (
                project: {projectName: string; amount: number},
                index: number,
              ) => (
                <View key={index} style={styles.highlightBox}>
                  <Text style={styles.projectName}>{project.projectName}</Text>
                  <Text style={styles.projectValue}>
                    R${project.amount.toLocaleString('pt-BR')}
                  </Text>
                </View>
              ),
            )}
        </View>
      </ScrollView>
    );
  };

  const renderDefaultDetails = () => (
    <View style={styles.detailsContainer}>
      {data ? (
        <>
          <Text style={styles.labelText}>Nome: {data.name}</Text>
          {type === 'companies' && (
            <Text style={styles.labelText}>Endereço: {data.address}</Text>
          )}
          {type === 'sellers' && (
            <>
              <Text style={styles.labelText}>CPF: {data.cpf}</Text>
              <Text style={styles.labelText}>Email: {data.email}</Text>
              <Text style={styles.labelText}>Telefone: {data.phone}</Text>
            </>
          )}
          {type === 'user' && (
            <>
              <Text>Hello World</Text>
            </>
          )}
        </>
      ) : (
        <Text style={styles.errorText}>Nenhum dado disponível.</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {userRole && <Header isMenu={true} userRole={userRole} />}
      {type === 'projects' && renderProjectDetails()}
      {type === 'user' && renderInvestorDetails()}
      {type === 'companies' && renderCompanyDetails()}
      {type === 'sellers' && renderSellerDetails()}
      {!['projects', 'user', 'companies', 'sellers'].includes(type) &&
        renderDefaultDetails()}
    </View>
  );
};

export default DetailsScreen;
