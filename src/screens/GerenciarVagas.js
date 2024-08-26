import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Modal, TextInput } from 'react-native';
import { VagaContext } from '../screens/VagaContext';
import styles from '../constants/styles';
import { supabase } from '../client/inisSupabase'; // Importe o módulo de Supabase

const GerenciarVagas = ({ navigation }) => {
  const { vagas, setVagas, excluirVaga, alterarVaga } = useContext(VagaContext);

  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const [modalVisualizarVisible, setModalVisualizarVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [local, setLocal] = useState('');
  const [pessoasCadastradas, setPessoasCadastradas] = useState([]);

  const openEditModal = (index, vaga) => {
    setCurrentIndex(index);
    setTitulo(vaga.titulo);
    setDescricao(vaga.descricao);
    setLocal(vaga.local);
    setModalEditarVisible(true);
  };

  const handleSaveVaga = async () => {
    if (currentIndex !== null) {
      const vagaAtualizada = { id: vagas[currentIndex].id, titulo, descricao, local };
      await alterarVaga(currentIndex, vagaAtualizada);
      setModalEditarVisible(false);
      setTitulo('');
      setDescricao('');
      setLocal('');
      Alert.alert('Sucesso', 'Vaga alterada com sucesso!');
    }
  };

  const handleDeleteVaga = (index) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Você tem certeza que deseja excluir esta vaga?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: () => {
            excluirVaga(index);
          },
        },
      ]
    );
  };

  const handleViewCandidates = async (vaga) => {
    console.log('handleViewCandidates: ' + vaga.id);
    try {
      const { data: inscricoesData, error: inscricoesError } = await supabase
        .from('inscricao')
        .select('users_id')
        .eq('vaga_id', vaga.id);

      if (inscricoesError) {
        console.log('Erro na busca de inscrições');
        console.error('Erro ao buscar inscrições:', inscricoesError.message);
        return;
      }

      console.log('Dados das inscrições:', inscricoesData);

      if (inscricoesData && inscricoesData.length > 0) {
        const usersIds = [...new Set(inscricoesData.map((inscricao) => inscricao.users_id))];
        console.log('---------- usersIds');
        console.log(usersIds);
        console.log('----------');
        const { data: usersData, error: usersError } = await supabase
          .from('users') // Nome da tabela de usuários
          .select('first_name, email, ra') // Colunas que contêm os dados dos usuários, incluindo RA
          .in('id', usersIds);

        if (usersError) {
          console.error('Erro ao buscar nomes de usuários:', usersError.message);
          return;
        }

        console.log('Dados dos usuários:', usersData);

        if (usersData && usersData.length > 0) {
          const nomesUsuarios = usersData.map((user) => {
            if (user.ra) {
              return `${user.first_name} (${user.email}, RA: ${user.ra})`;
            } else {
              return `${user.first_name} (${user.email})`;
            }
          });
          setPessoasCadastradas(nomesUsuarios);
          setModalVisualizarVisible(true);
        } else {
          console.log('Nenhum usuário encontrado.');
          setPessoasCadastradas([]);
          setModalVisualizarVisible(true);
        }
      } else {
        console.log('Nenhuma inscrição encontrada para esta vaga.');
        setPessoasCadastradas([]);
        setModalVisualizarVisible(true);
      }
    } catch (error) {
      console.error('Erro ao buscar inscrições e usuários:', error.message);
    }
  };

  const handleCloseModal = () => {
    setPessoasCadastradas([]); // Limpa o estado de pessoas cadastradas
    setModalVisualizarVisible(false);
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>

        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Gerenciar Vagas</Text>

        {vagas.length === 0 ? (
          <Text>Nenhuma vaga disponível.</Text>
        ) : (
          vagas.map((vaga, index) => (
            <View key={index} style={styles.vagaContainer}>
              <Text style={styles.vagaTitulo}>{vaga.titulo}</Text>
              <TouchableOpacity
                style={[styles.dashboardButton, { backgroundColor: 'blue' }]}
                onPress={() => openEditModal(index, vaga)}
              >
                <Text style={styles.dashboardButtonText}>Alterar Vaga</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.dashboardButton, { backgroundColor: 'green' }]}
                onPress={() => handleViewCandidates(vaga)}
              >
                <Text style={styles.dashboardButtonText}>Visualizar Pessoas Cadastradas</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.dashboardButton, { backgroundColor: 'red' }]}
                onPress={() => handleDeleteVaga(index)}
              >
                <Text style={styles.dashboardButtonText}>Excluir Vaga</Text>
              </TouchableOpacity>
            </View>
          ))
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalEditarVisible}
          onRequestClose={() => {
            setModalEditarVisible(!modalEditarVisible);
          }}
        >
          <View style={styles.modalView}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Alterar Vaga</Text>

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

            <TouchableOpacity style={styles.botao} onPress={handleSaveVaga}>
              <Text style={styles.textoBotao}>Salvar Alterações</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.botao, { backgroundColor: 'red' }]}
              onPress={() => setModalEditarVisible(false)}
            >
              <Text style={styles.textoBotao}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisualizarVisible}
          onRequestClose={handleCloseModal} // Fecha o modal e limpa o estado
        >
          <View style={styles.modalView}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Pessoas Cadastradas</Text>
            {pessoasCadastradas.length === 0 ? (
              <Text>Nenhuma pessoa cadastrada para esta vaga.</Text>
            ) : (
              pessoasCadastradas.map((pessoa, index) => (
                <View key={index}>
                  <Text>{pessoa}</Text>
                </View>
              ))
            )}
            <TouchableOpacity
              style={[styles.botao, { backgroundColor: 'red', marginTop: 10 }]}
              onPress={handleCloseModal}
            >
              <Text style={styles.textoBotao}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </Modal>

      <TouchableOpacity 
        style={styles.botao}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>

      </View>
    </ScrollView>
  );
};

export default GerenciarVagas;
