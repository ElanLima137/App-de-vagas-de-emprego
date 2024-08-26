// src/screens/TelaAdmin.js
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../constants/styles';

const TelaAdmin = () => {
  const navigation = useNavigation();


  const handleLaunchJobs = () => {
    navigation.navigate('TelaLancarVaga');
  };

  const handleManageJobs = () => {
    navigation.navigate('GerenciarVagas');
  };

  const handleLogout = () => {
    console.log('Administrador fez logout');
    navigation.navigate('TelaLogin');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Dashboard do Administrador</Text>

        <TouchableOpacity style={styles.dashboardButton} onPress={handleLaunchJobs}>
          <Text style={styles.dashboardButtonText}>Lançar Vagas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dashboardButton} onPress={handleManageJobs}>
          <Text style={styles.dashboardButtonText}>Gerenciar Vagas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dashboardButton} onPress={handleLogout}>
          <Text style={styles.dashboardButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default TelaAdmin;
