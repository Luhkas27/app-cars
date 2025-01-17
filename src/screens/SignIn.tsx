import { zodResolver } from '@hookform/resolvers/zod';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

import { Button } from '~/components/Button';
import Input from '~/components/Input';
import { useAuth } from '~/contexts/AuthContext';
import { RootStackParamList } from '~/navigation';
import { signInSchema, SignInData } from '~/schema/signIn';
import { signIn } from '~/services/auth';
import { SignInResponse } from '~/types/signIn';

export default function SignIn() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      user: '',
      password: '',
    },
  });

  const { setAuth } = useAuth();

  const onSubmit = async (data: SignInData) => {
    const result = (await signIn(data.user, data.password)) as SignInResponse;

    if (result?.error === false) {
      await AsyncStorage.setItem('@AppCar:user', JSON.stringify(result.user));

      setAuth({
        authenticated: true,
        user: result.user,
      });

      navigation.navigate('Home');
    }
    return result;
  };

  return (
    <LinearGradient colors={['#4facfe', '#00f2fe']} style={{ flex: 1 }}>
      <View className="flex-1  p-4">
        <View className=" items-center ">
          <Text className="text-3xl font-bold text-white">App Car</Text>
        </View>

        <View className="w-full flex-1 justify-center">
          <Input
            label="Usuário"
            control={control}
            name="user"
            placeholder="Usuário"
            autoCapitalize="none"
            className="mb-2 w-full"
            touched
            errorMessage={errors.user?.message}
          />

          <Input
            label="Senha"
            control={control}
            name="password"
            placeholder="Senha"
            secureTextEntry
            className="mb-2 w-full"
            touched
            errorMessage={errors.password?.message}
          />
        </View>

        <Button isSubmitting={isSubmitting} onPress={handleSubmit(onSubmit)} />
      </View>
    </LinearGradient>
  );
}
