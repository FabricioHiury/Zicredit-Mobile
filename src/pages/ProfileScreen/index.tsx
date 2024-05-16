import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import {useAuth} from '../../context/AuthContext/AuthContext';
import {getUserById} from '../../settings/api';
import {useStyles} from './styles';
import Header from '../../components/Header';

const ProfileScreen: React.FC = () => {
  const styles = useStyles();
  const {userId, userRole} = useAuth();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const userData = await getUserById(userId);
          setUser(userData);
          setError(null);
        } catch (err) {
          console.error('Error fetching user data:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [userId]);

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

  const handleEditPress = () => {
    console.log('Edit button pressed');
  };

  return (
    <View style={styles.container}>
      {userRole && <Header isMenu={true} userRole={userRole} />}
      <View style={styles.profileContainer}>
        {user ? (
          <>
            <Text style={styles.labelText}>Nome: {user.name}</Text>
            <Text style={styles.labelText}>Email: {user.email}</Text>
            <Text style={styles.labelText}>CPF: {user.cpf}</Text>
            <Text style={styles.labelText}>Telefone: {user.phone}</Text>
            <Text style={styles.labelText}>Cargo: {user.role}</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditPress}>
              <Text style={styles.editButtonText}>Editar Informações</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.errorText}>Nenhum dado disponível.</Text>
        )}
      </View>
    </View>
  );
};

export default ProfileScreen;
