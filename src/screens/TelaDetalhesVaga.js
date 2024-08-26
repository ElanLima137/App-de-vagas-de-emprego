import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { VagaContext } from './VagaContext';
import styles from '../constants/styles';

const TelaDetalhesVaga = ({ route }) => {
  const { vaga } = route.params;
  const { cadastroVaga } = useContext(VagaContext);
  const navigation = useNavigation();

  const handleSubscribe = async () => {
    console.log('Botão de inscrição clicado');
    try {
      await cadastroVaga(vaga.id);
      console.log("telaDetalhe");
      Alert.alert('Inscrição realizada', 'Você se inscreveu para esta vaga com sucesso.');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao se inscrever na vaga:', error);
      Alert.alert('Erro', 'Não foi possível se inscrever para esta vaga.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{vaga.titulo}</Text>
      <Text style={styles.descricao}>{vaga.descricao}</Text>
      <Text style={styles.localizacao}>{vaga.local}</Text>
      <TouchableOpacity
        style={styles.botao}
        onPress={handleSubscribe}
      >
        <Text style={styles.buttonText}>Inscrever-se</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.botao}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TelaDetalhesVaga;
