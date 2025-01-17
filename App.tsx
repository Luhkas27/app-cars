import './global.css';

import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native';
import Toast from 'react-native-toast-message';

import { AuthProvider } from '~/contexts/AuthContext';
import RootStack from '~/navigation';

export default function App() {
  return (
    <LinearGradient colors={['#4facfe', '#00f2fe']} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <AuthProvider>
          <NavigationContainer>
            <RootStack />
            <Toast />
          </NavigationContainer>
        </AuthProvider>
      </SafeAreaView>
    </LinearGradient>
  );
}
