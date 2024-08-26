import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { VagaContext, VagaProvider} from '../screens/VagaContext';
import styles from '../constants/styles';

const TelaAlterarVaga = () => {
  const navigation = useNavigation();
  const { alterarVaga } = useContext(VagaContext);

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [local, setLocal] = useState('');

  const handleAlterarVaga = () => {
    if (!titulo.trim() || !descricao.trim() || !local.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    alterarVaga()
    // Adicionar a vaga ao contexto
    altera({ titulo, descricao, local });

    // Limpar os campos após lançar a vaga
    setTitulo('');
    setDescricao('');
    setLocal('');

    // Navegar de volta para a tela anterior
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Lançar Vaga de Emprego</Text>

        <TextInput
          style={styles.campoInput}
          placeholder="Título da Vaga"
          value={titulo}
          onChangeText={setTitulo}
        />
        <TextInput
          style={[styles.campoInput, { height: 120 }]}
          placeholder="Descrição da Vaga"
          multiline
          value={descricao}
          onChangeText={setDescricao}
        />
        <TextInput
          style={styles.campoInput}
          placeholder="Localização da Vaga"
          value={local}
          onChangeText={setLocal}
        />

        <TouchableOpacity style={styles.botao} onPress={handleAlterarVaga}>
          <Text style={styles.textoBotao}>Lançar Vaga</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botao, { backgroundColor: 'red' }]} onPress={() => navigation.goBack()}>
          <Text style={styles.textoBotao}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default TelaAlterarVaga;