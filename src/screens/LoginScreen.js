import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { authStyles } from "../styles/authStyles";

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    setGeneralError("");

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await login({ email, password });
    } catch (error) {
      setGeneralError(error.message || "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={authStyles.container}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={authStyles.topSection}>
          <Text style={authStyles.title}>StreamBox</Text>
          <Text style={authStyles.subtitle}>Sign in to continue</Text>
        </View>

        <View style={authStyles.card}>
          {generalError ? (
            <View style={authStyles.generalError}>
              <Text style={authStyles.generalErrorText}>{generalError}</Text>
            </View>
          ) : null}

          <View style={authStyles.inputContainer}>
            <Text style={authStyles.inputLabel}>Email</Text>
            <TextInput
              style={[authStyles.input, errors.email && authStyles.inputError]}
              placeholder="Enter your email"
              placeholderTextColor="#999999"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) {
                  setErrors({ ...errors, email: "" });
                }
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!isSubmitting}
            />
            {errors.email ? (
              <Text style={authStyles.errorText}>{errors.email}</Text>
            ) : null}
          </View>

          <View style={authStyles.inputContainer}>
            <Text style={authStyles.inputLabel}>Password</Text>
            <View style={authStyles.passwordContainer}>
              <TextInput
                style={[
                  authStyles.input,
                  errors.password && authStyles.inputError,
                ]}
                placeholder="Enter your password"
                placeholderTextColor="#999999"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.password) {
                    setErrors({ ...errors, password: "" });
                  }
                }}
                secureTextEntry={!showPassword}
                editable={!isSubmitting}
              />
              <TouchableOpacity
                style={authStyles.passwordToggle}
                onPress={() => setShowPassword(!showPassword)}
                disabled={isSubmitting}
              >
                <Text style={authStyles.passwordToggleText}>
                  {showPassword ? "Hide" : "Show"}
                </Text>
              </TouchableOpacity>
            </View>
            {errors.password ? (
              <Text style={authStyles.errorText}>{errors.password}</Text>
            ) : null}
          </View>

          <TouchableOpacity
            style={[
              authStyles.primaryButton,
              isSubmitting && authStyles.primaryButtonDisabled,
            ]}
            onPress={handleLogin}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={authStyles.primaryButtonText}>Login</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={authStyles.linkContainer}>
          <Text style={authStyles.linkText}>
            Don't have an account?{" "}
            <Text
              style={authStyles.linkTextBold}
              onPress={() => !isSubmitting && navigation.navigate("Register")}
            >
              Register
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
