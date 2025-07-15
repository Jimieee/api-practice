import { PropertyFormData } from "./PropertyFormModal.schema";

export interface PropertyFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PropertyFormData) => void;
  initialData?: PropertyFormData;
  mode: 'create' | 'edit';
  loading?: boolean;
}