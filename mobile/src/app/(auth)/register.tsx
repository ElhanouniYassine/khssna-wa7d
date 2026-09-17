import { registerUser } from "@/services/api/auth";
import { Link, useRouter } from "expo-router";
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

type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
  city?: string;
};

export default function RegisterScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: FormErrors = {};

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedCity = city.trim();

    if (!trimmedName) {
      newErrors.name = "Name is required.";
    } else if (trimmedName.length < 2) {
      newErrors.name = "Name must contain at least 2 characters.";
    }

    if (!trimmedEmail) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must contain at least 8 characters.";
    }

    if (!trimmedCity) {
      newErrors.city = "City is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (loading) {
      return;
    }

    if (!validate()) {
      return;
    }

    setLoading(true);
    setServerError(null);

    try {
      await registerUser({
        name: name.trim(),
        email: email.trim(),
        password,
        city: city.trim(),
      });

      router.replace("/(auth)/login");
    } catch (error: any) {
      console.log("REGISTER ERROR:", error);

      const status = error.response?.status;
      const data = error.response?.data;
      const message = error.message;

      setServerError(
        `Status: ${status ?? "none"}\n` +
          `Message: ${message}\n` +
          `Backend: ${JSON.stringify(data)}`,
      );
    } finally {
      setLoading(false);
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
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Join Khssna Wa7d</Text>
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.label}>Name</Text>

              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                placeholder="Your name"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
                editable={!loading}
              />

              {errors.name && (
                <Text style={styles.fieldError}>{errors.name}</Text>
              )}

              <Text style={styles.label}>Email</Text>

              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="example@gmail.com"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
                editable={!loading}
              />

              {errors.email && (
                <Text style={styles.fieldError}>{errors.email}</Text>
              )}

              <Text style={styles.label}>Password</Text>

              <TextInput
                style={[styles.input, errors.password && styles.inputError]}
                placeholder="••••••••"
                placeholderTextColor="#999"
                secureTextEntry
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
                editable={!loading}
              />

              {errors.password && (
                <Text style={styles.fieldError}>{errors.password}</Text>
              )}

              <Text style={styles.label}>City</Text>

              <TextInput
                style={[styles.input, errors.city && styles.inputError]}
                placeholder="Casablanca"
                placeholderTextColor="#999"
                value={city}
                onChangeText={setCity}
                editable={!loading}
              />

              {errors.city && (
                <Text style={styles.fieldError}>{errors.city}</Text>
              )}

              {serverError && (
                <Text style={styles.serverError}>{serverError}</Text>
              )}

              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleRegister}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? "Creating account..." : "Create Account"}
                </Text>
              </TouchableOpacity>

              <View style={styles.footerContainer}>
                <Text style={styles.footerText}>Already have an account? </Text>

                <Link href="/(auth)/login" style={styles.footerLink}>
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

  keyboardAvoid: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  headerContainer: {
    marginBottom: 28,
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
    marginBottom: 6,
    backgroundColor: "#f9fafb",
  },

  inputError: {
    borderColor: "#dc2626",
  },

  fieldError: {
    color: "#dc2626",
    fontSize: 13,
    marginBottom: 10,
  },

  serverError: {
    color: "#dc2626",
    fontSize: 14,
    marginTop: 4,
    marginBottom: 8,
  },

  button: {
    height: 50,
    backgroundColor: "#2563eb",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },

  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },

  footerText: {
    fontSize: 14,
    color: "#6b7280",
  },

  footerLink: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2563eb",
  },
});
