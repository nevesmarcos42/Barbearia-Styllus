import { StyleSheet, TextInput, View, TouchableOpacity, Text, Alert } from 'react-native';
import React, {useState} from 'react';
import { collection, addDoc } from 'firebase/firestore'
import { StatusBar } from 'expo-status-bar';
//importa os icons
import { MaterialCommunityIcons } from '@expo/vector-icons';
//Importa os components
import db from '../../firebaseConfig';
import Logo from '../components/Logo'

export default function Registrar({navigation}) {
  //Cria estados para a aplicação
  const [trabalho, setTrabalho] = useState("");
  const [valor, setvalor] = useState("");
  //Evia os dados informados no formulario para a base de dados
  //E checa os dados informados se estão fazios ou imcorretos
  const enviar = async () => {
    if( trabalho == '' && valor == '' ){
      Alert.alert('Os dados nao foram informados.', 'Informe!', [
        {
          text: 'OK'
        },
      ]);
      return '';
    } else {
      try{
        const docRef = await addDoc(collection(db, "Trabalhos"), { //Adiciona dados a base de dados
        servico: trabalho,
        valor: valor,
        date: new Date().getDate() //Data Atual
      });
        Alert.alert('Dados Enviado...', 'Dados Registrados!', [
          {
            text: 'OK'
            
          },
        ]);
        setTrabalho("");
        setvalor("")
      } catch (e) {
        console.error("error adding document: ", e);
      }
    }
  }

  return (
    <View style={styles.container}>

      <Logo/>

      <StatusBar style='light'/>

      <Text style={styles.text}>Trabalho Realizado:</Text>
      <TextInput style={styles.input}
        value={trabalho} 
        onChangeText={setTrabalho}
        placeholder="Trabalho"/>

      <Text style={styles.text}>Valor Cobrado:</Text>
      <TextInput style={styles.input}
        value={valor} 
        onChangeText={setvalor} 
        placeholder="0,00"
        keyboardType="numeric"/>

      <TouchableOpacity
        style={styles.roundButton1}
        onPress={enviar}>
        <Text style={styles.text}>Enviar</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.roundButton2}
        onPress={() => navigation.navigate('Menu')}>
        <MaterialCommunityIcons name="microsoft-xbox-controller-menu" size={40} color="white" />
      </TouchableOpacity>

    </View>
  );
}
//Configuração dos elemento em tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#D9D9D9',
    height: 60,
    width: 400,
    borderRadius: 30,
    borderWidth: 1,
    padding: 20,
    margin: 20,
  },
  roundButton1: {
    width: 200,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 40,
    backgroundColor: '#2D2B2B',
    marginTop: 30,
    marginBottom: 60
  },
  roundButton2: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 40,
    backgroundColor: '#2D2B2B',
  },
  text: {
    color: 'white',
  }
});
