import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, {useState} from 'react'
import  { collection, getDocs } from 'firebase/firestore';
import { StatusBar } from 'expo-status-bar';
//Importa os components
import Logo from '../components/Logo';
import db from '../../firebaseConfig';

export default function Login({navigation}) {
    //Cria estados para a aplicação
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    //Checa se os dados se estão vazios, incorretos 
    //E se estão acadastrado na base de dados
    const check = async () => {
        const querySnapshot = await getDocs(collection(db, "barbeariaStyllus")); //Busca os dados na base de dados
        querySnapshot.forEach((doc) =>{
            if(doc.data().email == email &&doc.data().senha == senha){
                navigation.navigate("Menu");
                setEmail(" ");
                setSenha(" ");
              } else if (email == null && senha == null) {
                Alert.alert('Não foram informados os dados para o acesso...', 'Favor informa-los!', [
                  {
                    text: 'Ok'
                  }
                ]);
              } else {
                Alert.alert('Os dados estão incorretos...', 'Favor analiza-los!', [
                  {
                    text: 'Ok'
                  }
                ]);
              }
        })
    }

  return (
    <View style={styles.conatiner}>

        <Logo/>

        <StatusBar style='light'/>

        <TextInput style={styles.input}
            placeholder='Email'
            keyboardType='email-address'
            onChangeText={setEmail}
            value={email}
        />

        <TextInput style={styles.input}
            placeholder='********'
            keyboardType='numeric'
            secureTextEntry={true}
            onChangeText={setSenha}
            value={senha}
        />

        <TouchableOpacity style={styles.roundButton} onPress={check}>
            <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
        
    </View>
  )
}
//Configuração dos elemento em tela
const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        backgroundColor: '#D9D9D9',
        height: 60,
        width: 400,
        borderRadius: 30,
        borderWidth: 1,
        padding: 20,
        margin: 20
    },
    roundButton: {
        width: 160,
        height:60,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 40,
        backgroundColor: '#2D2B2B',
        top: 40
    },
    text: {
        color: 'white'
    }

});