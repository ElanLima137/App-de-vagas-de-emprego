import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { supabase } from '../client/inisSupabase'; // Importe o cliente Supabase
import styles from '../constants/styles';

const EsqueceuSenha = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    try {
      const { error } = await supabase.auth.api.resetPasswordForEmail(email);

      if (error) {
        Alert.alert('Erro ao redefinir senha', error.message);
      } else {
        Alert.alert('E-mail enviado', 'Verifique seu e-mail para redefinir a senha.');
      }
    } catch (error) {
      console.error('Erro ao redefinir senha:', error.message);
      Alert.alert('Erro', 'Ocorreu um erro ao redefinir a senha. Tente novamente mais tarde.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Esqueceu sua senha?</Text>
        <Text style={{ fontSize: 15, marginBottom: 20 }}>Digite seu e-mail para redefinir a senha:</Text>

        <TextInput
          style={styles.campoInput}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TouchableOpacity style={styles.botao} onPress={handleResetPassword}>
          <Text style={styles.textoBotao}>Enviar e-mail de recuperação</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => navigation.goBack()}>
          <Text style={styles.textoBotao}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EsqueceuSenha;
