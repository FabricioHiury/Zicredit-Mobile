import React, {useState} from 'react';
import {Switch, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles} from './styles';

interface MenuProps {
  isVisible: boolean;
  onClose: () => void;
  userRole: string;
}

const Menu: React.FC<MenuProps> = ({isVisible, onClose, userRole}) => {
  const [darkMode, setDarkMode] = useState(false);

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const menuItems = [
    {
      title: 'Perfil',
      icon: 'account_circle',
      roles: ['ZICREDIT', 'SELLER', 'COMPANY', 'INVESTOR'],
    },
    {title: 'Cadastrar construtora', icon: 'add_circle', roles: ['ZICREDIT']},
    {
      title: 'Cadastrar empreendimento',
      icon: 'add_circle',
      roles: ['ZICREDIT'],
    },
    {title: 'Cadastrar investidor', icon: 'add_circle', roles: ['ZICREDIT']},
    {title: 'Cadastrar vendedor', icon: 'add_circle', roles: ['ZICREDIT']},
    {
      title: 'Modo escuro',
      icon: 'dark_mode',
      roles: ['ZICREDIT', 'SELLER', 'COMPANY', 'INVESTOR'],
      toggle: true,
    },
    {
      title: 'Sair do aplicativo',
      icon: 'logout',
      roles: ['ZICREDIT', 'SELLER', 'COMPANY', 'INVESTOR'],
    },
  ];

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      style={styles.modal}>
      <View style={styles.menuContainer}>
        <View style={styles.menuHeader}>
          <Text style={styles.menuTitle}>Menu</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
        {menuItems.map((item, index) =>
          item.title !== 'Sair do aplicativo' ? (
            <View key={index} style={styles.menuItem}>
              <View style={styles.menuOptionContainer}>
                <Icon
                  name={item.icon}
                  size={20}
                  color="#FFCC00"
                  style={styles.menuIcon}
                />
                <Text style={styles.menuItemText}>{item.title}</Text>
                {item.toggle && (
                  <Switch
                    trackColor={{false: '#767577', true: '#FFCC00'}}
                    thumbColor={darkMode ? '#FFFFFF' : '#FFFFFF'}
                    onValueChange={handleToggleDarkMode}
                    value={darkMode}
                    style={styles.switchStyle}
                  />
                )}
              </View>
            </View>
          ) : (
            <View key={index} style={styles.logoutItem}>
              <TouchableOpacity
                onPress={onClose}
                style={styles.menuOptionContainer}>
                <Icon
                  name={item.icon}
                  size={20}
                  color="#FFCC00"
                  style={styles.menuIcon}
                />
                <Text style={styles.menuItemText}>{item.title}</Text>
              </TouchableOpacity>
            </View>
          ),
        )}
      </View>
    </Modal>
  );
};

export default Menu;
