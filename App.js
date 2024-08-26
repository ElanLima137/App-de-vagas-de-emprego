import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { VagaProvider } from './src/screens/VagaContext';
import TelaLogin from './src/screens/TelaLogin';
import TelaRegistro from './src/screens/TelaRegistro';
import PoliticaPrivacidade from './src/screens/PoliticaPrivacidade';
import TelaUsuario from './src/screens/TelaUsuario';
import TelaLancarVaga from './src/screens/TelaLancarVaga';
import TelaAdministrador from './src/screens/TelaAdmin';
import SplashScreen from './src/screens/SplashScreen';
import TelaPdf from './src/screens/TelaPdf';
import TelaEsqueceuSenha from './src/screens/TelaEsqueceuSenha';
import PerfilUsuario from './src/screens/PerfilUsuario';
import TelaDetalhesVaga from './src/screens/TelaDetalhesVaga';
import GerenciarVagas from './src/screens/GerenciarVagas';
import TelaAlterarVaga from './src/screens/TelaAlterarVaga';
import TelaPessoasCadastradas from './src/screens/TelaPessoasCadastradas';


const Stack = createStackNavigator();

const App = () => {
  return (
  
    <VagaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="TelaLogin" component={TelaLogin} />
          <Stack.Screen name="TelaRegistro" component={TelaRegistro} />
          <Stack.Screen name="PoliticaPrivacidade" component={PoliticaPrivacidade} />
          <Stack.Screen name="TelaUsuario" component={TelaUsuario} />
          <Stack.Screen name="TelaLancarVaga" component={TelaLancarVaga} />
          <Stack.Screen name="TelaAdmin" component={TelaAdministrador} />
          <Stack.Screen name="TelaPdf" component={TelaPdf} />
          <Stack.Screen name="TelaEsqueceuSenha" component={TelaEsqueceuSenha} />
          <Stack.Screen name="PerfilUsuario" component={PerfilUsuario} />
          <Stack.Screen name="TelaDetalhesVaga" component={TelaDetalhesVaga} />
          <Stack.Screen name="GerenciarVagas" component={GerenciarVagas} />
          <Stack.Screen name="TelaAlterarVaga" component={TelaAlterarVaga} />
          <Stack.Screen name="TelaPessoasCadastradas" component={TelaPessoasCadastradas} />



        </Stack.Navigator>
      </NavigationContainer>
    </VagaProvider>

  );
};

export default App;
