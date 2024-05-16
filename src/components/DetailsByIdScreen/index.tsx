import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useStyles} from './styles';
import {getUserById, getCompanyById, getProjectById} from '../../settings/api';
import {useAuth} from '../../context/AuthContext/AuthContext';
import Header from '../../components/Header';
import {RootStackParamList} from '../../types/navigation';

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
          case 'user':
            fetchFunction = getUserById;
            break;
          case 'project':
            fetchFunction = getProjectById;
            break;
          case 'company':
            fetchFunction = getCompanyById;
            break;
          default:
            throw new Error('Invalid type');
        }
        const data = await fetchFunction(id);
        setData(data);
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

  return (
    <View style={styles.container}>
      {userRole && <Header isMenu={true} userRole={userRole} />}
      <View style={styles.detailsContainer}>
        {data ? (
          <>
            <Text style={styles.labelText}>Nome: {data.name}</Text>
            {type === 'company' && (
              <Text style={styles.labelText}>Endereço: {data.address}</Text>
            )}
            {type === 'user' && (
              <Text style={styles.labelText}>CPF: {data.cpf}</Text>
            )}
            {type === 'user' && (
              <Text style={styles.labelText}>Email: {data.email}</Text>
            )}
            {type === 'user' && (
              <Text style={styles.labelText}>Telefone: {data.phone}</Text>
            )}
            {type === 'project' && (
              <Text style={styles.labelText}>Localização: {data.location}</Text>
            )}
            {type === 'project' && (
              <Text style={styles.labelText}>
                Valor Total: {data.totalValue}
              </Text>
            )}
          </>
        ) : (
          <Text style={styles.errorText}>Nenhum dado disponível.</Text>
        )}
      </View>
    </View>
  );
};

export default DetailsScreen;
