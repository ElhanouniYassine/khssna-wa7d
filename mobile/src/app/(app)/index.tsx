import { Link } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Khssna Wa7d</Text>
      <Text>Welcome 👋</Text>
      <Link href="/profile" asChild>
        <Button title="Go to profile" /> 
       </Link>
       <Link href="/register" asChild>
        <Button title="Go to Login" />
       </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});