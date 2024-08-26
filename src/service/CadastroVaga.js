import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { VagaContext } from '../screens/VagaContext';

const CadastroVaga = () => {
  const { adicionarVaga } = useContext(VagaContext);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleCadastro = async () => {
    if (!nome || !email || !telefone) {
      Alert.alert('Preencha todos os campos.');
      return;
    }

    const novaVaga = { nome, email, telefone };
    await adicionarVaga(novaVaga);
    Alert.alert('Cadastro realizado com sucesso!');
    // Você pode adicionar outras ações após o cadastro, como redirecionar o usuário para outra tela
  };

  return (
    <View>
      <Text>Nome:</Text>
      <TextInput
        placeholder="Digite seu nome"
        onChangeText={text => setNome(text)}
        value={nome}
      />

      <Text>Email:</Text>
      <TextInput
        placeholder="Digite seu email"
        onChangeText={text => setEmail(text)}
        value={email}
        keyboardType="email-address"
      />

      <Text>Telefone:</Text>
      <TextInput
        placeholder="Digite seu telefone"
        onChangeText={text => setTelefone(text)}
        value={telefone}
        keyboardType="phone-pad"
      />

      <TouchableOpacity onPress={handleCadastro}>
        <Text>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CadastroVaga;
