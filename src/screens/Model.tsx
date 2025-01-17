import { RouteProp, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import { Header } from '~/components/Header';
import Loading from '~/components/Loading';
import { RootStackParamList } from '~/navigation';
import { getCarModels } from '~/services/cars';
import { CarModel } from '~/types/cars';

export default function Model() {
  const [models, setModels] = useState<CarModel[]>([]);
  const [loading, setLoading] = useState(true);

  const { params } = useRoute<RouteProp<RootStackParamList, 'Model'>>();

  useEffect(() => {
    const loadModels = async () => {
      try {
        setLoading(true);
        const response = await getCarModels(params.brandId);
        setModels(response.modelos);
      } finally {
        setLoading(false);
      }
    };
    loadModels();
  }, [params.brandId]);

  if (loading) {
    return <Loading />;
  }

  return (
    <LinearGradient colors={['#4facfe', '#00f2fe']} style={{ flex: 1 }} className="flex-1">
      <View className="flex-1 px-2">
        <Header title="Modelos Disponíveis" showBackButton />
        <View className="p-4">
          <View className="flex-row justify-between space-x-4">
            <View className="flex-1 rounded-xl bg-white p-4 shadow-sm">
              <FlatList
                data={models}
                keyExtractor={(item) => item.codigo.toString()}
                renderItem={({ item }) => (
                  <View className="mb-2 rounded-lg bg-gray-50 p-4">
                    <Text className="font-semibold text-gray-700">{item.nome}</Text>
                  </View>
                )}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}
