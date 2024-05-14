import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  Image,
} from 'react-native';
import axios from 'axios';
import {useAuth} from '../../../context/AuthContext/AuthContext';
import {styles} from './styles';
import {HttpRoutes} from '../../../settings/HttpRoutes';
import Header from '../../../components/Header';
import Logo from '../../../assets/icons/Logo.png';

const LoginScreen: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const {signIn} = useAuth();

  const handleLogin = async () => {
    try {
      const loginUrl = `${HttpRoutes.route}${HttpRoutes.auth.login.url}`;
      const response = await axios.post(loginUrl, {identifier, password});

      if (response.data && response.data.access_token && response.data.user) {
        signIn(
          response.data.access_token,
          response.data.user.id,
          response.data.user.role,
        );
      } else {
        console.error(
          'AccessToken, UserID, or UserRole not found in response',
          response.data,
        );
        Alert.alert(
          'Erro de Login',
          'Falha ao efetuar o login, verifique suas credenciais!',
        );
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert(
        'Erro de Login',
        'Falha ao efetuar o login, verifique suas credenciais!',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <View style={styles.section}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu CPF/CNPJ"
          placeholderTextColor="#FFFFFF80"
          value={identifier}
          onChangeText={setIdentifier}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#FFFFFF80"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
