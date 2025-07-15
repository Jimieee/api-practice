import { LoginFormData } from './LoginForm.schema';

export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  loading?: boolean;
  error?: string | null;
}