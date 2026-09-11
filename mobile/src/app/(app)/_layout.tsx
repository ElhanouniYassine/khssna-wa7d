import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
      <Stack>
            <Stack.Screen
                name='index'
                options={{
                    title:"Home",
                }}/>
            <Stack.Screen
                name='profile'
                options={{
                    title:"Profile"
                }}/>

      </Stack>
  );
}