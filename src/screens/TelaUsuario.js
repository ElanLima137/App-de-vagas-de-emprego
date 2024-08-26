import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BarraDashboard from '../screens/BarraDashboard';
import { VagaContext } from '../screens/VagaContext';
import styles from '../constants/styles';
import { supabase } from '../client/inisSupabase'; // Importando o Supabase Client

const TelaUsuario = () => {
  const navigation = useNavigation();
  const { vagas, setVagas } = useContext(VagaContext); // Assumindo que VagaContext fornece vagas e setVagas
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchVagas = async () => {
      const { data, error } = await supabase.from('vagas').select('*');
      if (error) {
        console.error('Erro ao buscar vagas:', error);
      } else {
        setVagas(data);
      }
    };

    fetchVagas();
  }, [setVagas]);

  // Filtrar as vagas com base no texto de pesquisa
  const filteredVagas = vagas.filter(vaga => vaga.titulo.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <View style={styles.container}>
      <View style={styles.searchBarTopContainer}>
        <View style={styles.searchBarIcon}>
          <Icon name="search" size={20} color="#777" />
        </View>
        <TextInput
          style={styles.searchBarTop}
          placeholder="Pesquisar por nome de vaga"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {filteredVagas.length === 0 ? (
          <Text>Nenhuma vaga disponível.</Text>
        ) : (
          // Mapeie as vagas filtradas em pares
          Array.from({ length: Math.ceil(filteredVagas.length / 2) }, (_, row) => (
            <View key={row} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              {filteredVagas.slice(row * 2, row * 2 + 2).map((vaga, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.vagaContainer, { backgroundColor: '#f0f0f0', borderRadius: 8, padding: 10, width: '48%' }]} // Altere o estilo aqui
                  onPress={() => navigation.navigate('TelaDetalhesVaga', { vaga })}
                >
                  <Text style={styles.vagaTitulo}>{vaga.titulo}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))
        )}
      </ScrollView>

      <BarraDashboard />
    </View>
  );
};

export default TelaUsuario;
