/**
 * Login Screen - Refactored
 * Following clean architecture principles:
 * - Uses validation utilities for form validation
 * - Separated validation logic from UI
 * - Clean, testable code
 */

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
import { authStyles } from "../styles/authStyles";
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
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={authStyles.container}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={authStyles.topSection}>
          <Image
            source={require("../../assets/images/StreamBoxLogo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={[authStyles.title, styles.titleBlue]}>StreamBox</Text>
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

const styles = StyleSheet.create({
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
    alignSelf: "center",
  },
  titleBlue: {
    color: "#2196F3",
  },
});
