import apiClient from "../../../lib/axios";
import { LoginCredentials, AuthResponse, ApiError } from "../types";
import { AxiosError } from "axios";

class AuthService {
  private readonly tokenKey = "token";

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        "/login",
        credentials
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async logout(): Promise<void> {
    try {
      this.clearTokens();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  }

  getToken(): string | null {
    try {
      return localStorage.getItem(this.tokenKey);
    } catch (error) {
      console.error("Error al obtener token:", error);
      return null;
    }
  }

  setTokens(token: string): void {
    try {
      localStorage.setItem(this.tokenKey, token);
    } catch (error) {
      console.error("Error al guardar tokens:", error);
    }
  }

  clearTokens(): void {
    try {
      localStorage.removeItem(this.tokenKey);
    } catch (error) {
      console.error("Error al limpiar tokens:", error);
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return Boolean(token);
  }

  private handleError(error: unknown): Error {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || error.message;
      const apiError: ApiError = {
        message,
        status: error.response?.status,
      };

      switch (error.response?.status) {
        case 401:
          return new Error("Credenciales inválidas");
        case 403:
          return new Error("Acceso denegado");
        case 404:
          return new Error("Servicio no encontrado");
        case 500:
          return new Error("Error interno del servidor");
        default:
          return new Error(apiError.message || "Error al autenticar");
      }
    }

    return new Error("Error de conexión");
  }
}

export const authService = new AuthService();
