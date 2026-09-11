import { StyleSheet, Text, View } from "react-native";

export default function Profile(){
    return  (
        <View style={styles.container}>
            <Text style={styles.paragraph}>This is my profile</Text>
        </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});