import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet,  View } from 'react-native';
//Cria carrega a imagem usado com logo do app
export default function Logo() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image style={styles.image} resizeMode='stretch' source={require('../../assets/icon.png')}/>
    </View>
  );
}
//Configuração do elemento imagem 
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 300,
    width: 300,
    borderRadius: 200,
  },
});
