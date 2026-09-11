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
  const [errors, setErrors] = useState<{ name?: string;email?: string;city?: string; password?: string }>({});
  const handleRegister = () => {
  const nextErrors: {
    name?: string;
    email?: string;
    city?: string;
    password?: string;
  } = {};

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedCity = city.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!trimmedName) {
    nextErrors.name = "Name is required!";
  } else if (trimmedName.length < 2) {
    nextErrors.name = "Name must be at least 2 characters";
  }

  if (!trimmedEmail) {
    nextErrors.email = "Email is required!";
  } else if (!emailRegex.test(trimmedEmail)) {
    nextErrors.email = "Please enter a valid email address";
  }

  if (!password) {
    nextErrors.password = "Password is required!";
  } else if (password.length < 8) {
    nextErrors.password = "Password must be at least 8 characters";
  }

  if (!trimmedCity) {
    nextErrors.city = "City is required!";
  }

  setErrors(nextErrors);

  if (Object.keys(nextErrors).length > 0) {
    return false;
  }

  console.log("Registering with:", {
    name: trimmedName,
    email: trimmedEmail,
    password,
    city: trimmedCity,
  });

  return true;
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
              <Text style={styles.title}>Create Account</Text>

              <Text style={styles.subtitle}>
                Join Khssna Wa7d
              </Text>
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.label}>Name</Text>

              <TextInput
                style={styles.input}
                placeholder="Your name"
                placeholderTextColor="#999"
                autoCapitalize="words"
                value={name}
                onChangeText={setName}
              />
              {errors.name &&
                <Text style={styles.errorText}>
                    {errors.name}
                </Text>
              }

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
              {errors.email &&
                <Text style={styles.errorText}>
                    {errors.email}
                </Text>
              }

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
              {errors.password &&
                <Text style={styles.errorText}>
                    {errors.password}
                </Text>
              }

              <Text style={styles.label}>City</Text>

              <TextInput
                style={styles.input}
                placeholder="Casablanca"
                placeholderTextColor="#999"
                autoCapitalize="words"
                value={city}
                onChangeText={setCity}
              />
              {errors.city &&
                <Text style={styles.errorText}>
                    {errors.city}
                </Text>
              }

              <TouchableOpacity
                style={styles.button}
                onPress={handleRegister}
              >
                <Text style={styles.buttonText}>
                  Create Account
                </Text>
              </TouchableOpacity>

              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>
                  Already have an account?{" "}
                </Text>

                <Link href="/login" style={styles.loginLink}>
                  Log in
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
  errorText: {
  color: "#dc2626",
  fontSize: 13,
  marginTop: -10,
  marginBottom: 12,
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