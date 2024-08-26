import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMenu from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import styles from '../constants/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../client/inisSupabase';

const BarraDashboard = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = await AsyncStorage.getItem('id'); // Assume que o ID do usuário está armazenado no AsyncStorage
      if (userId) {
        const { data, error } = await supabase
          .from('users')
          .select('first_name, email')
          .eq('id', userId)
          .single();

        if (data) {
          setUserName(data.first_name);
          setUserEmail(data.email);
        } else {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      }
    };

    fetchUserData();
  }, [isFocused]);

  useEffect(() => {
    if (!isFocused) {
      setIsModalVisible(false);
    }
  }, [isFocused]);

  const handleLogout = () => {
    alert('Você fez Logout.');
    navigation.navigate('TelaLogin');
  };

  const handleMenuPress = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const navigateAndCloseModal = (screen) => {
    closeModal();
    navigation.navigate(screen);
  };

  return (
    <View style={styles.barraContainer}>

      <TouchableOpacity onPress={() => navigateAndCloseModal('TelaLogin')}>
        <Icon name="user" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleMenuPress}>
        <IconMenu name="menu" size={20} color="white" />
      </TouchableOpacity>

      {/* Modal */}
      <Modal isVisible={isModalVisible} onBackdropPress={closeModal} animationIn="slideInRight" animationOut="slideOutRight">
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Menu</Text>

          <View style={styles.userInfoContainer}>
            <Text style={styles.userInfoLabel}>Nome:</Text>
            <Text style={styles.userInfoText}>{userName}</Text>
          </View>
          <View style={styles.userInfoContainer}>
            <Text style={styles.userInfoLabel}>E-mail:</Text>
            <Text style={styles.userInfoText}>{userEmail}</Text>
          </View>

          <TouchableOpacity style={styles.botao} onPress={() => navigateAndCloseModal('PerfilUsuario')}>
            <Text style={styles.dashboardButtonText}>Ver Perfil</Text>
          </TouchableOpacity>
          {/*
          <TouchableOpacity style={styles.botao} onPress={() => navigateAndCloseModal('TelaPdf')}>
            <Text style={styles.dashboardButtonText}>Enviar Currículo</Text>
          </TouchableOpacity>
          */}
          <TouchableOpacity style={styles.botao} onPress={handleLogout}>
            <Text style={styles.dashboardButtonText}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botao} onPress={closeModal}>
            <Text style={styles.dashboardButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default BarraDashboard;
