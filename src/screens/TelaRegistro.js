import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import styles from '../constants/styles';
import { supabase } from '../client/inisSupabase'; // Import the Supabase client
import { validateCpf } from '../service/CpfValidator';

const TelaRegistro = () => {
  const navigation = useNavigation(); 

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [selectedOption, setSelectedOption] = useState(null); 
  const [ra, setRa] = useState('');
  const [codigoAcesso, setCodigoAcesso] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handlePrivacyPolicy = () => {
    navigation.navigate('PoliticaPrivacidade');
  };

  const handleSubmit = async () => {
    if (!agreed) {
      Alert.alert('Atenção', 'Você precisa concordar com os termos de uso para continuar.');
      return;
    }

    validacaoCpf = await validateCpf(cpf);
    if(validacaoCpf.erro){
      Alert.alert('Erro no cpf', validacaoCpf.msg);
      return;
    }
    console.log(validacaoCpf);

    let userType = '';
    if (codigoAcesso === '123') {
      userType = 'admin';
    } else if (selectedOption === 'alunoEstacio') {
      userType = 'aluno';
    } else if (selectedOption === 'administrador') {
      userType = 'admin'; // Change to 'admin' if using access code '123'
    }

    const { user, error } = await supabase.auth.signUp({
      email: email,
      password: senha,
    });

    if (error) {
      Alert.alert('Erro no cadastro', error.message);
      return;
    }

    const { data, insertError } = await supabase
      .from('users')
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          cpf: cpf,
          ra: ra,
          type: userType,
          email: email,
        },
      ]);

    if (insertError) {
      Alert.alert('Erro na inserção', insertError.message);
      return;
    }

    Alert.alert('Sucesso', 'Conta criada com sucesso!', [
      { text: 'OK', onPress: () => navigation.navigate('TelaLogin') },
    ]);
  };

  const data = [
    { key: 'naoAluno', label: 'Não sou Aluno' },
    { key: 'alunoEstacio', label: 'Sou aluno Estácio' },
    { key: 'administrador', label: 'Sou administrador' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.item,
        selectedOption === item.key && { backgroundColor: 'green' },
      ]}
      onPress={() => setSelectedOption(item.key)}
    >
      <Text style={{ color: 'white' }}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 0 }}>Criar nova conta</Text>
        <Text style={{ fontSize: 15, fontWeight: 'normal', marginBottom: 50 }}>Cadastre-se para encontrar vagas:</Text>

        <TextInput
          style={styles.campoInput}
          placeholder="Nome"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.campoInput}
          placeholder="Sobrenome"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.campoInput}
          placeholder="CPF"
          value={cpf}
          onChangeText={setCpf}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.campoInput}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.campoInput}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={true}
        />
        <Text style={{ fontSize: 15, fontWeight: 'normal', marginBottom: 50 }}>Selecione o tipo de Usuário:</Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          extraData={selectedOption}
        />

        {selectedOption === 'alunoEstacio' && (
          <TextInput
            style={styles.campoInput}
            placeholder="RA do Aluno"
            value={ra}
            onChangeText={setRa}
            keyboardType="numeric"
          />
        )}
        {selectedOption === 'administrador' && (
          <TextInput
            style={styles.campoInput}
            placeholder="Código de Acesso"
            value={codigoAcesso}
            onChangeText={setCodigoAcesso}
          />
        )}

        <TouchableOpacity onPress={handlePrivacyPolicy} style={{ marginTop: 10 }}>
          <Text style={{ color: 'blue' }}>Leia nossa política de privacidade (LGPD)</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setAgreed(!agreed)} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <View style={[styles.checkbox, agreed && styles.checkedBox]}>
            {agreed && <Text style={styles.checkboxText}>✓</Text>}
          </View>
          <Text style={styles.checkboxLabel}>Estou de acordo com as políticas de privacidade</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={handleSubmit}>
          <Text style={styles.textoBotao}>Criar conta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => navigation.goBack()}>
          <Text style={styles.textoBotao}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default TelaRegistro;
