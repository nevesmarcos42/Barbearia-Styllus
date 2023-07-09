import { FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View, Text, Alert } from 'react-native';
import { collection, getDocs } from "firebase/firestore/lite";
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { doc, deleteDoc } from "firebase/firestore";
//Importa os components
import db from '../../firebaseConfig';
import Logo from '../components/Logo';
//importa os icons
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
//Cria as varias usadas
let totalDia = 0;
let totalSemana = 0;
let dia = new Date().getDate();
let ids = [];
let temporario = [];
let qnt = 0;

export default function Registros({navigation}){
    //Cria os estados para a aplicação
    const [servico, setServico] = useState([]);
    //Buscar e filtra os dados trazidos da base de dados
    const getDados = async () => {
        const querySnapshot = await getDocs(collection(db, "Trabalhos")); //Busca dados na base de dados
        querySnapshot.forEach((doc) => {
            const service = {
                id: doc.id,
                servico: doc.data().servico,
                valor: doc.data().valor,
                data: doc.data().date,
            };
            ids.push(doc.id);
            temporario.push(service);
            if( temporario.length > qnt){
                totalSemana = totalSemana + parseInt(doc.data().valor, 10);
                if(dia == doc.data().date){
                    totalDia = totalDia + parseInt(doc.data().valor, 10);
                }
                qnt= qnt + 1;
            }
        });
        setServico(temporario);
    }
   const deleteDados = () => {
        ids.forEach(element => {
            deleteDoc(doc(db, "Trabalhos", element));
            totalDia = 0;
            totalSemana = 0;
            setServico("");
            Alert.alert('Os dados nao foram apagados', 'com sucesso!', [
                {
                  text: 'OK'
                },
            ]);
        });
    }

    useEffect(() => {
       getDados();
    }, []);

    const dados = servico ? Object.values(servico) : [];
    
    return(
        <SafeAreaView style={styles.container}>

            <Logo/>

            <StatusBar style='light'/>

            <Text style={styles.trab}>-Total dos trabalhos realizados-</Text>
            
            <Text style={styles.trab}>Dia: {totalDia}</Text>
            
            <Text style={styles.trab}>Semana: {totalSemana} </Text>
            
            <FlatList
                
                data={servico}
                keyExtractor={item=>item.id}
                renderItem={({item}) =>
                    <View style={styles.item}>
                        <Text style={styles.trab}>{item.servico}</Text>
                        <Text style={styles.trab}>{'R$'+item.valor}</Text>
                    </View>
                }
                        
            />

            <View style={styles.baseBoard}>
                
                <TouchableOpacity 
                    style={styles.roundButton}
                    onPress={deleteDados}
                >
                    <AntDesign name='delete' size={40} color="white"/>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.roundButton}
                    onPress={() => navigation.navigate('Menu')}
                >
                    <MaterialCommunityIcons name='microsoft-xbox-controller-menu' size={40} color="white"/>
                </TouchableOpacity>

            </View>

        </SafeAreaView>
    )
}
//Configuração dos elemento em tela
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'white'
    },
    baseBoard: {
        flexDirection: 'row',
        backgroundColor:'#000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
        backgroundColor: '#2D2B2B',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16
    },
    trab: {
        fontSize: 20,
        color: '#fff'
    },
    roundButton: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 40,
        backgroundColor: '#2D2B2B',
        marginRight: 15,
        marginBottom: 10
    }
})