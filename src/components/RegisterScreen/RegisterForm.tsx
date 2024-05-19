import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import {useStyles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../context/AuthContext/AuthContext';
import Header from '../Header';
import {useTheme} from '../../assets/themes/ThemeContext';
import {
  getCompanies,
  getProjects,
  createCompany,
  createProject,
  createUser,
  createInvestor,
} from '../../settings/api';

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

const endpoints: {
  [key in keyof FormState]: (data: any) => Promise<any>;
} = {
  company: createCompany,
  project: createProject,
  seller: createUser,
  investor: createInvestor,
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

type RegisterFormProps<T extends keyof FormState> = {
  type: T;
};

const RegisterForm = <T extends keyof FormState>({
  type,
}: RegisterFormProps<T>) => {
  const styles = useStyles();
  const {theme} = useTheme();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormState[type]);
  const {userRole} = useAuth();
  const [companies, setCompanies] = useState<
    {id: string; name: string; cnpj: string}[]
  >([]);
  const [projects, setProjects] = useState<
    {id: string; name: string; location: string}[]
  >([]);
  const [companyPage, setCompanyPage] = useState(1);
  const [projectPage, setProjectPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalProjectVisible, setModalProjectVisible] = useState(false);

  const fetchCompanies = async (page: number, query: string = '') => {
    try {
      const response = await getCompanies(page, query);
      const newCompanies = response;
      setCompanies(prevCompanies => [...prevCompanies, ...newCompanies]);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const fetchProjects = async (page: number, query: string = '') => {
    try {
      const response = await getProjects(page, query);
      const newProjects = response;
      setProjects(prevProjects => [...prevProjects, ...newProjects]);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchCompanies(companyPage);
  }, [companyPage]);

  useEffect(() => {
    fetchProjects(projectPage);
  }, [projectPage]);

  const handleChange = (name: keyof FormState[T], value: string) => {
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
      await endpoint(formData);
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
    name: keyof FormState[T],
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
      keyboardType={
        name === 'phone' || name === 'userPhone' ? 'numeric' : 'default'
      }
    />
  );

  const renderMaskedInput = (
    name: keyof FormState[T],
    placeholder: string,
    type: 'cpf' | 'cnpj' | 'cel-phone' | 'money',
  ) => (
    <TextInputMask
      key={name as string}
      type={type}
      options={
        type === 'money'
          ? {unit: 'R$ ', delimiter: '.', separator: ','}
          : undefined
      }
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={theme.colors.placeholder}
      value={formData[name] as string}
      onChangeText={value => handleChange(name, value)}
      keyboardType={
        type === 'money' ||
        type === 'cpf' ||
        type === 'cnpj' ||
        type === 'cel-phone'
          ? 'numeric'
          : 'default'
      }
    />
  );

  const renderInvestmentInput = (
    index: number,
    name: keyof Investment,
    placeholder: string,
  ) =>
    name === 'amountInvested' ? (
      <TextInputMask
        key={`${index}-${name}`}
        type="money"
        options={{unit: 'R$ ', delimiter: '.', separator: ','}}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.placeholder}
        value={String((formData as InvestorForm).investments[index][name])}
        onChangeText={value => handleInvestmentChange(index, name, value)}
        keyboardType="numeric"
      />
    ) : (
      <TextInput
        key={`${index}-${name}`}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.placeholder}
        value={(formData as InvestorForm).investments[index][name] as string}
        onChangeText={value => handleInvestmentChange(index, name, value)}
      />
    );

  const renderCompanyItem = ({
    item,
  }: {
    item: {id: string; name: string; cnpj: string};
  }) => (
    <TouchableOpacity
      onPress={() => {
        handleChange('companyId' as keyof FormState[T], item.id);
        setModalVisible(false);
      }}>
      <Text style={styles.dataResults}>
        {item.name} - {item.cnpj}
      </Text>
    </TouchableOpacity>
  );

  const renderProjectItem = ({
    item,
  }: {
    item: {id: string; name: string; location: string};
  }) => (
    <TouchableOpacity
      onPress={() => {
        handleInvestmentChange(0, 'projectId', item.id);
        setModalProjectVisible(false);
      }}>
      <Text style={styles.dataResults}>
        {item.name} - {item.location}
      </Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {userRole && <Header isMenu={true} userRole={userRole} />}
        <View style={styles.container}>
          {formInputs[type].map(input =>
            type === 'project' && input.name === 'companyId' ? (
              <View key={input.name as string}>
                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  style={styles.input}>
                  <Text style={styles.companyInputText}>
                    {(formData as ProjectForm).companyId
                      ? companies.find(
                          c => c.id === (formData as ProjectForm).companyId,
                        )?.name
                      : 'Selecionar Companhia'}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : input.name === 'cnpj' ||
              input.name === 'cpf' ||
              input.name === 'phone' ||
              input.name === 'userCpf' ||
              input.name === 'userPhone' ? (
              renderMaskedInput(
                input.name,
                input.placeholder,
                input.name === 'cnpj'
                  ? 'cnpj'
                  : input.name === 'cpf' || input.name === 'userCpf'
                  ? 'cpf'
                  : 'cel-phone',
              )
            ) : input.name === 'totalValue' ? (
              renderMaskedInput(input.name, input.placeholder, 'money')
            ) : (
              renderInput(input.name, input.placeholder, input.secureTextEntry)
            ),
          )}
          {type === 'investor' &&
            (formData as InvestorForm).investments.map((_, index) => (
              <View key={index}>
                <TouchableOpacity
                  onPress={() => setModalProjectVisible(true)}
                  style={styles.input}>
                  <Text
                    style={
                      (formData as InvestorForm).investments[index].projectId
                        ? styles.companyInputText
                        : styles.placeholderText
                    }>
                    {(formData as InvestorForm).investments[index].projectId
                      ? projects.find(
                          p =>
                            p.id ===
                            (formData as InvestorForm).investments[index]
                              .projectId,
                        )?.name
                      : 'Selecionar Projeto'}
                  </Text>
                </TouchableOpacity>
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
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar Companhia"
              placeholderTextColor={theme.colors.placeholder}
              value={searchQuery}
              onChangeText={value => setSearchQuery(value)}
              onSubmitEditing={() => {
                setCompanies([]);
                fetchCompanies(1, searchQuery);
              }}
            />
            <FlatList
              data={companies}
              style={styles.dataResults}
              renderItem={renderCompanyItem}
              keyExtractor={item => item.id}
              onEndReached={() => setCompanyPage(prev => prev + 1)}
              onEndReachedThreshold={0.1}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal
          visible={modalProjectVisible}
          animationType="slide"
          onRequestClose={() => setModalProjectVisible(false)}>
          <View style={styles.modalContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar Projeto"
              placeholderTextColor={theme.colors.placeholder}
              value={searchQuery}
              onChangeText={value => setSearchQuery(value)}
              onSubmitEditing={() => {
                setProjects([]);
                fetchProjects(1, searchQuery);
              }}
            />
            <FlatList
              data={projects}
              style={styles.dataResults}
              renderItem={renderProjectItem}
              keyExtractor={item => item.id}
              onEndReached={() => setProjectPage(prev => prev + 1)}
              onEndReachedThreshold={0.1}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalProjectVisible(false)}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterForm;
