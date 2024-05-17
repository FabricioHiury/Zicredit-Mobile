import React from 'react';
import {Switch, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles} from './styles';
import {useAuth} from '../../context/AuthContext/AuthContext';
import {useTheme} from '../../assets/themes/ThemeContext';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../types/navigation';

interface MenuProps {
  isVisible: boolean;
  onClose: () => void;
  userRole: string;
}

const Menu: React.FC<MenuProps> = ({isVisible, onClose, userRole}) => {
  const {signOut} = useAuth();
  const {darkMode, toggleDarkMode} = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  const handleProfilePress = () => {
    onClose();
    navigation.navigate('Profile');
  };

  const handleNavigate = <T extends keyof RootStackParamList>(
    screen: T,
    params?: RootStackParamList[T],
  ) => {
    onClose();
    if (params) {
      navigation.navigate(screen, params);
    } else {
      navigation.navigate(screen);
    }
  };

  const menuItems = [
    {
      title: 'Perfil',
      icon: 'account-circle',
      roles: ['ZICREDIT', 'SELLER', 'COMPANY', 'INVESTOR'],
      action: handleProfilePress,
    },
    {
      title: 'Cadastrar construtora',
      icon: 'add-circle-outline',
      roles: ['ZICREDIT'],
      action: () => handleNavigate('RegisterCompany'),
    },
    {
      title: 'Cadastrar empreendimento',
      icon: 'business',
      roles: ['ZICREDIT'],
      action: () => handleNavigate('RegisterProject'),
    },
    {
      title: 'Cadastrar investidor',
      icon: 'person-add',
      roles: ['ZICREDIT'],
      action: () => handleNavigate('RegisterInvestorScreen'),
    },
    {
      title: 'Cadastrar vendedor',
      icon: 'person-add-alt-1',
      roles: ['ZICREDIT'],
      action: () => handleNavigate('RegisterSeller'),
    },
    {
      title: 'Modo escuro',
      icon: 'brightness-6',
      roles: ['ZICREDIT', 'SELLER', 'COMPANY', 'INVESTOR'],
      toggle: true,
    },
    {
      title: 'Sair do aplicativo',
      icon: 'logout',
      roles: ['ZICREDIT', 'SELLER', 'COMPANY', 'INVESTOR'],
      action: handleSignOut,
    },
  ];

  const filteredMenuItems = menuItems.filter(item =>
    item.roles.includes(userRole),
  );

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      style={styles.modal}>
      <View
        style={[
          styles.menuContainer,
          {backgroundColor: darkMode ? '#020202FA' : '#FBFBFB'},
        ]}>
        <View style={styles.menuHeader}>
          <Text
            style={[
              styles.menuTitle,
              {color: darkMode ? '#FFFFFF' : '#121212'},
            ]}>
            Menu
          </Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text
              style={[
                styles.closeButtonText,
                {color: darkMode ? '#FFFFFF' : '#121212'},
              ]}>
              X
            </Text>
          </TouchableOpacity>
        </View>
        {filteredMenuItems.map((item, index) =>
          item.title !== 'Sair do aplicativo' ? (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.action ? item.action : undefined}>
              <View style={styles.menuOptionContainer}>
                <Icon
                  name={item.icon}
                  size={20}
                  color="#FFCC00"
                  style={styles.menuIcon}
                />
                <Text
                  style={[
                    styles.menuItemText,
                    {color: darkMode ? '#FFFFFF' : '#121212'},
                  ]}>
                  {item.title}
                </Text>
                {item.toggle && (
                  <Switch
                    trackColor={{false: '#767577', true: '#FFCC00'}}
                    thumbColor={darkMode ? '#FFFFFF' : '#FFFFFF'}
                    onValueChange={toggleDarkMode}
                    value={darkMode}
                    style={styles.switchStyle}
                  />
                )}
              </View>
            </TouchableOpacity>
          ) : (
            <View key={index} style={styles.logoutItem}>
              <TouchableOpacity
                onPress={handleSignOut}
                style={styles.menuOptionContainer}>
                <Icon
                  name={item.icon}
                  size={20}
                  color="#FFCC00"
                  style={styles.menuIcon}
                />
                <Text
                  style={[
                    styles.menuItemText,
                    {color: darkMode ? '#FFFFFF' : '#121212'},
                  ]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            </View>
          ),
        )}
      </View>
    </Modal>
  );
};

export default Menu;
