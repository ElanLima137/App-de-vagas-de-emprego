import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { supabase } from '../client/inisSupabase'; // Importando o Supabase Client
import styles from '../constants/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TelaUsuario = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    
    const fetchUserData = async () => {
      const user_email = await AsyncStorage.getItem('email');
      const { data, error } = await supabase.from('users').select('*').eq('email', user_email); // Limita a seleção a 1 registro de usuário
      if (error) {
        console.error('Erro ao buscar dados do usuário:', error.message);
      } else {
        setUserData(data[0]); // Assume-se que há apenas um usuário e, portanto, acessamos o primeiro elemento do array de dados
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {userData ? (
          <View style={styles.userDataContainer}>

            <Text style={styles.userDataLabel}>First Name:</Text>
            <Text style={styles.userDataValue}>{userData.first_name}</Text>

            <Text style={styles.userDataLabel}>Last Name:</Text>
            <Text style={styles.userDataValue}>{userData.last_name}</Text>

            <Text style={styles.userDataLabel}>CPF:</Text>
            <Text style={styles.userDataValue}>{userData.cpf}</Text>

            <Text style={styles.userDataLabel}>Email:</Text>
            <Text style={styles.userDataValue}>{userData.email}</Text>

            <Text style={styles.userDataLabel}>RA:</Text>
            <Text style={styles.userDataValue}>{userData.ra}</Text>
          </View>
        ) : (
          <Text>Carregando dados do usuário...</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default TelaUsuario;
