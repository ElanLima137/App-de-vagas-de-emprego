import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Simule um tempo de espera para a tela de splash
    setTimeout(() => {
      // Navegue para a tela de login após o tempo de espera
      navigation.replace('TelaLogin');
    }, 1500); // Tempo de espera em milissegundos (por exemplo, 1500 ms = 1,5 segundos)
  },);

  return (
    <View style={styles.container}>
      {/* Coloque aqui a imagem ou conteúdo da sua tela de splash */}
      <Image source={require('../assets/image/logo1.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
