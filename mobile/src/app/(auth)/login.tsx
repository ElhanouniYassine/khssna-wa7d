import { login } from "@/services/api/auth";
import { getToken, saveToken } from "@/services/storage/authStorage";
import { Link } from "expo-router";
import { useState } from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");

  const handleLogin = async () => {
    try{
        const response= await login(email,password);
        // return response;
        await saveToken(response.token)
        const respons=await getToken();
        console.log("token retrieved",respons);
        console.log(response);
    }catch(error){
        console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Log in</Text>

              <Text style={styles.subtitle}>
                Join Khssna Wa7d
              </Text>
            </View>

            <View style={styles.formContainer}>
              

              <Text style={styles.label}>Email</Text>

              <TextInput
                style={styles.input}
                placeholder="example@gmail.com"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
              />

              <Text style={styles.label}>Password</Text>

              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#999"
                secureTextEntry
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
              />

              

              <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
              >
                <Text style={styles.buttonText}>
                  Log in
                </Text>
              </TouchableOpacity>

              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>
                  Don't have an account?{" "}
                </Text>

                <Link href="/register" style={styles.loginLink}>
                  Create Account
                </Link>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  keyboardAvoid: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  headerContainer: {
    marginBottom: 32,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    fontSize: 15,
    color: "#6b7280",
    marginTop: 6,
  },

  formContainer: {
    width: "100%",
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#111827",
    marginBottom: 16,
    backgroundColor: "#f9fafb",
  },

  button: {
    height: 50,
    backgroundColor: "#2563eb",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },

  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },

  loginText: {
    fontSize: 14,
    color: "#6b7280",
  },

  loginLink: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2563eb",
  },
});