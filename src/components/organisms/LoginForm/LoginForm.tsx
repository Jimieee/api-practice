import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, LogIn } from 'lucide-react';
import { Button, Typography } from '@/components/atoms';
import { FormField } from '@/components/molecules';
import { LoginFormData, loginSchema } from './LoginForm.schema';
import { LoginFormProps } from './LoginForm.types';

const LoginForm = ({ onSubmit, loading = false, error }: LoginFormProps) => {
  const {
    control,
    handleSubmit,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  });

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-sm border border-slate-200 p-8">
      <div className="text-center mb-8">
        <div className="flex justify-center items-center gap-3 mb-2">
          <LogIn className="w-6 h-6 text-slate-600" />
          <Typography variant="h3">
            Iniciar Sesión
          </Typography>
        </div>
        <Typography variant="body2" className="text-center" color="secondary">
          Ingresa tus credenciales para acceder al sistema
        </Typography>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          name="email"
          control={control}
          label="Correo Electrónico"
          type="email"
          placeholder="correo@ejemplo.com"
          icon={<Mail className="w-5 h-5 text-slate-400" />}
          fullWidth
        />

        <FormField
          name="password"
          control={control}
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          icon={<Lock className="w-5 h-5 text-slate-400" />}
          fullWidth
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <Typography variant="body2" className="ml-2">
              Mantener sesión iniciada
            </Typography>
          </label>
          <button
            type="button"
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <Button
          type="submit"
          fullWidth
          loading={loading}
          disabled={loading}
        >
          Iniciar Sesión
        </Button>
      </form>

      <div className="mt-8">
        <Typography variant="body2" className="text-center" color="secondary">
          ¿Necesitas ayuda?{' '}
          <button className="text-blue-600 hover:text-blue-700">
            Contacta soporte
          </button>
        </Typography>
      </div>

      <div className="mt-6 text-center">
        <Typography variant="caption" color="muted">
          Este es un sistema seguro. Tus datos están protegidos.
        </Typography>
      </div>
    </div>
  );
};

export default LoginForm;