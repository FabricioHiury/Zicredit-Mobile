import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Alert,
  Image,
  TextInput,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useAuth} from '../../../context/AuthContext/AuthContext';
import {styles} from './styles';
import {HttpRoutes} from '../../../settings/HttpRoutes';
import Logo from '../../../assets/icons/Logo.png';

const LoginScreen: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
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
          response.data.user.companyId
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
          keyboardType="numeric"
          maxLength={14}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Digite sua senha"
            placeholderTextColor="#FFFFFF80"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.icon}>
            <Icon
              name={passwordVisible ? 'visibility-off' : 'visibility'}
              size={20}
              color="#FFCC00"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
