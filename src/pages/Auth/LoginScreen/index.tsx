import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Alert} from 'react-native';
import axios from 'axios';
import { HttpRoutes } from '../../../settings/HttpRoutes';
import { styles } from './styles';

const LoginScreen: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        HttpRoutes.route + HttpRoutes.auth.login.url,
        {
          identifier,
          password,
        },
      );
      Alert.alert('Login Sucesso', 'Você está logado!');
      // Aqui você pode redirecionar o usuário ou fazer qualquer outra ação após o login
    } catch (error) {
      Alert.alert(
        'Erro de Login',
        'Falha ao efetuar o login, verifique suas credenciais!',
      );
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Identificador"
        value={identifier}
        onChangeText={setIdentifier}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
