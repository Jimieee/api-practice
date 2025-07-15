export interface FileUploadProps {
  value?: File | null;
  onChange: (file: File | null) => void;
  accept?: string;
  maxSize?: number;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}