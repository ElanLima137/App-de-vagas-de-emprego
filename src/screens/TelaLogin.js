import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import styles from '../constants/styles';
import { supabase } from '../client/inisSupabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TelaLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [codigoAcesso, setCodigoAcesso] = useState(''); // Novo estado para o código de acesso

  const handleUserLogin = async () => {
    login = await fazerLogin();
    if(login.erro){
      Alert.alert('Erro de login', login.msg);
      return;
    }
    
    verTipo = await verificarTipo();
    if(verTipo.erro){
      Alert.alert('Erro de verificação de tipo', verTipo.msg);
      return;
    }

    if (verTipo.tipo === 'admin' && codigoAcesso === '123') {
      navigation.navigate('TelaAdmin');
    } else {
      navigation.navigate('TelaUsuario');
    }
  }

  async function fazerLogin(){
    const { user, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      return {erro: true, msg: error.message};
    }
    return {erro: false}
  }

  async function verificarTipo(){
    const {data, error} = await supabase
      .from('users')
      .select()
      .eq('email', email);
    
    if (error) {
      return {erro: true, msg: error.message};
    }

    AsyncStorage.setItem('id', data[0].id.toString());
    AsyncStorage.setItem('name', data[0].first_name);
    AsyncStorage.setItem('email', email)
    return {erro: false, tipo: data[0].type};
  }

  const handleAdminLogin = () => {

    if (codigoAcesso === '123') {
      console.log('Efetuando login como administrador');
      navigation.navigate('TelaLoginAdmin'); // Se você tem uma tela específica para o login de administrador
    } else {
      Alert.alert('Erro', 'Código de acesso incorreto para login como administrador.');
    }
  };

  const handleForgotPassword = () => {
    console.log('Clique em "Esqueceu sua senha? Clique aqui"');
    navigation.navigate('TelaEsqueceuSenha');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#034168', justifyContent: 'center', alignItems: 'center' }}>
      <Image source={require('../assets/image/logo2.png')} style={{ width: 120, height: 150, marginBottom: 70, marginLeft: 200 }} />
      <Image source={require('../assets/image/ESTACIO1.png')} style={{ width: 300, height: 100, marginBottom: 20, marginVertical: -180, marginRight: 200 }} />
      <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 20, alignItems: 'center', marginBottom: 0 }}>
        <View style={styles.box}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 50 }}>Bem-vindo!</Text>
          <TextInput
            style={styles.campoInput}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput style={{height: 0.1}}/>
          <TextInput
            style={styles.campoInput}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput // Novo TextInput para inserir o código de acesso
            style={styles.campoInput}
            placeholder="Código Acesso (para admin)"
            value={codigoAcesso}
            onChangeText={setCodigoAcesso}
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.botao}
            onPress={handleUserLogin}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => navigation.navigate('TelaRegistro')}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Criar conta</Text>
          </TouchableOpacity>
          {/*
          
          <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 20 }}>
            Esqueceu sua senha?{' '}
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={{ color: '#007bff', textAlign: 'center', marginTop: 20 }}>Clique aqui</Text>
            </TouchableOpacity>
          </Text>
          */}
        </View>
      </View>
    </View>
  );
};

export default TelaLogin;