import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button } from 'react-native';
import { supabase } from '../client/inisSupabase';

const TelaPessoasCadastradas = ({ route }) => {
  const { vagaId } = route.params;
  const [pessoas, setPessoas] = useState([]);
  const [nomeVaga, setNomeVaga] = useState('');
  const [pesquisaVaga, setPesquisaVaga] = useState('');
  const [vagasFiltradas, setVagasFiltradas] = useState([]);

  useEffect(() => {
    const fetchPessoasCadastradas = async () => {
      try {
        const { data: vagaData, error: vagaError } = await supabase
          .from('vagas')
          .select('titulo')
          .eq('id', vagaId)
          .single();

        if (vagaError) {
          throw vagaError;
        }

        setNomeVaga(vagaData.titulo);

        const { data, error } = await supabase
          .from('inscricao')
          .select('users_id')
          .eq('vaga_id', vagaId);
        
        if (error) {
          throw error;
        }
        
        const usuarios = await Promise.all(data.map(async (inscricao) => {
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('first_name, email')
            .eq('id', inscricao.users_id);

          if (userError) {
            throw userError;
          }

          return userData[0];
        }));

        setPessoas(usuarios);
        setVagasFiltradas(usuarios);
      } catch (error) {
        console.error('Erro ao buscar pessoas cadastradas:', error.message);
      }
    };

    fetchPessoasCadastradas();
  }, [vagaId]);

  const handlePesquisarVaga = () => {
    const vagasFiltradas = pessoas.filter(vaga =>
      vaga.first_name.toLowerCase().includes(pesquisaVaga.toLowerCase())
    );
    setVagasFiltradas(vagasFiltradas);
  };

  return (
    <View>
      <Text>Pessoas cadastradas na vaga: {nomeVaga}</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setPesquisaVaga(text)}
        value={pesquisaVaga}
        placeholder="Pesquisar por nome de vaga"
      />
      <Button
        onPress={handlePesquisarVaga}
        title="Pesquisar"
      />
      <FlatList
        data={vagasFiltradas}
        keyExtractor={(item, index) => (item && item.id) ? item.id.toString() : index.toString()}
        renderItem={({ item }) => (
          <View>
            {pesquisaVaga.length > 0 && (
              <Text>Nome da vaga: {nomeVaga}</Text>
            )}
            {(!pesquisaVaga.length || item.first_name.toLowerCase().includes(pesquisaVaga.toLowerCase())) && (
              <View>
                <Text>Nome: {item && item.first_name}</Text>
                <Text>Email: {item && item.email}</Text>
                {/* Adicione outros campos que você deseja exibir */}
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default TelaPessoasCadastradas;
