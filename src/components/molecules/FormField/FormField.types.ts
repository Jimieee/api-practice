import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { InputProps } from '@/components/atoms/Input/Input.types';

export interface FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<InputProps, 'name' | 'error'> {
  name: TName;
  control: Control<TFieldValues>;
  label?: string;
  helperText?: string;
}