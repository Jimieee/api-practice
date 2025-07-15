import { useNavigate } from 'react-router-dom';
import { AuthTemplate } from '@/components/templates';
import { LoginForm } from '@/components/organisms';
import { LoginFormData } from '@/components/organisms/LoginForm/LoginForm.schema';
import { useAuth } from '../../hooks';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading, error, clearError } = useAuth();

  const handleSubmit = async (data: LoginFormData) => {
    clearError();
    try {
      await login({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      });
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthTemplate>
      <LoginForm
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </AuthTemplate>
  );
};

export default LoginPage;