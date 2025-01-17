import { ActivityIndicator, View } from 'react-native';

export default function Loading() {
  return (
    <View className="absolute inset-0 flex-1 items-center justify-center bg-white/70">
      <ActivityIndicator size="large" color="#4B5563" />
    </View>
  );
}
