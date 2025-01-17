import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

import Loading from './Loading';

type ButtonProps = {
  isSubmitting: boolean;
} & TouchableOpacityProps;

export function Button({ isSubmitting, ...props }: ButtonProps) {
  return (
    <View className="mb-10">
      <TouchableOpacity {...props} className="w-full rounded-md bg-white p-4">
        {isSubmitting ? (
          <View className="p-4">
            <Loading />
          </View>
        ) : (
          <Text className="text-center text-lg font-bold text-black">Entrar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
