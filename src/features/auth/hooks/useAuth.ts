import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    clearError,
  } = useAuthStore();

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    clearError,
  };
};