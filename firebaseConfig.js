import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

//Dados para configução com a base de dados
const firebaseConfig = {
  apiKey: "AIzaSyA0bbHJc2-y58sTMYIX0aik_Ub9Q8iMya8",
  authDomain: "barbeariast-9c7d2.firebaseapp.com",
  projectId: "barbeariast-9c7d2",
  storageBucket: "barbeariast-9c7d2.appspot.com",
  messagingSenderId: "619820845693",
  appId: "1:619820845693:web:a8fbe655cc3be6ef567f14"
};

//Cria a conexão
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default db;