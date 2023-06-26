import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/sreens/Login';
import Menu from './src/sreens/Menu';
import Cadastro from './src/sreens/Cadastro';
import Registro from './src/sreens/Registro';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style='auto'/>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{title:''}}/>
        <Stack.Screen name="Menu" component={Menu} options={{title:'', headerLeft:null}}/>
        <Stack.Screen name="Cadastro" component={Cadastro} options={{title:''}}/>
        <Stack.Screen name="Registro" component={Registro} options={{title:''}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
