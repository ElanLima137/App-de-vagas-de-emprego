import React from 'react';
import { View, Text, ScrollView } from 'react-native';

const PoliticaPrivacidade = () => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{
          backgroundColor: 'white',
          borderRadius: 10,
          elevation: 5,
          maxWidth: '80%', // Definindo a largura máxima em relação ao tamanho da tela
          padding: 20,
          margin: 20,
          textAlign: 'center',
            
            
            }}>Lei Geral de Proteção de Dados Pessoais (LGPD)
A Lei Geral de Proteção de Dados Pessoais (LGPD), Lei n° 13.709/2018, foi promulgada para proteger os direitos fundamentais de liberdade e de privacidade, e a livre formação da personalidade de cada indivíduo. A Lei fala sobre o tratamento de dados pessoais, dispostos em meio físico ou digital, feito por pessoa física ou jurídica de direito público ou privado, englobando um amplo conjunto de operações que podem ocorrer em meios manuais ou digitais. No âmbito da LGPD, o tratamento dos dados pessoais pode ser realizado por dois agentes de tratamento – o Controlador e o Operador. Além deles, há a figura do Encarregado, que é a pessoa indicada pelo Controlador para atuar como canal de comunicação entre o Controlador, o Operador, os(as) titulares dos dados e a Autoridade Nacional de Proteção de Dados (ANPD). Tema fundamental trabalhado pela Lei, o tratamento de dados diz respeito a qualquer atividade que utiliza um dado pessoal na execução da sua operação, como, por exemplo, coleta, produção, recepção, classificação, utilização, acesso, reprodução, transmissão, distribuição, processamento, arquivamento, armazenamento, eliminação, avaliação ou controle da informação, modificação, comunicação, transferência, difusão ou extração. Antes de iniciar qualquer tipo de tratamento de dados pessoais, o agente deve se certificar que a finalidade da operação está registrada de forma clara e explícita, e que os propósitos especificados e informados ao(à) titular dos dados. No caso do setor público, a principal finalidade do tratamento está relacionada à execução de políticas públicas, devidamente previstas em lei, regulamentos ou respaldadas em contratos, convênios ou instrumentos semelhantes. O compartilhamento dentro da administração pública, no âmbito da execução de políticas públicas, é previsto na lei e dispensa o consentimento específico. Contudo, o órgão que coleta deve informar com transparência qual dado será compartilhado e com quem. Do outro lado, o órgão que solicita receber o compartilhamento precisa justificar esse acesso com base na execução de uma política pública específica e claramente determinada, descrevendo o motivo da solicitação de acesso e o uso que será feito com os dados. Informações protegidas por sigilo seguem protegidas e sujeitas a normativos e regras específicas. Essas e outras questões fundamentais devem ser observadas pelos órgãos e entidades da administração federal, no sentido de assegurar a conformidade do tratamento de dados pessoais de acordo com as hipóteses legais e princípios da LGPD. A lei estabelece uma estrutura legal de direitos dos(as) titulares de dados pessoais. Esses direitos devem ser garantidos durante toda a existência do tratamento dos dados pessoais realizado pelo órgão ou entidade. Para o exercício dos direitos dos(as) titulares, a LGPD prevê um conjunto de ferramentas que aprofundam obrigações de transparência ativa e passiva, e criam meios processuais para mobilizar a Administração Pública. Documento base: Guia de Boas Práticas para Implementação na Administração Pública Federal da Lei Geral de Proteção de Dados – documento elaborado pelos diferentes órgãos que compõem o Comitê Central de Governança de Dados e que contém orientações sobre as atribuições e atuação do Controlador, do Operador e do Encarregado, bem como da Autoridade Nacional de Proteção de Dados (ANPD) e versa, ainda, sobre os direitos fundamentais dos(as) cidadãos(ãs) titulares dos dados, aborda hipóteses de tratamento dos dados e sua realização, indica o ciclo de vida do tratamento dos dados pessoais e apresenta boas práticas em segurança da informação.</Text>
      {/* Adicione o WebView aqui para exibir o conteúdo do HTML se desejar */}
    </View>
        </ScrollView>

  );
};

export default PoliticaPrivacidade;
