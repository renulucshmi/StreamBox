import { StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 24,
  },
  topSection: {
    marginTop: 40,
    marginBottom: 32,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#111111",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    fontWeight: "400",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111111",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    color: "#111111",
    backgroundColor: "#FAFAFA",
  },
  inputError: {
    borderColor: "#E53935",
  },
  passwordContainer: {
    position: "relative",
  },
  passwordToggle: {
    position: "absolute",
    right: 14,
    top: 14,
  },
  passwordToggleText: {
    color: "#5B3FFF",
    fontSize: 14,
    fontWeight: "500",
  },
  errorText: {
    color: "#E53935",
    fontSize: 13,
    marginTop: 4,
  },
  generalError: {
    backgroundColor: "#FFEBEE",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  generalErrorText: {
    color: "#E53935",
    fontSize: 14,
    textAlign: "center",
  },
  primaryButton: {
    backgroundColor: "#5B3FFF",
    borderRadius: 24,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#5B3FFF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonDisabled: {
    backgroundColor: "#B8B0FF",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  linkContainer: {
    marginTop: 24,
    alignItems: "center",
  },
  linkText: {
    fontSize: 14,
    color: "#666666",
  },
  linkTextBold: {
    color: "#5B3FFF",
    fontWeight: "600",
  },
});
