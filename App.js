import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { AuthProvider } from "./src/context/AuthContext.tsx";
import { ThemeProvider } from "./src/context/ThemeContext.tsx";
import RootNavigator from "./src/navigation/RootNavigator";
import { persistor, store } from "./src/store";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <ThemeProvider>
            <AuthProvider>
              <RootNavigator />
            </AuthProvider>
          </ThemeProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
