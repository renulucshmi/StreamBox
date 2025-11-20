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

export default function RegisterScreen({ navigation }) {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!email.includes("@")) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    setGeneralError("");

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await register({ username, email, password });
    } catch (error) {
      setGeneralError(
        error.message || "Registration failed. Please try again."
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
          <Text style={authStyles.title}>StreamBox</Text>
          <Text style={authStyles.subtitle}>Create your account</Text>
        </View>

        <View style={authStyles.card}>
          {generalError ? (
            <View style={authStyles.generalError}>
              <Text style={authStyles.generalErrorText}>{generalError}</Text>
            </View>
          ) : null}

          <View style={authStyles.inputContainer}>
            <Text style={authStyles.inputLabel}>Username</Text>
            <TextInput
              style={[
                authStyles.input,
                errors.username && authStyles.inputError,
              ]}
              placeholder="Choose a username"
              placeholderTextColor="#999999"
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                if (errors.username) {
                  setErrors({ ...errors, username: "" });
                }
              }}
              autoCapitalize="none"
              editable={!isSubmitting}
            />
            {errors.username ? (
              <Text style={authStyles.errorText}>{errors.username}</Text>
            ) : null}
          </View>

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
                placeholder="Create a password"
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

          <View style={authStyles.inputContainer}>
            <Text style={authStyles.inputLabel}>Confirm Password</Text>
            <View style={authStyles.passwordContainer}>
              <TextInput
                style={[
                  authStyles.input,
                  errors.confirmPassword && authStyles.inputError,
                ]}
                placeholder="Re-enter your password"
                placeholderTextColor="#999999"
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  if (errors.confirmPassword) {
                    setErrors({ ...errors, confirmPassword: "" });
                  }
                }}
                secureTextEntry={!showConfirmPassword}
                editable={!isSubmitting}
              />
              <TouchableOpacity
                style={authStyles.passwordToggle}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isSubmitting}
              >
                <Text style={authStyles.passwordToggleText}>
                  {showConfirmPassword ? "Hide" : "Show"}
                </Text>
              </TouchableOpacity>
            </View>
            {errors.confirmPassword ? (
              <Text style={authStyles.errorText}>{errors.confirmPassword}</Text>
            ) : null}
          </View>

          <TouchableOpacity
            style={[
              authStyles.primaryButton,
              isSubmitting && authStyles.primaryButtonDisabled,
            ]}
            onPress={handleRegister}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={authStyles.primaryButtonText}>Create account</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={authStyles.linkContainer}>
          <Text style={authStyles.linkText}>
            Already have an account?{" "}
            <Text
              style={authStyles.linkTextBold}
              onPress={() => !isSubmitting && navigation.navigate("Login")}
            >
              Login
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
