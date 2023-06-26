import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-navigation';
//Importa os icons
import { AntDesign, Fontisto } from '@expo/vector-icons';
//Importa os elementos
import Logo from '../components/Logo';

export default function Menu({navigation}) {
  return (

    <SafeAreaView style={styles.container}>

      <Logo/>

      <StatusBar style='light'/>

      <View style={styles.botoes}>

        <TouchableOpacity
          style={styles.roundButton}
          onPress={() => navigation.navigate("Cadastro")}>
            <AntDesign name='pluscircleo' size={40} color='white'/>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.roundButton}
          onPress={() => navigation.navigate("Registro")}>
            <Fontisto name='nav-icon-list-a' size={24} color='white'/>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}
//Configuração dos elemento em tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  roundButton: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 40,
    backgroundColor: '#2D2B2B',
    marginRight: 15
  },
  botoes: {
    flexDirection: 'row'
  }
});