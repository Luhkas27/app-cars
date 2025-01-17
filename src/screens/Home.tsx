import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Text, View, FlatList, Pressable } from 'react-native';

import { Header } from '~/components/Header';
import Loading from '~/components/Loading';
import { useAuth } from '~/contexts/AuthContext';
import { RootStackParamList } from '~/navigation';
import { getCarBrands } from '~/services/cars';
import { CarBrand } from '~/types/cars';

export default function Home() {
  const { user, setAuth } = useAuth();
  const [brands, setBrands] = useState<CarBrand[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const response = await getCarBrands();
      setBrands(response);
    } catch (error) {
      console.error('Erro ao carregar marcas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      setAuth({
        authenticated: false,
        user: null,
      });
      navigation.replace('SignIn');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <LinearGradient colors={['#4facfe', '#00f2fe']} style={{ flex: 1 }}>
      <View className=" flex-1 p-4">
        <Header title={`Bem-vindo, ${user?.name}!`} logout onLogoutClick={handleLogout} />

        <View className="flex-row justify-between space-x-4">
          <View className="flex-1 rounded-xl bg-white p-4 shadow-sm">
            <Text className="mb-4 text-xl font-semibold">Marcas Disponíveis</Text>

            <FlatList
              data={brands}
              keyExtractor={(item) => item.codigo.toString()}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => navigation.navigate('Model', { brandId: item.codigo })}
                  className="mb-2 rounded-lg bg-gray-50 p-4">
                  <Text className="font-semibold text-gray-700">{item.nome}</Text>
                </Pressable>
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}
