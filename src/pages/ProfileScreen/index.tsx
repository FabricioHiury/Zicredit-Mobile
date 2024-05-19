import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import {useAuth} from '../../context/AuthContext/AuthContext';
import {getUserById, patchUser} from '../../settings/api';
import {useStyles} from './styles';
import Header from '../../components/Header';
import {useTheme} from '../../assets/themes/ThemeContext';

const ProfileScreen: React.FC = () => {
  const styles = useStyles();
  const {userId, userRole} = useAuth();
  const {theme} = useTheme();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
  });
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [passwordData, setPasswordData] = useState({
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const userData = await getUserById(userId);
          setUser(userData);
          setEditData({
            name: userData.name || '',
            email: userData.email || '',
            cpf: userData.cpf || '',
            phone: userData.phone || '',
          });
          setError(null);
        } catch (err) {
          console.error('Error fetching user data:', err);
          setError('Failed to load user data');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [userId]);

  const handleEditPress = () => {
    setEditModalVisible(true);
  };

  const handlePasswordPress = () => {
    setPasswordModalVisible(true);
  };

  const handleSavePress = async () => {
    if (userId) {
      try {
        await patchUser(userId, editData);
        setUser({...user, ...editData});
        setEditModalVisible(false);
        Alert.alert('Sucesso', 'Informações atualizadas com sucesso');
      } catch (error) {
        console.error('Erro ao atualizar informações:', error);
        Alert.alert('Erro', 'Não foi possível atualizar as informações');
      }
    }
  };

  const handlePasswordSave = async () => {
    if (passwordData.password !== passwordData.confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    if (userId) {
      try {
        await patchUser(userId, {password: passwordData.password});
        setPasswordModalVisible(false);
        Alert.alert('Sucesso', 'Senha atualizada com sucesso');
      } catch (error) {
        console.error('Erro ao atualizar senha:', error);
        Alert.alert('Erro', 'Não foi possível atualizar a senha');
      }
    }
  };

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
      <View style={styles.profileContainer}>
        {user ? (
          <>
            <Text style={styles.labelText}>Nome: {user.name}</Text>
            <Text style={styles.labelText}>Email: {user.email}</Text>
            <Text style={styles.labelText}>CPF: {user.cpf}</Text>
            <Text style={styles.labelText}>Telefone: {user.phone}</Text>
            <Text style={styles.labelText}>Cargo: {user.role}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={handleEditPress}>
                <Text style={styles.editButtonText}>Editar Informações</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.editButton}
                onPress={handlePasswordPress}>
                <Text style={styles.editButtonText}>Mudar Senha</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <Text style={styles.errorText}>Nenhum dado disponível.</Text>
        )}
      </View>
      <Modal
        visible={editModalVisible}
        animationType="slide"
        onRequestClose={() => setEditModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Editar Informações</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            placeholderTextColor={theme.colors.placeholder}
            value={editData.name}
            onChangeText={value => setEditData({...editData, name: value})}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={theme.colors.placeholder}
            value={editData.email}
            onChangeText={value => setEditData({...editData, email: value})}
          />
          <TextInput
            style={styles.input}
            placeholder="CPF"
            placeholderTextColor={theme.colors.placeholder}
            value={editData.cpf}
            onChangeText={value => setEditData({...editData, cpf: value})}
          />
          <TextInput
            style={styles.input}
            placeholder="Telefone"
            placeholderTextColor={theme.colors.placeholder}
            value={editData.phone}
            onChangeText={value => setEditData({...editData, phone: value})}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleSavePress}>
              <Text style={styles.editButtonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setEditModalVisible(false)}>
              <Text style={styles.editButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={passwordModalVisible}
        animationType="slide"
        onRequestClose={() => setPasswordModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Editar Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Nova Senha"
            placeholderTextColor={theme.colors.placeholder}
            secureTextEntry
            value={passwordData.password}
            onChangeText={value =>
              setPasswordData({...passwordData, password: value})
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar Senha"
            placeholderTextColor={theme.colors.placeholder}
            secureTextEntry
            value={passwordData.confirmPassword}
            onChangeText={value =>
              setPasswordData({...passwordData, confirmPassword: value})
            }
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={handlePasswordSave}>
              <Text style={styles.editButtonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setPasswordModalVisible(false)}>
              <Text style={styles.editButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileScreen;
