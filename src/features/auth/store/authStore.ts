import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { authService } from "../services";
import { AuthState, LoginCredentials, User } from "../types";

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  initializeAuth: () => Promise<void>;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      loading: true,
      error: null,

      // Acciones
      login: async (credentials: LoginCredentials) => {
        set({ loading: true, error: null });

        try {
          const response = await authService.login(credentials);
          authService.setTokens(response.token);

          const user: User = {
            name: response.user,
          };

          set({
            user,
            isAuthenticated: true,
            loading: false,
            error: null,
          });
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Error al iniciar sesión";

          set({
            loading: false,
            error: errorMessage,
            isAuthenticated: false,
            user: null,
          });
          throw error;
        }
      },

      logout: async () => {
        set({ loading: true });

        try {
          await authService.logout();
          set({
            user: null,
            isAuthenticated: false,
            loading: false,
            error: null,
          });
        } catch (error) {
          console.error("Error al cerrar sesión:", error);
          set({
            user: null,
            isAuthenticated: false,
            loading: false,
            error: "Error al cerrar sesión",
          });
        }
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading: boolean) => {
        set({ loading });
      },

      initializeAuth: async () => {
        set({ loading: true });

        try {
          const token = authService.getToken();

          if (token) {

            const currentState = get();
            if (currentState.user) {
              set({
                isAuthenticated: true,
                loading: false,
              });
            } else {
              const user: User = {
                name: "John Doe",
              };

              set({
                user,
                isAuthenticated: true,
                loading: false,
              });
            }
          } else {
            set({
              user: null,
              isAuthenticated: false,
              loading: false,
            });
          }
        } catch (error) {
          console.error("Error al inicializar autenticación:", error);
          authService.clearTokens();
          set({
            user: null,
            isAuthenticated: false,
            loading: false,
            error: "Error al verificar autenticación",
          });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          const token = authService.getToken();
          if (!token && state.isAuthenticated) {
            state.user = null;
            state.isAuthenticated = false;
          }
          state.loading = false;
        }
      },
    }
  )
);
