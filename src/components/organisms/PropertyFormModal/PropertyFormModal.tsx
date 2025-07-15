import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PropertyFormModalProps } from './PropertyFormModal.types';
import { PropertyFormData, propertyFormSchema } from './PropertyFormModal.schema';
import { Modal } from '@/components/atoms/Modal';
import { FormField } from '@/components/molecules';

export const PropertyFormModal: React.FC<PropertyFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
  loading = false,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      name: '',
      address: '',
      description: '',
    }
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({
        name: '',
        address: '',
        description: '',
      });
    }
  }, [initialData, isOpen, reset]);

  const handleFormSubmit = (data: PropertyFormData) => {
    onSubmit(data);
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  const title = mode === 'create' ? 'Nuevo Alojamiento' : 'Editar Alojamiento';

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={title}
      size="md"
      showCloseButton={!loading}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
        <FormField
          name="name"
          control={control}
          label="Nombre"
          type="text"
          placeholder="Nombre del alojamiento"
          disabled={loading}
          fullWidth
        />

        <FormField
          name="address"
          control={control}
          label="Dirección"
          type="text"
          placeholder="Dirección del alojamiento"
          disabled={loading}
          fullWidth
        />

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Descripción
          </label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                id="description"
                rows={4}
                placeholder="Descripción del alojamiento"
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
              />
            )}
          />
        </div>

        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </form>
    </Modal>
  );
};