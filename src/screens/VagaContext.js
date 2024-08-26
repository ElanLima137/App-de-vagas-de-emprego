import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { supabase } from '../client/inisSupabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const VagaContext = createContext();

export const VagaProvider = ({ children }) => {
  const [vagas, setVagas] = useState([]);
  const [id, setId] = useState(null); // Initialize id as null

  useEffect(() => {
    // Fetch id from AsyncStorage
    const fetchId = async () => {
      const storedId = await AsyncStorage.getItem('id');
      setId(parseInt(storedId)); // Set the id from AsyncStorage
    };

    fetchId(); // Call fetchId when the component mounts
  }, []);

  useEffect(() => {
    fetchVagas(); // Fetch vagas when component mounts
  }, []);

  const fetchVagas = async () => {
    try {
      const { data, error } = await supabase.from('vagas').select('*');
      if (error) {
        throw error;
      }
      setVagas(data);
    } catch (error) {
      console.error('Erro ao buscar vagas:', error);
    }
  };

const adicionarVaga = async (vaga) => {
  try {
    const { data, error } = await supabase.from('vagas').insert([vaga]);
    if (error) {
      throw error;
    }
    if (data) {
      setVagas(prevVagas => [...prevVagas, ...(data || [])]);
    } else {
      console.warn('Nenhuma vaga foi retornada após a inserção.');
    }
  } catch (error) {
    console.error('Erro ao adicionar vaga:', error);
  }
};

const excluirVaga = async (index) => {
  try {
    if (!vagas || !vagas[index]) {
      throw new Error('Índice de vaga inválido ou vagas é null');
    }

    const vaga = vagas[index];
    
    // Excluir inscrições relacionadas antes de excluir a vaga
    const { error: deleteInscricaoError } = await supabase.from('inscricao').delete().eq('vaga_id', vaga.id);
    if (deleteInscricaoError) {
      throw deleteInscricaoError;
    }
    
    const { error } = await supabase.from('vagas').delete().eq('id', vaga.id);
    if (error) {
      throw error;
    }
    const updatedVagas = vagas.filter((_, idx) => idx !== index);
    setVagas(updatedVagas);
    Alert.alert('Sucesso', 'Vaga excluída com sucesso!');
  } catch (error) {
    console.error('Erro ao excluir vaga:', error);
    Alert.alert('Erro', 'Não foi possível excluir a vaga.');
  }
};

  const alterarVaga = async (index, vagaAtualizada) => {
    try {
      const vaga = vagas[index];
      const { data, error } = await supabase.from('vagas').update(vagaAtualizada).eq('id', vaga.id);
      if (error) {
        throw error;
      }
      const updatedVagas = vagas.map((v, idx) => (idx === index ? { ...data[0] } : v));
      setVagas(updatedVagas);
      console.log('Vaga alterada');
    } catch (error) {
      console.error('Erro ao alterar vaga:', error);
    }
  };

  const cadastroVaga = async (vaga_id) => {
    try {
      const storedId = await AsyncStorage.getItem('id');
      setId(parseInt(storedId)); // Set the id from AsyncStorage
      const { data, error } = await supabase.from('inscricao').insert({
        vaga_id: vaga_id,
        users_id: id// Use parsed id directly
      });

      if (error) {
        throw error;
      }

      console.log('---------- cadastroVaga data');
      console.log('vaga_id: ' + vaga_id + 'users_id' + id);
      console.log('----------');
      console.log("TelaContext");
      Alert.alert('Inscrição realizada', 'Você se inscreveu para esta vaga com sucesso.');
    } catch (error) {
      console.error('Erro ao se inscrever na vaga:', error);
      Alert.alert('Erro', 'Não foi possível se inscrever para esta vaga.');
      throw error;
    }
  };

  return (
    <VagaContext.Provider value={{ vagas,setVagas, adicionarVaga, excluirVaga, alterarVaga, cadastroVaga }}>
      {children}
    </VagaContext.Provider>
  );
};
