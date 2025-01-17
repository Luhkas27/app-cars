import { createStackNavigator } from '@react-navigation/stack';

import Home from '~/screens/Home';
import Model from '~/screens/Model';
import SignIn from '~/screens/SignIn';

export type RootStackParamList = {
  SignIn: undefined;
  Home: undefined;
  Model: {
    brandId: any;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#FFFFFF' },
        gestureEnabled: false,
      }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Model" component={Model} />
    </Stack.Navigator>
  );
}
