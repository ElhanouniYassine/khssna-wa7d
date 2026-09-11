import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
      <Stack>
            <Stack.Screen
                name='login'
                options={{
                    title:"Login",
                }}/>
            <Stack.Screen
                name='register'
                options={{
                    title:"Create Account"
                }}/>

      </Stack>
  );
}