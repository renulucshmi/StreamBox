/**
 * Context Type Definitions
 */

import { Theme, ThemeMode } from "./theme";
import { User } from "./user";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<User>;
  register: (data: {
    username: string;
    email: string;
    password: string;
  }) => Promise<User>;
  logout: () => Promise<void>;
}

export interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  toggleTheme: () => Promise<void>;
  loading: boolean;
}
