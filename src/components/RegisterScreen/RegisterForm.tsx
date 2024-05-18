import React, {useState} from 'react';
import {
  ScrollView,
  TextInput,
  View,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useStyles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {HttpRoutes} from '../../settings/HttpRoutes';
import {useAuth} from '../../context/AuthContext/AuthContext';
import Header from '../Header';
import {useTheme} from '../../assets/themes/ThemeContext';

type Endpoint = {
  url: string;
  type: string;
};

type FormState = {
  company: CompanyForm;
  project: ProjectForm;
  seller: SellerForm;
  investor: InvestorForm;
};

type CompanyForm = {
  name: string;
  cnpj: string;
  address: string;
  bankData: string;
  phone: string;
  email: string;
  userName: string;
  userEmail: string;
  userPassword: string;
  userCpf: string;
  userPhone: string;
};

type ProjectForm = {
  name: string;
  location: string;
  totalValue: string;
  companyId: string;
};

type SellerForm = {
  name: string;
  cpf: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  companyId: string;
};

type InvestorForm = {
  name: string;
  cpf: string;
  phone: string;
  email: string;
  password: string;
  investments: Investment[];
};

type Investment = {
  projectId: string;
  amountInvested: number;
  bankData: string;
};

const endpoints: {[key in keyof FormState]: Endpoint} = {
  company: HttpRoutes.company.createCompany,
  project: HttpRoutes.project.createProject,
  seller: HttpRoutes.user.createUser,
  investor: HttpRoutes.investment.createInvestor,
};

const initialFormState: FormState = {
  company: {
    name: '',
    cnpj: '',
    address: '',
    bankData: '',
    phone: '',
    email: '',
    userName: '',
    userEmail: '',
    userPassword: '',
    userCpf: '',
    userPhone: '',
  },
  project: {
    name: '',
    location: '',
    totalValue: '',
    companyId: '',
  },
  seller: {
    name: '',
    cpf: '',
    email: '',
    password: '',
    phone: '',
    role: 'SELLER',
    companyId: '',
  },
  investor: {
    name: '',
    cpf: '',
    phone: '',
    email: '',
    password: '',
    investments: [
      {
        projectId: '',
        amountInvested: 0,
        bankData: '',
      },
    ],
  },
};

const typeMappings = {
  company: 'construtora',
  project: 'empreendimento',
  seller: 'vendedor',
  investor: 'investidor',
};

type RegisterFormProps<T extends keyof FormState> = {
  type: T;
};

const RegisterForm = <T extends keyof FormState>({
  type,
}: RegisterFormProps<T>) => {
  const styles = useStyles();
  const {theme} = useTheme(); // Extraia o tema aqui
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormState[type]);
  const {userRole} = useAuth();

  const handleChange = (name: keyof typeof formData, value: string) => {
    setFormData({...formData, [name]: value});
  };

  const handleInvestmentChange = (
    index: number,
    name: keyof Investment,
    value: string,
  ) => {
    const updatedInvestments = (formData as InvestorForm).investments.map(
      (investment, i) =>
        i === index ? {...investment, [name]: value} : investment,
    );
    setFormData({
      ...formData,
      investments: updatedInvestments,
    } as typeof formData);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const endpoint = endpoints[type];
      const response = await fetch(`${HttpRoutes.route}${endpoint.url}`, {
        method: endpoint.type,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      Alert.alert('Sucesso', `${typeMappings[type]} criado com sucesso`);
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao criar:', error);
      Alert.alert(
        'Erro',
        `Não foi possível criar o ${typeMappings[type]}. Por favor, tente novamente mais tarde.`,
      );
    }
    setLoading(false);
  };

  const renderInput = (
    name: keyof typeof formData,
    placeholder: string,
    secureTextEntry = false,
  ) => (
    <TextInput
      key={name as string}
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={theme.colors.placeholder} 
      value={formData[name] as string}
      onChangeText={value => handleChange(name, value)}
      secureTextEntry={secureTextEntry}
    />
  );

  const renderInvestmentInput = (
    index: number,
    name: keyof Investment,
    placeholder: string,
  ) => (
    <TextInput
      key={`${index}-${name}`}
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={theme.colors.placeholder} 
      value={(formData as InvestorForm).investments[index][name] as string}
      onChangeText={value => handleInvestmentChange(index, name, value)}
    />
  );

  const formInputs: {
    [key in keyof FormState]: {
      name: keyof FormState[key];
      placeholder: string;
      secureTextEntry?: boolean;
    }[];
  } = {
    company: [
      {name: 'name', placeholder: 'Nome'},
      {name: 'cnpj', placeholder: 'CNPJ'},
      {name: 'address', placeholder: 'Endereço'},
      {name: 'bankData', placeholder: 'Dados Bancários'},
      {name: 'phone', placeholder: 'Telefone'},
      {name: 'email', placeholder: 'Email'},
      {name: 'userName', placeholder: 'Nome do Usuário'},
      {name: 'userEmail', placeholder: 'Email do Usuário'},
      {
        name: 'userPassword',
        placeholder: 'Senha do Usuário',
        secureTextEntry: true,
      },
      {name: 'userCpf', placeholder: 'CPF do Usuário'},
      {name: 'userPhone', placeholder: 'Telefone do Usuário'},
    ],
    project: [
      {name: 'name', placeholder: 'Nome'},
      {name: 'location', placeholder: 'Endereço'},
      {name: 'totalValue', placeholder: 'Valor Total'},
      {name: 'companyId', placeholder: 'ID da Companhia'},
    ],
    seller: [
      {name: 'name', placeholder: 'Nome'},
      {name: 'cpf', placeholder: 'CPF'},
      {name: 'email', placeholder: 'Email'},
      {name: 'password', placeholder: 'Senha', secureTextEntry: true},
      {name: 'phone', placeholder: 'Telefone'},
    ],
    investor: [
      {name: 'name', placeholder: 'Nome'},
      {name: 'cpf', placeholder: 'CPF'},
      {name: 'phone', placeholder: 'Telefone'},
      {name: 'email', placeholder: 'Email'},
      {name: 'password', placeholder: 'Senha', secureTextEntry: true},
    ],
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {userRole && <Header isMenu={true} userRole={userRole} />}
        <View style={styles.container}>
          {formInputs[type].map(input =>
            renderInput(input.name, input.placeholder, input.secureTextEntry),
          )}
          {type === 'investor' &&
            (formData as InvestorForm).investments.map((_, index) => (
              <View key={index}>
                {renderInvestmentInput(index, 'projectId', 'ID do Projeto')}
                {renderInvestmentInput(
                  index,
                  'amountInvested',
                  'Valor Investido',
                )}
                {renderInvestmentInput(index, 'bankData', 'Dados Bancários')}
              </View>
            ))}
          {loading ? (
            <ActivityIndicator size="large" color="#FFCC00" />
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>
                Cadastrar {typeMappings[type]}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterForm;
