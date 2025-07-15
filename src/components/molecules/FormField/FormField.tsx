import { Controller, FieldPath, FieldValues } from 'react-hook-form';
import { Input } from '@/components/atoms';
import { FormFieldProps } from './FormField.types';

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  label,
  helperText,
  ...inputProps
}: FormFieldProps<TFieldValues, TName>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Input
          {...field}
          {...inputProps}
          label={label}
          error={error?.message}
          helperText={helperText}
        />
      )}
    />
  );
};

export default FormField;