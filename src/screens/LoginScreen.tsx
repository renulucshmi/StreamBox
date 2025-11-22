/**
 * Login Screen - Modern & Professional Design
 * Features: iOS-style floating card, enhanced spacing, Feather icon toggle for password visibility
 */

import { Feather } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { RootStackParamList } from "../types/navigation";
import { isValidForm, validateLoginForm } from "../utils/validation";

interface LoginScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "Login">;
}

interface ValidationErrors {
  email?: string;
  password?: string;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const { login } = useAuth();
  const { theme } = useTheme();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [generalError, setGeneralError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate form using utility function
  const validate = (): boolean => {
    const validationErrors = validateLoginForm({ email, password });
    setErrors(validationErrors);
    return isValidForm(validationErrors);
  };

  // Handle login
  const handleLogin = async (): Promise<void> => {
    setGeneralError("");

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await login({ email, password });
    } catch (error) {
      setGeneralError(
        (error as Error).message || "Login failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[
        styles.keyboardView,
        { backgroundColor: theme.colors.background },
      ]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Logo & Heading Section */}
          <View style={styles.headerSection}>
            <Image
              source={require("../../assets/images/StreamBoxLogo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={[styles.title, { color: theme.colors.primary }]}>
              StreamBox
            </Text>
            <Text
              style={[styles.subtitle, { color: theme.colors.textSecondary }]}
            >
              Sign in to continue
            </Text>
          </View>

          {/* Card Section */}
          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.colors.card,
                shadowColor: theme.colors.shadowColor,
              },
            ]}
          >
            {generalError ? (
              <View style={styles.errorBanner}>
                <Text style={styles.errorBannerText}>{generalError}</Text>
              </View>
            ) : null}

            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.text }]}>
                Email
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                    color: theme.colors.text,
                  },
                  errors.email && styles.inputError,
                ]}
                placeholder="Enter your email"
                placeholderTextColor={theme.colors.textTertiary}
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
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.text }]}>
                Password
              </Text>
              <View style={styles.passwordWrapper}>
                <TextInput
                  style={[
                    styles.input,
                    styles.passwordInput,
                    {
                      backgroundColor: theme.colors.surface,
                      borderColor: theme.colors.border,
                      color: theme.colors.text,
                    },
                    errors.password && styles.inputError,
                  ]}
                  placeholder="Enter your password"
                  placeholderTextColor={theme.colors.textTertiary}
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
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                  disabled={isSubmitting}
                  activeOpacity={0.7}
                >
                  <Feather
                    name={showPassword ? "eye-off" : "eye"}
                    size={20}
                    color={theme.colors.textSecondary}
                  />
                </TouchableOpacity>
              </View>
              {errors.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : null}
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={[
                styles.loginButton,
                {
                  backgroundColor: theme.colors.primary,
                  shadowColor: theme.colors.primary,
                },
                isSubmitting && styles.loginButtonDisabled,
              ]}
              onPress={handleLogin}
              disabled={isSubmitting}
              activeOpacity={0.8}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.loginText}>Login</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Footer Text */}
          <View style={styles.footer}>
            <Text
              style={[styles.footerText, { color: theme.colors.textSecondary }]}
            >
              Don't have an account?{" "}
              <Text
                style={[styles.footerLink, { color: theme.colors.primary }]}
                onPress={() => !isSubmitting && navigation.navigate("Register")}
              >
                Register
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 18,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  card: {
    borderRadius: 18,
    padding: 24,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  errorBanner: {
    backgroundColor: "#fee",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#fcc",
  },
  errorBannerText: {
    color: "#c33",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  inputError: {
    borderColor: "#ff4d4d",
    borderWidth: 1.5,
  },
  errorText: {
    color: "#ff4d4d",
    fontSize: 13,
    marginTop: 6,
    marginLeft: 4,
  },
  passwordWrapper: {
    position: "relative",
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeIcon: {
    position: "absolute",
    right: 14,
    top: 12,
    padding: 4,
  },
  loginButton: {
    borderRadius: 22,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  footer: {
    marginTop: 24,
    alignItems: "center",
  },
  footerText: {
    fontSize: 15,
  },
  footerLink: {
    fontWeight: "600",
  },
});
